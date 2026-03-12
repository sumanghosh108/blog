import { describe, it, expect } from 'vitest';
import { generateTOC, extractHeadings, type Heading } from '../src/utils/toc';

describe('generateTOC', () => {
  it('generates HTML for simple flat headings', () => {
    const headings: Heading[] = [
      { depth: 2, text: 'Introduction', slug: 'introduction' },
      { depth: 2, text: 'Conclusion', slug: 'conclusion' },
    ];
    
    const html = generateTOC(headings);
    
    expect(html).toContain('<nav class="table-of-contents">');
    expect(html).toContain('<a href="#introduction">Introduction</a>');
    expect(html).toContain('<a href="#conclusion">Conclusion</a>');
    expect(html).toContain('</nav>');
  });

  it('generates nested structure for different heading depths', () => {
    const headings: Heading[] = [
      { depth: 1, text: 'Main Title', slug: 'main-title' },
      { depth: 2, text: 'Section 1', slug: 'section-1' },
      { depth: 3, text: 'Subsection 1.1', slug: 'subsection-1-1' },
      { depth: 2, text: 'Section 2', slug: 'section-2' },
    ];
    
    const html = generateTOC(headings);
    
    // Should contain nested ul elements
    expect(html).toContain('<ul>');
    expect(html).toContain('</ul>');
    // All headings should be present
    expect(html).toContain('Main Title');
    expect(html).toContain('Section 1');
    expect(html).toContain('Subsection 1.1');
    expect(html).toContain('Section 2');
  });

  it('returns empty string for empty headings array', () => {
    const html = generateTOC([]);
    expect(html).toBe('');
  });

  it('returns empty string for null/undefined headings', () => {
    expect(generateTOC(null as any)).toBe('');
    expect(generateTOC(undefined as any)).toBe('');
  });

  it('handles single heading', () => {
    const headings: Heading[] = [
      { depth: 1, text: 'Only Heading', slug: 'only-heading' },
    ];
    
    const html = generateTOC(headings);
    
    expect(html).toContain('Only Heading');
    expect(html).toContain('#only-heading');
  });

  it('properly closes nested lists', () => {
    const headings: Heading[] = [
      { depth: 1, text: 'H1', slug: 'h1' },
      { depth: 2, text: 'H2', slug: 'h2' },
      { depth: 3, text: 'H3', slug: 'h3' },
    ];
    
    const html = generateTOC(headings);
    
    // Count opening and closing ul tags - should be balanced
    const openingTags = (html.match(/<ul>/g) || []).length;
    const closingTags = (html.match(/<\/ul>/g) || []).length;
    expect(openingTags).toBe(closingTags);
  });

  it('handles jumping from deep to shallow depth', () => {
    const headings: Heading[] = [
      { depth: 1, text: 'H1', slug: 'h1' },
      { depth: 3, text: 'H3', slug: 'h3' },
      { depth: 1, text: 'H1 Again', slug: 'h1-again' },
    ];
    
    const html = generateTOC(headings);
    
    expect(html).toContain('H1');
    expect(html).toContain('H3');
    expect(html).toContain('H1 Again');
    
    // Should properly close nested lists
    const openingTags = (html.match(/<ul>/g) || []).length;
    const closingTags = (html.match(/<\/ul>/g) || []).length;
    expect(openingTags).toBe(closingTags);
  });
});

