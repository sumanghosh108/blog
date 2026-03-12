/**
 * Unit tests for Header component
 * Validates Requirements: 2.1, 5.4, 9.3
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Header Component', () => {
  const headerContent = readFileSync(
    join(process.cwd(), 'src/components/Header.astro'),
    'utf-8'
  );

  it('includes Logo component for site branding', () => {
    expect(headerContent).toContain('Logo');
    expect(headerContent).toContain("import Logo from './Logo.astro'");
    expect(headerContent).toContain('<Logo />');
  });

  it('includes all required navigation links', () => {
    const requiredLinks = ['Home', 'Blog', 'Tags', 'About'];
    
    requiredLinks.forEach(link => {
      expect(headerContent).toContain(link);
    });
  });

  it('includes navigation hrefs for all pages', () => {
    const requiredHrefs = ['/', '/blog', '/tags', '/about'];
    
    requiredHrefs.forEach(href => {
      // In Astro, hrefs are defined in the navigation array
      expect(headerContent).toContain(`href: '${href}'`);
    });
  });

  it('includes mobile menu button', () => {
    expect(headerContent).toContain('mobile-menu-button');
    expect(headerContent).toContain('aria-expanded');
  });

  it('includes mobile menu panel', () => {
    expect(headerContent).toContain('mobile-menu');
    expect(headerContent).toContain('md:hidden');
  });

  it('includes ThemeToggle component', () => {
    expect(headerContent).toContain('ThemeToggle');
    expect(headerContent).toContain("import ThemeToggle from './ThemeToggle.astro'");
  });

  it('includes responsive design classes', () => {
    // Check for mobile-first responsive classes
    expect(headerContent).toContain('md:flex');
    expect(headerContent).toContain('md:hidden');
  });

  it('includes sticky header positioning', () => {
    expect(headerContent).toContain('sticky');
    expect(headerContent).toContain('top-0');
  });

  it('includes dark mode support classes', () => {
    expect(headerContent).toContain('dark:');
  });

  it('includes active link highlighting logic', () => {
    expect(headerContent).toContain('currentPath');
  });

  it('includes mobile menu toggle script', () => {
    expect(headerContent).toContain('<script>');
    expect(headerContent).toContain('addEventListener');
  });

  it('includes hamburger and close icons', () => {
    expect(headerContent).toContain('menu-icon-open');
    expect(headerContent).toContain('menu-icon-close');
  });

  it('includes accessibility attributes', () => {
    expect(headerContent).toContain('aria-controls');
    expect(headerContent).toContain('aria-expanded');
    expect(headerContent).toContain('sr-only');
  });
});
