import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Sitemap Generation', () => {
  const sitemapPath = join(process.cwd(), 'dist', 'sitemap.xml');
  let sitemapContent: string;

  try {
    sitemapContent = readFileSync(sitemapPath, 'utf-8');
  } catch (error) {
    console.warn('Sitemap not found. Run `npm run build` first.');
    sitemapContent = '';
  }

  it('should generate a valid XML sitemap', () => {
    expect(sitemapContent).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(sitemapContent).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(sitemapContent).toContain('</urlset>');
  });

  it('should include homepage with priority 1.0', () => {
    expect(sitemapContent).toContain('<loc>https://blog.sumannaba.in/</loc>');
    expect(sitemapContent).toMatch(/<url>[\s\S]*?<loc>https:\/\/blog\.sumannaba\.in\/<\/loc>[\s\S]*?<priority>1\.0<\/priority>[\s\S]*?<\/url>/);
  });

  it('should include homepage with weekly changefreq', () => {
    expect(sitemapContent).toMatch(/<url>[\s\S]*?<loc>https:\/\/blog\.sumannaba\.in\/<\/loc>[\s\S]*?<changefreq>weekly<\/changefreq>[\s\S]*?<\/url>/);
  });

  it('should include about page with priority 0.5', () => {
    expect(sitemapContent).toContain('<loc>https://blog.sumannaba.in/about/</loc>');
    expect(sitemapContent).toMatch(/<url>[\s\S]*?<loc>https:\/\/blog\.sumannaba\.in\/about\/<\/loc>[\s\S]*?<priority>0\.5<\/priority>[\s\S]*?<\/url>/);
  });

  it('should include tags index page', () => {
    expect(sitemapContent).toContain('<loc>https://blog.sumannaba.in/tags/</loc>');
  });

  it('should include blog list page with priority 0.7', () => {
    expect(sitemapContent).toContain('<loc>https://blog.sumannaba.in/blog/</loc>');
    expect(sitemapContent).toMatch(/<url>[\s\S]*?<loc>https:\/\/blog\.sumannaba\.in\/blog\/<\/loc>[\s\S]*?<priority>0\.7<\/priority>[\s\S]*?<\/url>/);
  });

  it('should include blog posts with priority 0.8', () => {
    expect(sitemapContent).toContain('<loc>https://blog.sumannaba.in/blog/yolov8-brain-tumor-detection/</loc>');
    expect(sitemapContent).toMatch(/<url>[\s\S]*?<loc>https:\/\/blog\.sumannaba\.in\/blog\/yolov8-brain-tumor-detection\/<\/loc>[\s\S]*?<priority>0\.8<\/priority>[\s\S]*?<\/url>/);
  });

  it('should include blog posts with monthly changefreq', () => {
    expect(sitemapContent).toMatch(/<url>[\s\S]*?<loc>https:\/\/blog\.sumannaba\.in\/blog\/yolov8-brain-tumor-detection\/<\/loc>[\s\S]*?<changefreq>monthly<\/changefreq>[\s\S]*?<\/url>/);
  });

  it('should include blog posts with lastmod dates', () => {
    // Check that blog posts have lastmod dates in ISO format
    expect(sitemapContent).toMatch(/<url>[\s\S]*?<loc>https:\/\/blog\.sumannaba\.in\/blog\/yolov8-brain-tumor-detection\/<\/loc>[\s\S]*?<lastmod>2024-01-15T00:00:00\.000Z<\/lastmod>[\s\S]*?<\/url>/);
  });

  it('should include tag filter pages', () => {
    expect(sitemapContent).toContain('tags/Machine%20Learning/');
    expect(sitemapContent).toContain('tags/Computer%20Vision/');
    expect(sitemapContent).toContain('tags/Healthcare%20AI/');
  });

  it('should include tag pages with priority 0.5', () => {
    expect(sitemapContent).toMatch(/<url>[\s\S]*?<loc>https:\/\/blog\.sumannaba\.in\/tags\/Machine%20Learning\/<\/loc>[\s\S]*?<priority>0\.5<\/priority>[\s\S]*?<\/url>/);
  });

  it('should not include draft posts', () => {
    // fastapi-aws-deployment is marked as draft: true
    expect(sitemapContent).not.toContain('fastapi-aws-deployment');
  });

  it('should have all URLs with proper structure', () => {
    const urlMatches = sitemapContent.match(/<url>[\s\S]*?<\/url>/g);
    expect(urlMatches).toBeTruthy();
    
    if (urlMatches) {
      // Each URL should have loc, lastmod, changefreq, and priority
      urlMatches.forEach(url => {
        expect(url).toContain('<loc>');
        expect(url).toContain('<lastmod>');
        expect(url).toContain('<changefreq>');
        expect(url).toContain('<priority>');
      });
    }
  });

  it('should use correct site URL from config', () => {
    expect(sitemapContent).toContain('https://blog.sumannaba.in/');
  });
});
