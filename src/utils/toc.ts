/**
 * Table of Contents generation utilities
 * Extracts headings from Markdown and generates navigable TOC HTML
 */

export interface Heading {
  depth: number;
  text: string;
  slug: string;
}

/**
 * Generates HTML for table of contents from headings array
 * Creates nested list structure based on heading depth
 * 
 * @param headings - Array of heading objects with depth, text, and slug
 * @returns HTML string representing the table of contents
 */
export function generateTOC(headings: Heading[]): string {
  if (!headings || headings.length === 0) {
    return '';
  }

  let html = '<nav class="table-of-contents">\n';
  let currentDepth = 0;
  
  for (const heading of headings) {
    // Open new lists as needed when going deeper
    while (currentDepth < heading.depth) {
      html += '  <ul>\n';
      currentDepth++;
    }
    
    // Close lists when going shallower
    while (currentDepth > heading.depth) {
      html += '  </ul>\n';
      currentDepth--;
    }
    
    // Add the list item with link
    html += `    <li><a href="#${heading.slug}">${heading.text}</a></li>\n`;
  }
  
  // Close any remaining open lists
  while (currentDepth > 0) {
    html += '  </ul>\n';
    currentDepth--;
  }
  
  html += '</nav>';
  
  return html;
}

/**
 * Extracts headings from Markdown content
 * Parses Markdown to find all heading elements (h1-h6)
 * Generates slugs for anchor links
 * 
 * @param markdown - Raw Markdown content string
 * @returns Array of heading objects with depth, text, and slug
 */
export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  
  // Match Markdown headings: # Heading, ## Heading, etc.
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  let match;
  
  while ((match = headingRegex.exec(markdown)) !== null) {
    const depth = match[1].length; // Number of # characters
    const text = match[2].trim();
    const slug = generateSlug(text);
    
    headings.push({
      depth,
      text,
      slug,
    });
  }
  
  return headings;
}

/**
 * Generates URL-safe slug from heading text
 * Converts text to lowercase, replaces spaces with hyphens, removes special characters
 * 
 * @param text - Heading text to convert to slug
 * @returns URL-safe slug string
 */
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '');  // Remove leading/trailing hyphens
}
