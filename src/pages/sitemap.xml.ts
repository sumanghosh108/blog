/**
 * Sitemap Generator for Astro Developer Blog
 * 
 * Generates an XML sitemap for search engines with all blog posts and static pages.
 * 
 * Includes:
 * - Homepage (priority: 1.0, changefreq: weekly)
 * - Static pages: About, Tags (priority: 0.5, changefreq: monthly)
 * - Blog list pages with pagination (priority: 0.7, changefreq: weekly)
 * - Individual blog posts with lastmod dates (priority: 0.8, changefreq: monthly)
 * - Tag filter pages for each unique tag (priority: 0.5, changefreq: weekly)
 * 
 * Draft posts are automatically excluded from the sitemap.
 * 
 * Validates: Requirements 6.4
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString() || 'https://blog.sumannaba.in';
  
  // Get all published blog posts
  const blogPosts = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  });
  
  // Sort posts by publish date (most recent first)
  const sortedPosts = blogPosts.sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime()
  );
  
  // Extract unique tags from all posts
  const allTags = new Set<string>();
  blogPosts.forEach(post => {
    post.data.tags.forEach(tag => allTags.add(tag));
  });
  
  // Calculate total pages for blog pagination (10 posts per page)
  const postsPerPage = 10;
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  
  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- About Page -->
  <url>
    <loc>${siteUrl}about/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <!-- Tags Index Page -->
  <url>
    <loc>${siteUrl}tags/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <!-- Blog List Pages (Pagination) -->
  ${Array.from({ length: totalPages }, (_, i) => i + 1)
    .map(pageNum => {
      const url = pageNum === 1 ? `${siteUrl}blog/` : `${siteUrl}blog/${pageNum}/`;
      return `  <url>
    <loc>${url}</loc>
    <lastmod>${sortedPosts[0]?.data.publishDate.toISOString() || new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join('\n')}
  
  <!-- Individual Blog Posts -->
  ${sortedPosts
    .map(post => {
      return `  <url>
    <loc>${siteUrl}blog/${post.slug}/</loc>
    <lastmod>${post.data.publishDate.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join('\n')}
  
  <!-- Tag Filter Pages -->
  ${Array.from(allTags)
    .sort()
    .map(tag => {
      // URL encode the tag for proper URL formatting
      const encodedTag = encodeURIComponent(tag);
      return `  <url>
    <loc>${siteUrl}tags/${encodedTag}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`;
    })
    .join('\n')}
</urlset>`;
  
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
