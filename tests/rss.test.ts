import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('RSS Feed Generation', () => {
  const rssPath = join(process.cwd(), 'dist', 'rss.xml');
  let rssContent: string;

  try {
    rssContent = readFileSync(rssPath, 'utf-8');
  } catch (error) {
    console.warn('RSS feed not found. Run `npm run build` first.');
    rssContent = '';
  }

  it('should generate a valid RSS 2.0 feed', () => {
    expect(rssContent).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(rssContent).toContain('<rss version="2.0"');
    expect(rssContent).toContain('xmlns:atom="http://www.w3.org/2005/Atom"');
    expect(rssContent).toContain('</rss>');
  });

  it('should include channel metadata', () => {
    expect(rssContent).toContain('<channel>');
    expect(rssContent).toContain('</channel>');
  });

  it('should include channel title', () => {
    expect(rssContent).toContain("<title>Suman's Developer Blog</title>");
  });

  it('should include channel description', () => {
    expect(rssContent).toContain('<description>Technical articles about Machine Learning, AI Agents, Data Science, DevOps, Python, Cloud &amp; AWS, and MLOps</description>');
  });

  it('should include channel link', () => {
    expect(rssContent).toContain('<link>https://blog.sumannaba.in/</link>');
  });

  it('should include language tag', () => {
    expect(rssContent).toContain('<language>en-us</language>');
  });

  it('should include lastBuildDate', () => {
    expect(rssContent).toMatch(/<lastBuildDate>.*<\/lastBuildDate>/);
  });

  it('should include atom:link for self-reference', () => {
    expect(rssContent).toContain('<atom:link href="https://blog.sumannaba.in/rss.xml" rel="self" type="application/rss+xml" />');
  });

  it('should include published blog posts', () => {
    expect(rssContent).toContain('<item>');
    expect(rssContent).toContain('</item>');
  });

  it('should include post title', () => {
    expect(rssContent).toContain('<title>Building a YOLOv8 Brain Tumor Detection System</title>');
    expect(rssContent).toContain('<title>Building AI Agents Locally: A Practical Guide</title>');
  });

  it('should include post description', () => {
    expect(rssContent).toContain('<description>A comprehensive guide to implementing real-time brain tumor detection using YOLOv8 object detection, from dataset preparation to model deployment in clinical settings</description>');
  });

  it('should include post link', () => {
    expect(rssContent).toContain('<link>https://blog.sumannaba.in/blog/yolov8-brain-tumor-detection/</link>');
    expect(rssContent).toContain('<link>https://blog.sumannaba.in/blog/building-ai-agents-locally/</link>');
  });

  it('should include post guid with isPermaLink attribute', () => {
    expect(rssContent).toContain('<guid isPermaLink="true">https://blog.sumannaba.in/blog/yolov8-brain-tumor-detection/</guid>');
    expect(rssContent).toContain('<guid isPermaLink="true">https://blog.sumannaba.in/blog/building-ai-agents-locally/</guid>');
  });

  it('should include post pubDate in RFC 822 format', () => {
    expect(rssContent).toMatch(/<pubDate>.*GMT<\/pubDate>/);
    expect(rssContent).toContain('<pubDate>Mon, 15 Jan 2024 00:00:00 GMT</pubDate>');
    expect(rssContent).toContain('<pubDate>Sat, 20 Jan 2024 00:00:00 GMT</pubDate>');
  });

  it('should include author information', () => {
    expect(rssContent).toContain('<author>Suman Ghosh</author>');
  });

  it('should include post categories (tags)', () => {
    expect(rssContent).toContain('<category>Machine Learning</category>');
    expect(rssContent).toContain('<category>Computer Vision</category>');
    expect(rssContent).toContain('<category>Healthcare AI</category>');
    expect(rssContent).toContain('<category>AI Agents</category>');
  });

  it('should sort posts by date (newest first)', () => {
    const buildingAiAgentsIndex = rssContent.indexOf('Building AI Agents Locally');
    const yolov8Index = rssContent.indexOf('Building a YOLOv8 Brain Tumor Detection System');
    
    // Building AI Agents (Jan 20) should appear before YOLOv8 (Jan 15)
    expect(buildingAiAgentsIndex).toBeLessThan(yolov8Index);
  });

  it('should not include draft posts', () => {
    // fastapi-aws-deployment is marked as draft: true
    expect(rssContent).not.toContain('Deploying FastAPI Applications on AWS');
    expect(rssContent).not.toContain('fastapi-aws-deployment');
  });

  it('should escape XML special characters in content', () => {
    // Check that & is escaped as &amp;
    expect(rssContent).toContain('Cloud &amp; AWS');
  });

  it('should have valid RSS item structure', () => {
    const itemMatches = rssContent.match(/<item>[\s\S]*?<\/item>/g);
    expect(itemMatches).toBeTruthy();
    
    if (itemMatches) {
      // Each item should have title, description, link, guid, pubDate, author
      itemMatches.forEach(item => {
        expect(item).toContain('<title>');
        expect(item).toContain('<description>');
        expect(item).toContain('<link>');
        expect(item).toContain('<guid');
        expect(item).toContain('<pubDate>');
        expect(item).toContain('<author>');
      });
    }
  });

  it('should use correct site URL from config', () => {
    expect(rssContent).toContain('https://blog.sumannaba.in/');
  });

  it('should have correct number of published posts', () => {
    const itemMatches = rssContent.match(/<item>/g);
    // Should have 2 published posts (excluding the draft)
    expect(itemMatches?.length).toBe(2);
  });
});
