/**
 * Unit tests for Footer component
 * Validates Requirements: 11.2
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Footer Component', () => {
  const footerContent = readFileSync(
    join(process.cwd(), 'src/components/Footer.astro'),
    'utf-8'
  );

  it('displays copyright information with current year', () => {
    expect(footerContent).toContain('currentYear');
    expect(footerContent).toContain('authorName');
    expect(footerContent).toContain('All rights reserved');
  });

  it('includes author name "Suman Ghosh"', () => {
    expect(footerContent).toContain('Suman Ghosh');
  });

  it('includes GitHub social link', () => {
    expect(footerContent).toContain('https://github.com/sumannaba');
    expect(footerContent).toContain('GitHub');
  });

  it('includes LinkedIn social link', () => {
    expect(footerContent).toContain('https://linkedin.com/in/sumannaba');
    expect(footerContent).toContain('LinkedIn');
  });

  it('includes Twitter social link', () => {
    expect(footerContent).toContain('https://twitter.com/sumannaba');
    expect(footerContent).toContain('Twitter');
  });

  it('includes RSS feed link', () => {
    expect(footerContent).toContain('/rss.xml');
    expect(footerContent).toContain('RSS');
  });

  it('has proper accessibility attributes for social links', () => {
    // Check for aria-label attributes
    expect(footerContent).toContain('aria-label');
    expect(footerContent).toContain('GitHub profile');
    expect(footerContent).toContain('LinkedIn profile');
    expect(footerContent).toContain('Twitter profile');
    expect(footerContent).toContain('RSS feed');
  });

  it('opens social links in new tab with security attributes', () => {
    // Check for target="_blank" and rel="noopener noreferrer"
    expect(footerContent).toContain('target="_blank"');
    expect(footerContent).toContain('rel="noopener noreferrer"');
  });

  it('uses semantic footer element', () => {
    expect(footerContent).toContain('<footer');
    expect(footerContent).toContain('</footer>');
  });

  it('includes all required social media platforms', () => {
    // Verify all three social platforms are present
    const hasGitHub = footerContent.includes('github.com');
    const hasLinkedIn = footerContent.includes('linkedin.com');
    const hasTwitter = footerContent.includes('twitter.com');
    
    expect(hasGitHub && hasLinkedIn && hasTwitter).toBe(true);
  });

  it('includes dark mode support classes', () => {
    expect(footerContent).toContain('dark:');
  });

  it('includes responsive design classes', () => {
    expect(footerContent).toContain('container');
    expect(footerContent).toContain('mx-auto');
  });

  it('includes SVG icons for social links', () => {
    // Check that SVG elements are present for icons
    expect(footerContent).toContain('<svg');
    expect(footerContent).toContain('viewBox');
  });

  it('includes hover effects for links', () => {
    expect(footerContent).toContain('hover:');
    expect(footerContent).toContain('transition-colors');
  });
});
