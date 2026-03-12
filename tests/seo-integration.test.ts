import { describe, it, expect } from 'vitest';
import { generateMetaTags, generateOpenGraphTags, generateTwitterCardTags } from '../src/utils/seo';
import type { SEOConfig } from '../src/utils/seo';

describe('SEO Integration Tests', () => {
  it('generates complete SEO tags for a blog post', () => {
    const config: SEOConfig = {
      title: 'Building YOLOv8 Brain Tumor Detection System',
      description: 'A comprehensive guide to implementing brain tumor detection using YOLOv8',
      canonicalURL: 'https://blog.sumannaba.in/blog/yolov8-brain-tumor',
      type: 'article',
      publishDate: new Date('2024-01-15'),
      tags: ['Machine Learning', 'Computer Vision', 'Healthcare AI'],
      image: 'https://blog.sumannaba.in/images/yolov8-brain-tumor.jpg',
    };

    const metaTags = generateMetaTags(config);
    const ogTags = generateOpenGraphTags(config);
    const twitterTags = generateTwitterCardTags(config);

    // Verify all required meta tags are present (Requirement 6.1)
    expect(metaTags.length).toBeGreaterThan(0);
    expect(metaTags.some(tag => tag.name === 'description')).toBe(true);
    expect(metaTags.some(tag => tag.name === 'canonical')).toBe(true);
    expect(metaTags.some(tag => tag.name === 'keywords')).toBe(true);

    // Verify OpenGraph tags for social sharing (Requirement 6.2)
    expect(ogTags.some(tag => tag.property === 'og:title')).toBe(true);
    expect(ogTags.some(tag => tag.property === 'og:description')).toBe(true);
    expect(ogTags.some(tag => tag.property === 'og:url')).toBe(true);
    expect(ogTags.some(tag => tag.property === 'og:type')).toBe(true);
    expect(ogTags.some(tag => tag.property === 'og:image')).toBe(true);

    // Verify Twitter Card tags (Requirement 6.3)
    expect(twitterTags.some(tag => tag.name === 'twitter:card')).toBe(true);
    expect(twitterTags.some(tag => tag.name === 'twitter:title')).toBe(true);
    expect(twitterTags.some(tag => tag.name === 'twitter:description')).toBe(true);
    expect(twitterTags.some(tag => tag.name === 'twitter:image')).toBe(true);

    // Verify canonical URL is set (Requirement 6.6)
    const canonicalTag = metaTags.find(tag => tag.name === 'canonical');
    expect(canonicalTag?.content).toBe('https://blog.sumannaba.in/blog/yolov8-brain-tumor');
  });

  it('generates complete SEO tags for homepage', () => {
    const config: SEOConfig = {
      title: 'suman - Developer Blog',
      description: 'Technical blog about Machine Learning, AI Agents, Data Science, DevOps, Python, Cloud & AWS, and MLOps',
      canonicalURL: 'https://blog.sumannaba.in',
      type: 'website',
    };

    const ogTags = generateOpenGraphTags(config);
    const twitterTags = generateTwitterCardTags(config);

    // Verify website type
    const ogType = ogTags.find(tag => tag.property === 'og:type');
    expect(ogType?.content).toBe('website');

    // Verify site name
    const siteName = ogTags.find(tag => tag.property === 'og:site_name');
    expect(siteName?.content).toBe('suman');

    // Verify Twitter card defaults to summary without image
    const twitterCard = twitterTags.find(tag => tag.name === 'twitter:card');
    expect(twitterCard?.content).toBe('summary');
  });
});
