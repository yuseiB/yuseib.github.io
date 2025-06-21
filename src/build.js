const fs = require('fs-extra');
const path = require('path');
const { parseMarkdown, extractTitle } = require('./parser');
const { generateGraphHTML } = require('./graph');

const CONTENT_DIR = 'content';
const DIST_DIR = 'dist';

async function buildSite() {
  await fs.ensureDir(DIST_DIR);
  
  const markdownFiles = await fs.readdir(CONTENT_DIR);
  const mdFiles = markdownFiles.filter(file => file.endsWith('.md'));
  
  const pages = [];
  const linkGraph = {};
  
  for (const file of mdFiles) {
    const filePath = path.join(CONTENT_DIR, file);
    const content = await fs.readFile(filePath, 'utf-8');
    const slug = path.basename(file, '.md').toLowerCase().replace(/\s+/g, '-');
    const title = extractTitle(content);
    
    const { frontmatter, html, backlinks } = parseMarkdown(content);
    
    const page = {
      slug,
      title,
      filename: path.basename(file, '.md'),
      frontmatter,
      html,
      backlinks
    };
    
    pages.push(page);
    linkGraph[page.filename] = backlinks;
  }
  
  for (const page of pages) {
    const htmlContent = generatePageHTML(page, pages, linkGraph);
    await fs.writeFile(path.join(DIST_DIR, `${page.slug}.html`), htmlContent);
  }
  
  const indexHTML = generateIndexHTML(pages, linkGraph);
  await fs.writeFile(path.join(DIST_DIR, 'index.html'), indexHTML);
  
  const graphData = generateGraphData(pages, linkGraph);
  await fs.writeFile(path.join(DIST_DIR, 'graph.json'), JSON.stringify(graphData, null, 2));
  
  await generateGraphHTML();
  await copyAssets();
  
  console.log(`Built ${pages.length} pages successfully!`);
}

function generatePageHTML(page, allPages, linkGraph) {
  const backlinksTo = allPages.filter(p => 
    linkGraph[p.filename] && linkGraph[p.filename].includes(page.filename)
  );
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.title}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav>
        <a href="index.html">Home</a>
        <a href="graph.html">Graph</a>
    </nav>
    <main>
        <article>
            <h1>${page.title}</h1>
            ${page.html}
        </article>
        
        ${page.backlinks.length > 0 ? `
        <section class="links">
            <h3>Links to:</h3>
            <ul>
                ${page.backlinks.map(link => {
                  const linkedPage = allPages.find(p => p.filename === link);
                  const slug = linkedPage ? linkedPage.slug : link.toLowerCase().replace(/\s+/g, '-');
                  return `<li><a href="${slug}.html">${link}</a></li>`;
                }).join('')}
            </ul>
        </section>
        ` : ''}
        
        ${backlinksTo.length > 0 ? `
        <section class="backlinks">
            <h3>Linked from:</h3>
            <ul>
                ${backlinksTo.map(p => `<li><a href="${p.slug}.html">${p.title}</a></li>`).join('')}
            </ul>
        </section>
        ` : ''}
    </main>
</body>
</html>`;
}

function generateIndexHTML(pages, linkGraph) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Obsidian Weblog</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav>
        <a href="index.html">Home</a>
        <a href="graph.html">Graph</a>
    </nav>
    <main>
        <h1>Obsidian Weblog</h1>
        <section class="page-list">
            <h2>All Pages</h2>
            <ul>
                ${pages.map(page => `
                    <li>
                        <a href="${page.slug}.html">${page.title}</a>
                        ${page.backlinks.length > 0 ? `<span class="link-count">(${page.backlinks.length} links)</span>` : ''}
                    </li>
                `).join('')}
            </ul>
        </section>
    </main>
</body>
</html>`;
}

function generateGraphData(pages, linkGraph) {
  const nodes = pages.map(page => ({
    id: page.filename,
    title: page.title,
    slug: page.slug
  }));
  
  const links = [];
  Object.entries(linkGraph).forEach(([source, targets]) => {
    targets.forEach(target => {
      links.push({
        source,
        target
      });
    });
  });
  
  return { nodes, links };
}

async function copyAssets() {
  const cssContent = `
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: #fafafa;
}

nav {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ddd;
}

nav a {
    margin-right: 1rem;
    text-decoration: none;
    color: #666;
    font-weight: 500;
}

nav a:hover {
    color: #333;
}

.backlink {
    color: #6366f1;
    text-decoration: none;
    border-bottom: 1px dotted #6366f1;
}

.backlink:hover {
    background: #6366f1;
    color: white;
}

.links, .backlinks {
    margin-top: 2rem;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
}

.links h3, .backlinks h3 {
    margin-top: 0;
    color: #374151;
}

.page-list {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
}

.link-count {
    color: #9ca3af;
    font-size: 0.875rem;
}

#graph {
    width: 100%;
    height: 600px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
}
`;
  
  await fs.writeFile(path.join(DIST_DIR, 'style.css'), cssContent);
}

if (require.main === module) {
  buildSite().catch(console.error);
}

module.exports = { buildSite };