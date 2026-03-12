/**
 * SEO utilities for generating meta tags
 * Handles standard meta tags, OpenGraph, and Twitter Cards
 */

export interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  image?: string;
  canonicalURL: string;
  type?: 'website' | 'article';
  publishDate?: Date;
  tags?: string[];
}

/**
 * Generate standard meta tags for SEO
 * @param config - SEO configuration object
 * @returns Array of meta tag objects
 */
export function generateMetaTags(config: SEOConfig): MetaTag[] {
  const tags: MetaTag[] = [
    { name: 'description', content: config.description },
    { name: 'canonical', content: config.canonicalURL },
  ];

  // Add article-specific tags
  if (config.type === 'article' && config.publishDate) {
    tags.push({
      name: 'article:published_time',
      content: config.publishDate.toISOString(),
    });
  }

  // Add keywords from tags
  if (config.tags && config.tags.length > 0) {
    tags.push({
      name: 'keywords',
      content: config.tags.join(', '),
    });
  }

  return tags;
}

/**
 * Generate OpenGraph meta tags for social media sharing
 * @param config - SEO configuration object
 * @returns Array of OpenGraph meta tag objects
 */
export function generateOpenGraphTags(config: SEOConfig): MetaTag[] {
  const tags: MetaTag[] = [
    { property: 'og:title', content: config.title },
    { property: 'og:description', content: config.description },
    { property: 'og:url', content: config.canonicalURL },
    { property: 'og:type', content: config.type || 'website' },
    { property: 'og:site_name', content: 'suman' },
  ];

  // Add image if provided
  if (config.image) {
    tags.push({ property: 'og:image', content: config.image });
  }

  // Add article-specific tags
  if (config.type === 'article' && config.publishDate) {
    tags.push({
      property: 'article:published_time',
      content: config.publishDate.toISOString(),
    });
  }

  // Add article tags
  if (config.type === 'article' && config.tags) {
    config.tags.forEach(tag => {
      tags.push({
        property: 'article:tag',
        content: tag,
      });
    });
  }

  return tags;
}

/**
 * Generate Twitter Card meta tags
 * @param config - SEO configuration object
 * @returns Array of Twitter Card meta tag objects
 */
export function generateTwitterCardTags(config: SEOConfig): MetaTag[] {
  const tags: MetaTag[] = [
    { name: 'twitter:card', content: config.image ? 'summary_large_image' : 'summary' },
    { name: 'twitter:title', content: config.title },
    { name: 'twitter:description', content: config.description },
  ];

  // Add image if provided
  if (config.image) {
    tags.push({ name: 'twitter:image', content: config.image });
  }

  return tags;
}
