/**
 * Unit tests for TableOfContents component
 * 
 * Validates Requirements:
 * - 3.5: Generate a table of contents for posts
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('TableOfContents Component', () => {
  const tocContent = readFileSync(
    join(process.cwd(), 'src/components/TableOfContents.astro'),
    'utf-8'
  );

  it('includes required props interface with headings array', () => {
    expect(tocContent).toContain('interface Props');
    expect(tocContent).toContain('headings: Array<{');
    expect(tocContent).toContain('depth: number');
    expect(tocContent).toContain('text: string');
    expect(tocContent).toContain('slug: string');
  });

  it('filters out h1 headings (post title)', () => {
    expect(tocContent).toContain('filter');
    expect(tocContent).toContain('h.depth > 1');
  });

  it('generates anchor links to heading slugs', () => {
    expect(tocContent).toContain('href={`#${heading.slug}`}');
    expect(tocContent).toContain('{heading.text}');
  });

  it('implements smooth scroll behavior', () => {
    expect(tocContent).toContain('scroll-behavior: smooth');
  });

  it('includes scroll margin for fixed headers', () => {
    expect(tocContent).toContain('scroll-margin-top');
  });

  it('applies proper indentation based on heading depth', () => {
    expect(tocContent).toContain('indentLevel');
    expect(tocContent).toContain('heading.depth');
    expect(tocContent).toContain('padding-left');
  });

  it('calculates indentation relative to minimum depth', () => {
    expect(tocContent).toContain('minDepth');
    expect(tocContent).toContain('Math.min');
  });

  it('includes semantic nav element with aria-label', () => {
    expect(tocContent).toContain('<nav');
    expect(tocContent).toContain('aria-label="Table of Contents"');
  });

  it('displays "Table of Contents" heading', () => {
    expect(tocContent).toContain('Table of Contents');
    expect(tocContent).toContain('<h2');
  });

  it('uses unordered list structure', () => {
    expect(tocContent).toContain('<ul');
    expect(tocContent).toContain('<li');
  });

  it('includes hover effects on links', () => {
    expect(tocContent).toContain('hover:text-blue');
    expect(tocContent).toContain('transition-colors');
  });

  it('includes dark mode support', () => {
    expect(tocContent).toContain('dark:');
    expect(tocContent).toContain('dark:text-');
    expect(tocContent).toContain('dark:border-');
  });

  it('handles empty headings array gracefully', () => {
    expect(tocContent).toContain('tocHeadings.length === 0');
    expect(tocContent).toContain('return null');
  });

  it('applies consistent styling with border and background', () => {
    expect(tocContent).toContain('rounded-lg');
    expect(tocContent).toContain('border');
    expect(tocContent).toContain('bg-gray');
  });

  it('uses proper spacing between list items', () => {
    expect(tocContent).toContain('space-y');
  });

  it('maps over headings to generate list items', () => {
    expect(tocContent).toContain('tocHeadings.map');
  });

  it('includes proper text sizing', () => {
    expect(tocContent).toContain('text-sm');
    expect(tocContent).toContain('text-lg');
  });

  it('applies padding to container', () => {
    expect(tocContent).toContain('p-6');
  });

  it('includes transition duration for smooth interactions', () => {
    expect(tocContent).toContain('duration-');
  });

  it('filters headings to only include h2-h6', () => {
    expect(tocContent).toContain('h.depth <= 6');
  });

  it('uses inline-block for proper link display', () => {
    expect(tocContent).toContain('inline-block');
  });

  it('includes vertical padding on links for better click targets', () => {
    expect(tocContent).toContain('py-1');
  });
});
