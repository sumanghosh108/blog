/**
 * Unit tests for ThemeToggle component
 * Validates Requirements: 9.1, 9.2, 9.3, 9.4
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('ThemeToggle Component', () => {
  const themeToggleContent = readFileSync(
    join(process.cwd(), 'src/components/ThemeToggle.astro'),
    'utf-8'
  );

  it('includes toggle button element', () => {
    expect(themeToggleContent).toContain('id="theme-toggle"');
    expect(themeToggleContent).toContain('type="button"');
  });

  it('includes sun icon for light mode', () => {
    expect(themeToggleContent).toContain('theme-toggle-light-icon');
    expect(themeToggleContent).toContain('Sun icon');
  });

  it('includes moon icon for dark mode', () => {
    expect(themeToggleContent).toContain('theme-toggle-dark-icon');
    expect(themeToggleContent).toContain('Moon icon');
  });

  it('includes client-side script for theme switching', () => {
    expect(themeToggleContent).toContain('<script>');
    expect(themeToggleContent).toContain('toggleTheme');
  });

  it('includes localStorage persistence logic', () => {
    expect(themeToggleContent).toContain('localStorage');
    expect(themeToggleContent).toContain('setItem');
    expect(themeToggleContent).toContain('getItem');
  });

  it('includes theme application to document root', () => {
    expect(themeToggleContent).toContain('document.documentElement');
    expect(themeToggleContent).toContain('classList');
  });

  it('includes dark class constant', () => {
    expect(themeToggleContent).toContain('dark');
  });

  it('includes theme key for localStorage', () => {
    expect(themeToggleContent).toContain('theme');
  });

  it('includes getTheme function', () => {
    expect(themeToggleContent).toContain('getTheme');
  });

  it('includes applyTheme function', () => {
    expect(themeToggleContent).toContain('applyTheme');
  });

  it('includes event listener for toggle button', () => {
    expect(themeToggleContent).toContain('addEventListener');
    expect(themeToggleContent).toContain('click');
  });

  it('includes system preference detection', () => {
    expect(themeToggleContent).toContain('prefers-color-scheme');
    expect(themeToggleContent).toContain('matchMedia');
  });

  it('includes accessibility attributes', () => {
    expect(themeToggleContent).toContain('aria-label');
    expect(themeToggleContent).toContain('aria-hidden');
  });

  it('includes focus styles for keyboard navigation', () => {
    expect(themeToggleContent).toContain('focus:ring');
  });

  it('includes hover effects', () => {
    expect(themeToggleContent).toContain('hover:bg');
  });

  it('includes dark mode styling classes', () => {
    expect(themeToggleContent).toContain('dark:');
  });

  it('includes icon visibility toggle logic', () => {
    expect(themeToggleContent).toContain('hidden');
    expect(themeToggleContent).toContain('classList.remove');
    expect(themeToggleContent).toContain('classList.add');
  });

  it('includes light and dark theme constants', () => {
    expect(themeToggleContent).toContain('light');
    expect(themeToggleContent).toContain('dark');
  });
});
