/**
 * Unit tests for Logo component
 * Validates Requirements: 1.1, 1.2, 1.4, 2.1, 2.2, 2.3, 4.1, 4.2, 4.3, 6.1, 6.2
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

describe('Logo Component', () => {
  const logoContent = readFileSync(
    join(process.cwd(), 'src/components/Logo.astro'),
    'utf-8'
  );

  // Example 1: Logo Component Renders Image Element
  // Validates: Requirements 1.1
  it('renders an img element with correct source path', () => {
    expect(logoContent).toContain('<img');
    expect(logoContent).toContain('src="/logo.png"');
  });

  // Example 2: Logo Component Includes Descriptive Alt Text
  // Validates: Requirements 1.2, 4.1
  it('includes descriptive alt text', () => {
    expect(logoContent).toContain('alt="SUMAN ANALYST HL NADA - Site Logo"');
  });

  // Example 3: Logo Links to Homepage
  // Validates: Requirements 1.4, 4.2
  it('wraps image in anchor element linking to homepage', () => {
    expect(logoContent).toContain('<a');
    expect(logoContent).toContain('href="/"');
  });

  // Example 4: Logo Has Responsive Height Classes
  // Validates: Requirements 2.1, 2.2, 2.3
  it('applies responsive Tailwind height classes', () => {
    expect(logoContent).toContain('h-10'); // mobile height
    expect(logoContent).toContain('md:h-12'); // desktop height
    expect(logoContent).toContain('w-auto'); // maintains aspect ratio
  });

  // Example 5: Logo Image File Exists in Public Directory
  // Validates: Requirements 3.1
  it('logo image file exists in public directory', () => {
    const logoPath = join(process.cwd(), 'public/logo.png');
    expect(existsSync(logoPath)).toBe(true);
  });

  // Example 6: Logo Image Uses Web-Optimized Format
  // Validates: Requirements 3.2
  it('uses web-optimized image format (PNG)', () => {
    expect(logoContent).toContain('.png');
  });

  // Example 7: Logo Link Has Focus Indicator Styles
  // Validates: Requirements 4.3
  it('includes focus indicator styles on anchor element', () => {
    expect(logoContent).toContain('focus:outline-none');
    expect(logoContent).toContain('focus:ring');
  });

  // Example 8: Logo Image Has Eager Loading
  // Validates: Requirements 6.1
  it('uses eager loading for the image', () => {
    expect(logoContent).toContain('loading="eager"');
  });

  // Example 9: Logo Image Has Width and Height Attributes
  // Validates: Requirements 6.2
  it('specifies width and height attributes to prevent layout shift', () => {
    expect(logoContent).toContain('width="');
    expect(logoContent).toContain('height="');
  });

  // Additional validation: async decoding for performance
  it('includes async decoding attribute', () => {
    expect(logoContent).toContain('decoding="async"');
  });

  // Additional validation: proper semantic structure
  it('uses semantic HTML structure', () => {
    // Anchor should wrap the image
    const anchorIndex = logoContent.indexOf('<a');
    const imgIndex = logoContent.indexOf('<img');
    const closingAnchorIndex = logoContent.indexOf('</a>');
    
    expect(anchorIndex).toBeGreaterThan(-1);
    expect(imgIndex).toBeGreaterThan(anchorIndex);
    expect(closingAnchorIndex).toBeGreaterThan(imgIndex);
  });
});
