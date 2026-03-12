/**
 * Unit tests for PostCard component
 * 
 * Validates Requirements:
 * - 2.3: List recent blog posts in a card layout
 * - 2.4: Include a featured post section
 * - 2.6: Display posts in a clean, responsive card layout
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('PostCard Component', () => {
  const postCardContent = readFileSync(
    join(process.cwd(), 'src/components/PostCard.astro'),
    'utf-8'
  );

  it('includes all required props in interface', () => {
    expect(postCardContent).toContain('slug: string');
    expect(postCardContent).toContain('title: string');
    expect(postCardContent).toContain('description: string');
    expect(postCardContent).toContain('publishDate: Date');
    expect(postCardContent).toContain('tags: string[]');
    expect(postCardContent).toContain('image?: string');
    expect(postCardContent).toContain('featured?: boolean');
  });

  it('displays post title with link to full post', () => {
    expect(postCardContent).toContain('{title}');
    expect(postCardContent).toContain('/blog/${slug}');
  });

  it('displays post description', () => {
    expect(postCardContent).toContain('{description}');
  });

  it('displays publish date with proper formatting', () => {
    expect(postCardContent).toContain('publishDate.toLocaleDateString');
    expect(postCardContent).toContain('formattedDate');
  });

  it('displays tags with links to tag pages', () => {
    expect(postCardContent).toContain('tags.map');
    expect(postCardContent).toContain('/tags/');
    expect(postCardContent).toContain('{tag}');
  });

  it('includes featured badge for featured posts', () => {
    expect(postCardContent).toContain('featured');
    expect(postCardContent).toContain('Featured');
  });

  it('supports optional image display', () => {
    expect(postCardContent).toContain('image');
    expect(postCardContent).toContain('<img');
  });

  it('includes hover effects', () => {
    expect(postCardContent).toContain('hover:');
    expect(postCardContent).toContain('group-hover:');
    expect(postCardContent).toContain('transition');
  });

  it('implements responsive card layout', () => {
    expect(postCardContent).toContain('flex');
    expect(postCardContent).toContain('rounded');
    expect(postCardContent).toContain('border');
  });

  it('includes proper accessibility attributes', () => {
    // Check for datetime attribute on time element
    expect(postCardContent).toContain('datetime');
    expect(postCardContent).toContain('toISOString()');
    
    // Check for aria-label
    expect(postCardContent).toContain('aria-label');
    
    // Check for sr-only text
    expect(postCardContent).toContain('sr-only');
  });

  it('formats tag links correctly (lowercase, spaces to hyphens)', () => {
    expect(postCardContent).toContain('toLowerCase()');
    expect(postCardContent).toContain('replace(/\\s+/g, \'-\')');
  });

  it('includes dark mode support', () => {
    expect(postCardContent).toContain('dark:');
  });

  it('uses semantic HTML elements', () => {
    expect(postCardContent).toContain('<article');
    expect(postCardContent).toContain('<time');
  });

  it('includes loading optimization for images', () => {
    expect(postCardContent).toContain('loading="lazy"');
  });

  it('implements card hover animation', () => {
    expect(postCardContent).toContain('hover:shadow');
    expect(postCardContent).toContain('hover:-translate-y');
  });

  it('handles empty tags array gracefully', () => {
    expect(postCardContent).toContain('tags.length > 0');
  });

  it('includes proper link structure for entire card clickability', () => {
    expect(postCardContent).toContain('absolute inset-0');
    expect(postCardContent).toContain('Read more about');
  });
});