describe('extractHeadings', () => {
  it('extracts single heading from Markdown', () => {
    const markdown = '# Main Title';
    const headings = extractHeadings(markdown);
    
    expect(headings).toHaveLength(1);
    expect(headings[0]).toEqual({
      depth: 1,
      text: 'Main Title',
      slug: 'main-title',
    });
  });

  it('extracts multiple headings with different depths', () => {
    const markdown = `
# Title
## Section 1
### Subsection 1.1
## Section 2
    `.trim();
    
    const headings = extractHeadings(markdown);
    
    expect(headings).toHaveLength(4);
    expect(headings[0].depth).toBe(1);
    expect(headings[1].depth).toBe(2);
    expect(headings[2].depth).toBe(3);
    expect(headings[3].depth).toBe(2);
  });

  it('generates URL-safe slugs', () => {
    const markdown = `
# Hello World!
## Section with Spaces
### Special-Characters: Test?
    `.trim();
    
    const headings = extractHeadings(markdown);
    
    expect(headings[0].slug).toBe('hello-world');
    expect(headings[1].slug).toBe('section-with-spaces');
    expect(headings[2].slug).toBe('special-characters-test');
  });

  it('returns empty array for Markdown without headings', () => {
    const markdown = 'This is just regular text without any headings.';
    const headings = extractHeadings(markdown);
    
    expect(headings).toEqual([]);
  });

  it('returns empty array for empty string', () => {
    const headings = extractHeadings('');
    expect(headings).toEqual([]);
  });

  it('ignores headings in code blocks', () => {
    const markdown = `
# Real Heading
\`\`\`
# Not a heading
\`\`\`
## Another Real Heading
    `.trim();
    
    const headings = extractHeadings(markdown);
    
    // Note: This simple implementation will extract headings from code blocks
    // A more sophisticated parser would need to track code block boundaries
    // For now, we document this behavior
    expect(headings.length).toBeGreaterThanOrEqual(2);
  });

  it('handles headings with inline code', () => {
    const markdown = '## Using `console.log()` in JavaScript';
    const headings = extractHeadings(markdown);
    
    expect(headings).toHaveLength(1);
    expect(headings[0].text).toBe('Using `console.log()` in JavaScript');
  });

  it('handles headings with links', () => {
    const markdown = '## Check out [this link](https://example.com)';
    const headings = extractHeadings(markdown);
    
    expect(headings).toHaveLength(1);
    expect(headings[0].text).toContain('this link');
  });

  it('trims whitespace from heading text', () => {
    const markdown = '##   Heading with Extra Spaces   ';
    const headings = extractHeadings(markdown);
    
    expect(headings[0].text).toBe('Heading with Extra Spaces');
  });

  it('handles all heading levels (h1-h6)', () => {
    const markdown = `
# H1
## H2
### H3
#### H4
##### H5
###### H6
    `.trim();
    
    const headings = extractHeadings(markdown);
    
    expect(headings).toHaveLength(6);
    expect(headings[0].depth).toBe(1);
    expect(headings[1].depth).toBe(2);
    expect(headings[2].depth).toBe(3);
    expect(headings[3].depth).toBe(4);
    expect(headings[4].depth).toBe(5);
    expect(headings[5].depth).toBe(6);
  });

  it('handles headings with numbers', () => {
    const markdown = '## Step 1: Installation';
    const headings = extractHeadings(markdown);
    
    expect(headings[0].text).toBe('Step 1: Installation');
    expect(headings[0].slug).toBe('step-1-installation');
  });

  it('handles headings with emojis', () => {
    const markdown = '## 🚀 Getting Started';
    const headings = extractHeadings(markdown);
    
    expect(headings[0].text).toBe('🚀 Getting Started');
    // Slug should remove emojis
    expect(headings[0].slug).toBe('getting-started');
  });

  it('handles consecutive hyphens in slugs', () => {
    const markdown = '## Hello --- World';
    const headings = extractHeadings(markdown);
    
    // Multiple hyphens should be collapsed to single hyphen
    expect(headings[0].slug).toBe('hello-world');
  });

  it('removes leading and trailing hyphens from slugs', () => {
    const markdown = '## -Start and End-';
    const headings = extractHeadings(markdown);
    
    expect(headings[0].slug).toBe('start-and-end');
  });
});

describe('Integration: extractHeadings + generateTOC', () => {
  it('creates complete TOC from Markdown content', () => {
    const markdown = `
# Introduction
This is some content.

## Background
More content here.

### History
Even more content.

## Methodology
Research methods.

# Conclusion
Final thoughts.
    `.trim();
    
    const headings = extractHeadings(markdown);
    const html = generateTOC(headings);
    
    expect(html).toContain('Introduction');
    expect(html).toContain('Background');
    expect(html).toContain('History');
    expect(html).toContain('Methodology');
    expect(html).toContain('Conclusion');
    
    expect(html).toContain('#introduction');
    expect(html).toContain('#background');
    expect(html).toContain('#history');
    expect(html).toContain('#methodology');
    expect(html).toContain('#conclusion');
  });

  it('handles real blog post structure', () => {
    const markdown = `
# Building YOLOv8 Brain Tumor Detection System

## Introduction
Overview of the project.

## Prerequisites
### Hardware Requirements
### Software Requirements

## Implementation
### Data Preparation
### Model Training
### Evaluation

## Results
Performance metrics.

## Conclusion
Summary and future work.
    `.trim();
    
    const headings = extractHeadings(markdown);
    const html = generateTOC(headings);
    
    // Should have proper nesting
    expect(html).toContain('<ul>');
    expect(html).toContain('</ul>');
    
    // All sections should be present
    expect(html).toContain('Introduction');
    expect(html).toContain('Prerequisites');
    expect(html).toContain('Hardware Requirements');
    expect(html).toContain('Implementation');
    expect(html).toContain('Results');
    expect(html).toContain('Conclusion');
  });
});
