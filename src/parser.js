const { marked } = require('marked');
const matter = require('gray-matter');

class BacklinkRenderer extends marked.Renderer {
  constructor(options = {}) {
    super(options);
    this.backlinks = new Set();
  }

  text(text) {
    const backlinkRegex = /\[\[([^\]]+)\]\]/g;
    return text.replace(backlinkRegex, (match, content) => {
      const [filename, alias] = content.split('|');
      const displayText = alias || filename;
      const slug = filename.toLowerCase().replace(/\s+/g, '-');
      
      this.backlinks.add(filename.trim());
      
      return `<a href="${slug}.html" class="backlink" data-target="${filename.trim()}">${displayText}</a>`;
    });
  }
}

function parseMarkdown(content) {
  const { data: frontmatter, content: markdown } = matter(content);
  
  const renderer = new BacklinkRenderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    breaks: true
  });
  
  const html = marked.parse(markdown);
  
  return {
    frontmatter,
    html,
    backlinks: Array.from(renderer.backlinks)
  };
}

function extractTitle(content) {
  const { data: frontmatter, content: markdown } = matter(content);
  
  if (frontmatter.title) {
    return frontmatter.title;
  }
  
  const h1Match = markdown.match(/^#\s+(.+)/m);
  return h1Match ? h1Match[1] : 'Untitled';
}

module.exports = {
  parseMarkdown,
  extractTitle
};