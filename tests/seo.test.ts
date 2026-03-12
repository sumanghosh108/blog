import { describe, it, expect } from 'vitest';
import { generateMetaTags, generateOpenGraphTags, generateTwitterCardTags } from '../src/utils/seo';
import type { SEOConfig } from '../src/utils/seo';

describe('SEO Utilities', () => {
  describe('generateMetaTags', () => {
    it('generates basic meta tags for a website', () => {
      const config: SEOConfig = {
        title: 'Test Blog',
        description: 'A test blog description',
        canonicalURL: 'https://blog.sumannaba.in/test',
      };

      const tags = generateMetaTags(config);

      expect(tags).toContainEqual({ name: 'description', content: 'A test blog description' });
      expect(tags).toContainEqual({ name: 'canonical', content: 'https://blog.sumannaba.in/test' });
    });

    it('includes keywords from tags', () => {
      const config: SEOConfig = {
        title: 'Test Post',
        description: 'Test description',
        canonicalURL: 'https://blog.sumannaba.in/test',
        tags: ['Machine Learning', 'AI', 'Python'],
      };

      const tags = generateMetaTags(config);

      expect(tags).toContainEqual({ name: 'keywords', content: 'Machine Learning, AI, Python' });
    });

    it('includes article published time for article type', () => {
      const publishDate = new Date('2024-01-15');
      const config: SEOConfig = {
        title: 'Test Article',
        description: 'Test description',
        canonicalURL: 'https://blog.sumannaba.in/test',
        type: 'article',
        publishDate,
      };

      const tags = generateMetaTags(config);

      expect(tags).toContainEqual({
        name: 'article:published_time',
        content: publishDate.toISOString(),
      });
    });

    it('handles empty tags array', () => {
      const config: SEOConfig = {
        title: 'Test',
        description: 'Test',
        canonicalURL: 'https://blog.sumannaba.in/test',
        tags: [],
      };

      const tags = generateMetaTags(config);

      expect(tags.find(tag => tag.name === 'keywords')).toBeUndefined();
    });
  });

  describe('generateOpenGraphTags', () => {
    it('generates basic OpenGraph tags', () => {
      const config: SEOConfig = {
        title: 'Test Blog',
        description: 'A test blog description',
        canonicalURL: 'https://blog.sumannaba.in/test',
      };

      const tags = generateOpenGraphTags(config);

      expect(tags).toContainEqual({ property: 'og:title', content: 'Test Blog' });
      expect(tags).toContainEqual({ property: 'og:description', content: 'A test blog description' });
      expect(tags).toContainEqual({ property: 'og:url', content: 'https://blog.sumannaba.in/test' });
      expect(tags).toContainEqual({ property: 'og:type', content: 'website' });
      expect(tags).toContainEqual({ property: 'og:site_name', content: 'suman' });
    });

    it('includes image when provided', () => {
      const config: SEOConfig = {
        title: 'Test',
        description: 'Test',
        canonicalURL: 'https://blog.sumannaba.in/test',
        image: 'https://blog.sumannaba.in/images/test.jpg',
      };

      const tags = generateOpenGraphTags(config);

      expect(tags).toContainEqual({
        property: 'og:image',
        content: 'https://blog.sumannaba.in/images/test.jpg',
      });
    });

    it('sets article type and published time for articles', () => {
      const publishDate = new Date('2024-01-15');
      const config: SEOConfig = {
        title: 'Test Article',
        description: 'Test',
        canonicalURL: 'https://blog.sumannaba.in/test',
        type: 'article',
        publishDate,
      };

      const tags = generateOpenGraphTags(config);

      expect(tags).toContainEqual({ property: 'og:type', content: 'article' });
      expect(tags).toContainEqual({
        property: 'article:published_time',
        content: publishDate.toISOString(),
      });
    });

    it('includes article tags for articles', () => {
      const config: SEOConfig = {
        title: 'Test Article',
        description: 'Test',
        canonicalURL: 'https://blog.sumannaba.in/test',
        type: 'article',
        tags: ['AI', 'Machine Learning'],
      };

      const tags = generateOpenGraphTags(config);

      expect(tags).toContainEqual({ property: 'article:tag', content: 'AI' });
      expect(tags).toContainEqual({ property: 'article:tag', content: 'Machine Learning' });
    });
  });

  describe('generateTwitterCardTags', () => {
    it('generates basic Twitter card tags without image', () => {
      const config: SEOConfig = {
        title: 'Test Blog',
        description: 'A test blog description',
        canonicalURL: 'https://blog.sumannaba.in/test',
      };

      const tags = generateTwitterCardTags(config);

      expect(tags).toContainEqual({ name: 'twitter:card', content: 'summary' });
      expect(tags).toContainEqual({ name: 'twitter:title', content: 'Test Blog' });
      expect(tags).toContainEqual({ name: 'twitter:description', content: 'A test blog description' });
    });

    it('uses summary_large_image card type when image is provided', () => {
      const config: SEOConfig = {
        title: 'Test',
        description: 'Test',
        canonicalURL: 'https://blog.sumannaba.in/test',
        image: 'https://blog.sumannaba.in/images/test.jpg',
      };

      const tags = generateTwitterCardTags(config);

      expect(tags).toContainEqual({ name: 'twitter:card', content: 'summary_large_image' });
      expect(tags).toContainEqual({
        name: 'twitter:image',
        content: 'https://blog.sumannaba.in/images/test.jpg',
      });
    });

    it('handles long descriptions', () => {
      const longDescription = 'A'.repeat(300);
      const config: SEOConfig = {
        title: 'Test',
        description: longDescription,
        canonicalURL: 'https://blog.sumannaba.in/test',
      };

      const tags = generateTwitterCardTags(config);

      expect(tags).toContainEqual({ name: 'twitter:description', content: longDescription });
    });
  });
});
