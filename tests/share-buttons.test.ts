/**
 * Unit tests for ShareButtons component
 * Validates Requirements: 3.8
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('ShareButtons Component', () => {
  const shareButtonsContent = readFileSync(
    join(process.cwd(), 'src/components/ShareButtons.astro'),
    'utf-8'
  );

  it('includes all required props in interface', () => {
    expect(shareButtonsContent).toContain('title: string');
    expect(shareButtonsContent).toContain('description?: string');
    expect(shareButtonsContent).toContain('url?: string');
  });

  it('includes Twitter share button', () => {
    expect(shareButtonsContent).toContain('twitter.com/intent/tweet');
    expect(shareButtonsContent).toContain('Share on Twitter');
    expect(shareButtonsContent).toContain('Twitter');
  });

  it('includes LinkedIn share button', () => {
    expect(shareButtonsContent).toContain('linkedin.com/sharing/share-offsite');
    expect(shareButtonsContent).toContain('Share on LinkedIn');
    expect(shareButtonsContent).toContain('LinkedIn');
  });

  it('includes Facebook share button', () => {
    expect(shareButtonsContent).toContain('facebook.com/sharer/sharer.php');
    expect(shareButtonsContent).toContain('Share on Facebook');
    expect(shareButtonsContent).toContain('Facebook');
  });

  it('includes copy link button', () => {
    expect(shareButtonsContent).toContain('copy-link-button');
    expect(shareButtonsContent).toContain('Copy link to clipboard');
    expect(shareButtonsContent).toContain('Copy Link');
  });

  it('includes Web Share API button', () => {
    expect(shareButtonsContent).toContain('web-share-button');
    expect(shareButtonsContent).toContain('Share via system share menu');
    expect(shareButtonsContent).toContain('navigator.share');
  });

  it('encodes share URL and title for social media', () => {
    expect(shareButtonsContent).toContain('encodeURIComponent');
    expect(shareButtonsContent).toContain('shareUrl');
    expect(shareButtonsContent).toContain('shareTitle');
  });

  it('opens social share links in new tab with security attributes', () => {
    expect(shareButtonsContent).toContain('target="_blank"');
    expect(shareButtonsContent).toContain('rel="noopener noreferrer"');
  });

  it('includes proper accessibility attributes', () => {
    expect(shareButtonsContent).toContain('aria-label');
    expect(shareButtonsContent).toContain('aria-hidden="true"');
  });

  it('includes SVG icons for all share buttons', () => {
    expect(shareButtonsContent).toContain('<svg');
    expect(shareButtonsContent).toContain('viewBox');
    expect(shareButtonsContent).toContain('fill="currentColor"');
  });

  it('includes hover effects for buttons', () => {
    expect(shareButtonsContent).toContain('hover:bg');
    expect(shareButtonsContent).toContain('hover:text-white');
    expect(shareButtonsContent).toContain('transition-colors');
  });

  it('includes dark mode support', () => {
    expect(shareButtonsContent).toContain('dark:');
    expect(shareButtonsContent).toContain('dark:bg-gray-800');
    expect(shareButtonsContent).toContain('dark:text-gray-300');
  });

  it('includes copy to clipboard functionality', () => {
    expect(shareButtonsContent).toContain('navigator.clipboard.writeText');
    expect(shareButtonsContent).toContain('addEventListener');
    expect(shareButtonsContent).toContain('click');
  });

  it('includes copy success feedback', () => {
    expect(shareButtonsContent).toContain('Copied!');
    expect(shareButtonsContent).toContain('check-icon');
    expect(shareButtonsContent).toContain('copy-icon');
  });

  it('includes copy error handling', () => {
    expect(shareButtonsContent).toContain('catch');
    expect(shareButtonsContent).toContain('Failed');
    expect(shareButtonsContent).toContain('console.error');
  });

  it('includes timeout for resetting copy button state', () => {
    expect(shareButtonsContent).toContain('setTimeout');
    expect(shareButtonsContent).toContain('2000');
  });

  it('checks for Web Share API support', () => {
    expect(shareButtonsContent).toContain('navigator.share');
    expect(shareButtonsContent).toContain('classList.remove(\'hidden\')');
  });

  it('includes Web Share API error handling', () => {
    expect(shareButtonsContent).toContain('AbortError');
    expect(shareButtonsContent).toContain('Error sharing');
  });

  it('passes title, description, and url to Web Share API', () => {
    expect(shareButtonsContent).toContain('title: title');
    expect(shareButtonsContent).toContain('text: description');
    expect(shareButtonsContent).toContain('url: shareUrl');
  });

  it('uses current URL if url prop not provided', () => {
    expect(shareButtonsContent).toContain('Astro.url.href');
    expect(shareButtonsContent).toContain('url || Astro.url.href');
  });

  it('includes responsive flex layout', () => {
    expect(shareButtonsContent).toContain('flex');
    expect(shareButtonsContent).toContain('flex-wrap');
    expect(shareButtonsContent).toContain('items-center');
    expect(shareButtonsContent).toContain('gap-');
  });

  it('includes visual separator with border', () => {
    expect(shareButtonsContent).toContain('border-t');
    expect(shareButtonsContent).toContain('border-gray-200');
    expect(shareButtonsContent).toContain('dark:border-gray-700');
  });

  it('includes "Share:" label', () => {
    expect(shareButtonsContent).toContain('Share:');
  });

  it('uses semantic button elements for interactive buttons', () => {
    expect(shareButtonsContent).toContain('<button');
    expect(shareButtonsContent).toContain('type="button"');
  });

  it('includes consistent button styling classes', () => {
    expect(shareButtonsContent).toContain('share-button');
    expect(shareButtonsContent).toContain('inline-flex');
    expect(shareButtonsContent).toContain('rounded-lg');
  });

  it('includes different hover colors for each platform', () => {
    expect(shareButtonsContent).toContain('hover:bg-blue-500'); // Twitter
    expect(shareButtonsContent).toContain('hover:bg-blue-600'); // LinkedIn
    expect(shareButtonsContent).toContain('hover:bg-blue-700'); // Facebook
    expect(shareButtonsContent).toContain('hover:bg-green-500'); // Copy
    expect(shareButtonsContent).toContain('hover:bg-purple-500'); // Web Share
  });

  it('hides Web Share button by default', () => {
    expect(shareButtonsContent).toContain('hidden');
  });

  it('includes client-side script with define:vars', () => {
    expect(shareButtonsContent).toContain('<script define:vars=');
    expect(shareButtonsContent).toContain('shareUrl');
  });
});
