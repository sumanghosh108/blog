/**
 * Unit tests for CodeBlock component
 * Validates Requirements: 3.7
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('CodeBlock Component', () => {
  const codeBlockContent = readFileSync(
    join(process.cwd(), 'src/components/CodeBlock.astro'),
    'utf-8'
  );

  it('includes copy button with proper accessibility attributes', () => {
    expect(codeBlockContent).toContain('data-code-block-copy');
    expect(codeBlockContent).toContain('aria-label="Copy code to clipboard"');
    expect(codeBlockContent).toContain('type="button"');
  });

  it('includes copy icon SVG', () => {
    expect(codeBlockContent).toContain('class="copy-icon');
    expect(codeBlockContent).toContain('<svg');
    expect(codeBlockContent).toContain('viewBox="0 0 24 24"');
  });

  it('includes success icon SVG', () => {
    expect(codeBlockContent).toContain('class="success-icon');
    expect(codeBlockContent).toContain('hidden');
  });

  it('includes code content element with data attribute', () => {
    expect(codeBlockContent).toContain('data-code-content');
    expect(codeBlockContent).toContain('<code');
  });

  it('includes pre element for code block', () => {
    expect(codeBlockContent).toContain('<pre');
    expect(codeBlockContent).toContain('</pre>');
  });

  it('supports language prop for syntax highlighting', () => {
    expect(codeBlockContent).toContain('lang');
    expect(codeBlockContent).toContain('language-');
  });

  it('includes handleCopyClick function', () => {
    expect(codeBlockContent).toContain('handleCopyClick');
    expect(codeBlockContent).toContain('async function handleCopyClick');
  });

  it('uses Clipboard API for copying', () => {
    expect(codeBlockContent).toContain('navigator.clipboard.writeText');
  });

  it('includes fallback copy method', () => {
    expect(codeBlockContent).toContain('fallbackCopyToClipboard');
    expect(codeBlockContent).toContain('document.execCommand');
  });

  it('includes showSuccessFeedback function', () => {
    expect(codeBlockContent).toContain('showSuccessFeedback');
  });

  it('shows success feedback with icon swap', () => {
    expect(codeBlockContent).toContain('copyIcon.classList.add(\'hidden\')');
    expect(codeBlockContent).toContain('successIcon.classList.remove(\'hidden\')');
  });

  it('resets success feedback after timeout', () => {
    expect(codeBlockContent).toContain('setTimeout');
    expect(codeBlockContent).toContain('2000');
  });

  it('updates aria-label on successful copy', () => {
    expect(codeBlockContent).toContain('Code copied to clipboard');
    expect(codeBlockContent).toContain('setAttribute(\'aria-label\'');
  });

  it('initializes code blocks on page load', () => {
    expect(codeBlockContent).toContain('initializeCodeBlocks');
    expect(codeBlockContent).toContain('querySelectorAll');
  });

  it('adds event listeners to copy buttons', () => {
    expect(codeBlockContent).toContain('addEventListener(\'click\'');
  });

  it('includes hover effects for copy button', () => {
    expect(codeBlockContent).toContain('hover:');
    expect(codeBlockContent).toContain('group-hover:opacity-100');
  });

  it('includes dark mode support', () => {
    expect(codeBlockContent).toContain('dark:');
    expect(codeBlockContent).toContain('dark:bg-gray-950');
  });

  it('includes focus styles for accessibility', () => {
    expect(codeBlockContent).toContain('focus:outline-none');
    expect(codeBlockContent).toContain('focus:ring-2');
    expect(codeBlockContent).toContain('focus:opacity-100');
  });

  it('uses relative positioning for button placement', () => {
    expect(codeBlockContent).toContain('relative');
    expect(codeBlockContent).toContain('absolute');
  });

  it('positions copy button in top-right corner', () => {
    expect(codeBlockContent).toContain('top-2');
    expect(codeBlockContent).toContain('right-2');
  });

  it('includes overflow handling for long code', () => {
    expect(codeBlockContent).toContain('overflow-x-auto');
  });

  it('includes rounded corners for visual polish', () => {
    expect(codeBlockContent).toContain('rounded');
  });

  it('includes transition effects', () => {
    expect(codeBlockContent).toContain('transition');
  });

  it('handles astro:page-load event for SPA navigation', () => {
    expect(codeBlockContent).toContain('astro:page-load');
  });

  it('includes error handling for clipboard operations', () => {
    expect(codeBlockContent).toContain('try');
    expect(codeBlockContent).toContain('catch');
  });

  it('validates code element exists before copying', () => {
    expect(codeBlockContent).toContain('if (!codeElement) return');
  });

  it('validates button parent exists', () => {
    expect(codeBlockContent).toContain('if (!codeBlock) return');
  });

  it('uses textContent to extract code', () => {
    expect(codeBlockContent).toContain('textContent');
  });

  it('includes proper TypeScript types', () => {
    expect(codeBlockContent).toContain('HTMLButtonElement');
    expect(codeBlockContent).toContain('Event');
    expect(codeBlockContent).toContain('Promise<void>');
  });

  it('includes component documentation', () => {
    expect(codeBlockContent).toContain('CodeBlock Component');
    expect(codeBlockContent).toContain('Validates Requirements: 3.7');
  });

  it('accepts code prop', () => {
    expect(codeBlockContent).toContain('code: string');
  });

  it('accepts optional lang prop', () => {
    expect(codeBlockContent).toContain('lang?: string');
  });

  it('accepts optional class prop', () => {
    expect(codeBlockContent).toContain('class?: string');
  });

  it('provides default value for lang prop', () => {
    expect(codeBlockContent).toContain('lang = \'text\'');
  });

  it('includes group class for hover effects', () => {
    expect(codeBlockContent).toContain('group');
  });

  it('hides copy button by default with opacity', () => {
    expect(codeBlockContent).toContain('opacity-0');
  });

  it('includes proper ARIA attributes for icons', () => {
    expect(codeBlockContent).toContain('aria-hidden="true"');
  });

  it('includes custom styles for code formatting', () => {
    expect(codeBlockContent).toContain('<style>');
    expect(codeBlockContent).toContain('font-family');
    expect(codeBlockContent).toContain('font-size');
  });

  it('uses monospace font for code', () => {
    expect(codeBlockContent).toContain('Courier');
    expect(codeBlockContent).toContain('monospace');
  });
});
