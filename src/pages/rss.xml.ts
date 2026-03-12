/**
 * RSS Feed Generator for Suman Developer Blog
 * 
 * Generates an RSS 2.0 feed with all published blog posts for subscribers.
 * 
 * Includes:
 * - Channel metadata (title, description, link, language)
 * - All published blog posts (excludes drafts)
 * - For each post: title, description, link, pubDate, author
 * - Posts sorted by date (newest first)
 * 
 * Author: Suman Ghosh
 * Site URL: https://blog.sumannaba.in
 * 
 * Validates: Requirements 11.2
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString() || 'https://blog.sumannaba.in';
  
  // Get all published blog posts (exclude drafts)
  const blogPosts = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  });
  
  // Sort posts by publish date (newest first)
  const sortedPosts = blogPosts.sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime()
  );
  
  // Generate RSS 2.0 feed
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Suman's Developer Blog</title>
    <description>Technical articles about Machine Learning, AI Agents, Data Science, DevOps, Python, Cloud &amp; AWS, and MLOps</description>
    <link>${siteUrl}</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}rss.xml" rel="self" type="application/rss+xml" />
    
${sortedPosts
  .map(post => {
    const postUrl = `${siteUrl}blog/${post.slug}/`;
    const pubDate = post.data.publishDate.toUTCString();
    const author = post.data.author || 'Suman Ghosh';
    
    // Escape XML special characters in title and description
    const escapeXml = (str: string) => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    };
    
    const title = escapeXml(post.data.title);
    const description = escapeXml(post.data.description);
    
    return `    <item>
      <title>${title}</title>
      <description>${description}</description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${author}</author>
${post.data.tags.map(tag => `      <category>${escapeXml(tag)}</category>`).join('\n')}
    </item>`;
  })
  .join('\n')}
  </channel>
</rss>`;
  
  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
