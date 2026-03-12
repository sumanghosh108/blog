/**
 * Integration tests for BaseLayout component
 * Validates Requirements: 1.1, 6.1, 6.2, 6.3, 6.6, 9.4
 */

import { describe, it, expect } from 'vitest';
import { generateMetaTags, generateOpenGraphTags, generateTwitterCardTags } from '../src/utils/seo';
import type { SEOConfig } from '../src/utils/seo';

describe('BaseLayout Integration', () => {
  it('generates all required SEO meta tags for a page', () => {
    const config: SEOConfig = {
      title: 'Test Page',
      description: 'Test description',
      canonicalURL: 'https://blog.sumannaba.in/test',
      type: 'website',
    };

    const metaTags = generateMetaTags(config);
    const ogTags = generateOpenGraphTags(config);
    const twitterTags = generateTwitterCardTags(config);

    // Verify standard meta tags
    expect(metaTags.some(tag => tag.name === 'description')).toBe(true);
    expect(metaTags.some(tag => tag.name === 'canonical')).toBe(true);

    // Verify OpenGraph tags
    expect(ogTags.some(tag => tag.property === 'og:title')).toBe(true);
    expect(ogTags.some(tag => tag.property === 'og:description')).toBe(true);
    expect(ogTags.some(tag => tag.property === 'og:url')).toBe(true);
    expect(ogTags.some(tag => tag.property === 'og:type')).toBe(true);
    expect(ogTags.some(tag => tag.property === 'og:site_name')).toBe(true);

    // Verify Twitter Card tags
    expect(twitterTags.some(tag => tag.name === 'twitter:card')).toBe(true);
    expect(twitterTags.some(tag => tag.name === 'twitter:title')).toBe(true);
    expect(twitterTags.some(tag => tag.name === 'twitter:description')).toBe(true);
  });

  it('generates article-specific meta tags when type is article', () => {
    const publishDate = new Date('2024-01-15');
    const config: SEOConfig = {
      title: 'Test Article',
      description: 'Test article description',
      canonicalURL: 'https://blog.sumannaba.in/blog/test-article',
      type: 'article',
      publishDate,
      tags: ['Machine Learning', 'AI'],
    };

    const metaTags = generateMetaTags(config);
    const ogTags = generateOpenGraphTags(config);

    // Verify article published time in meta tags
    expect(metaTags.some(tag => 
      tag.name === 'article:published_time' && 
      tag.content === publishDate.toISOString()
    )).toBe(true);

    // Verify keywords from tags
    expect(metaTags.some(tag => 
      tag.name === 'keywords' && 
      tag.content === 'Machine Learning, AI'
    )).toBe(true);

    // Verify article published time in OpenGraph
    expect(ogTags.some(tag => 
      tag.property === 'article:published_time' && 
      tag.content === publishDate.toISOString()
    )).toBe(true);

    // Verify article tags in OpenGraph
    expect(ogTags.some(tag => 
      tag.property === 'article:tag' && 
      tag.content === 'Machine Learning'
    )).toBe(true);
    expect(ogTags.some(tag => 
      tag.property === 'article:tag' && 
      tag.content === 'AI'
    )).toBe(true);
  });

  it('includes image in meta tags when provided', () => {
    const config: SEOConfig = {
      title: 'Test Page with Image',
      description: 'Test description',
      canonicalURL: 'https://blog.sumannaba.in/test',
      type: 'website',
      image: 'https://blog.sumannaba.in/images/test.jpg',
    };

    const ogTags = generateOpenGraphTags(config);
    const twitterTags = generateTwitterCardTags(config);

    // Verify OpenGraph image
    expect(ogTags.some(tag => 
      tag.property === 'og:image' && 
      tag.content === 'https://blog.sumannaba.in/images/test.jpg'
    )).toBe(true);

    // Verify Twitter image
    expect(twitterTags.some(tag => 
      tag.name === 'twitter:image' && 
      tag.content === 'https://blog.sumannaba.in/images/test.jpg'
    )).toBe(true);

    // Verify Twitter card type is summary_large_image when image is present
    expect(twitterTags.some(tag => 
      tag.name === 'twitter:card' && 
      tag.content === 'summary_large_image'
    )).toBe(true);
  });

  it('uses summary card type when no image is provided', () => {
    const config: SEOConfig = {
      title: 'Test Page',
      description: 'Test description',
      canonicalURL: 'https://blog.sumannaba.in/test',
      type: 'website',
    };

    const twitterTags = generateTwitterCardTags(config);

    // Verify Twitter card type is summary when no image
    expect(twitterTags.some(tag => 
      tag.name === 'twitter:card' && 
      tag.content === 'summary'
    )).toBe(true);
  });
});
