# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Obsidian-like weblog system that converts markdown files with Obsidian-style backlinks into a static website with graph visualization. Users write markdown files in the `content/` directory and deploy to GitHub Pages.

## Key Commands

```bash
# Install dependencies
npm install

# Build the static site
npm run build

# Build and serve locally for development
npm run dev

# Deploy to GitHub Pages (requires gh-pages setup)
npm run deploy
```

## Architecture

### Core Components
- **src/parser.js**: Markdown parser with backlink support (`[[link]]` syntax)
- **src/build.js**: Static site generator that processes markdown files
- **src/graph.js**: D3.js-based graph visualization generator

### Directory Structure
- `content/`: Markdown files (your articles/notes)
- `src/`: Source code for the build system
- `dist/`: Generated static site (created by build command)
- `.github/workflows/`: GitHub Actions for automatic deployment

### Backlink System
- Use `[[Page Name]]` to link between pages
- Supports aliases: `[[Page Name|Display Text]]`
- Automatically generates bidirectional links
- Creates graph data for visualization

### Build Process
1. Reads all `.md` files from `content/`
2. Parses markdown and extracts backlinks
3. Generates HTML pages with navigation
4. Creates graph visualization data
5. Outputs static site to `dist/`

## GitHub Pages Deployment

The repository includes GitHub Actions workflow that automatically builds and deploys when pushing to main branch. Enable GitHub Pages in repository settings to use.