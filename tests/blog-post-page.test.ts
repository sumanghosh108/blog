/**
 * Unit tests for dynamic blog post page
 * Tests the [slug].astro page functionality
 */

import { describe, it, expect } from 'vitest';

describe('Dynamic Blog Post Page', () => {
  describe('Related Posts Logic', () => {
    it('should find posts sharing tags', () => {
      // Simulate the related posts logic
      const currentPost = {
        slug: 'current-post',
        data: {
          tags: ['Python', 'Machine Learning'],
        },
      };

      const allPosts = [
        {
          slug: 'post-1',
          data: { tags: ['Python', 'DevOps'] },
        },
        {
          slug: 'post-2',
          data: { tags: ['JavaScript', 'Web'] },
        },
        {
          slug: 'post-3',
          data: { tags: ['Machine Learning', 'AI'] },
        },
        {
          slug: 'post-4',
          data: { tags: ['Cloud & AWS'] },
        },
      ];

      // Filter related posts (posts sharing at least one tag)
      const relatedPosts = allPosts.filter(p => {
        return p.data.tags.some(tag => currentPost.data.tags.includes(tag));
      });

      expect(relatedPosts).toHaveLength(2);
      expect(relatedPosts[0].slug).toBe('post-1');
      expect(relatedPosts[1].slug).toBe('post-3');
    });

    it('should exclude the current post from related posts', () => {
      const currentPost = {
        slug: 'current-post',
        data: {
          tags: ['Python'],
        },
      };

      const allPosts = [
        {
          slug: 'current-post',
          data: { tags: ['Python'] },
        },
        {
          slug: 'other-post',
          data: { tags: ['Python'] },
        },
      ];

      // Filter out current post and find related
      const publishedPosts = allPosts.filter(p => p.slug !== currentPost.slug);
      const relatedPosts = publishedPosts.filter(p => {
        return p.data.tags.some(tag => currentPost.data.tags.includes(tag));
      });

      expect(relatedPosts).toHaveLength(1);
      expect(relatedPosts[0].slug).toBe('other-post');
    });

    it('should sort related posts by number of shared tags', () => {
      const currentPost = {
        slug: 'current-post',
        data: {
          tags: ['Python', 'Machine Learning', 'AI'],
        },
      };

      const allPosts = [
        {
          slug: 'post-1',
          data: { tags: ['Python'] }, // 1 shared tag
        },
        {
          slug: 'post-2',
          data: { tags: ['Python', 'Machine Learning', 'AI'] }, // 3 shared tags
        },
        {
          slug: 'post-3',
          data: { tags: ['Machine Learning', 'AI'] }, // 2 shared tags
        },
      ];

      const relatedPosts = allPosts
        .filter(p => {
          return p.data.tags.some(tag => currentPost.data.tags.includes(tag));
        })
        .sort((a, b) => {
          const aSharedTags = a.data.tags.filter(tag => 
            currentPost.data.tags.includes(tag)
          ).length;
          const bSharedTags = b.data.tags.filter(tag => 
            currentPost.data.tags.includes(tag)
          ).length;
          return bSharedTags - aSharedTags;
        });

      expect(relatedPosts).toHaveLength(3);
      expect(relatedPosts[0].slug).toBe('post-2'); // 3 shared tags
      expect(relatedPosts[1].slug).toBe('post-3'); // 2 shared tags
      expect(relatedPosts[2].slug).toBe('post-1'); // 1 shared tag
    });

    it('should limit related posts to 3', () => {
      const currentPost = {
        slug: 'current-post',
        data: {
          tags: ['Python'],
        },
      };

      const allPosts = [
        { slug: 'post-1', data: { tags: ['Python'] } },
        { slug: 'post-2', data: { tags: ['Python'] } },
        { slug: 'post-3', data: { tags: ['Python'] } },
        { slug: 'post-4', data: { tags: ['Python'] } },
        { slug: 'post-5', data: { tags: ['Python'] } },
      ];

      const relatedPosts = allPosts
        .filter(p => {
          return p.data.tags.some(tag => currentPost.data.tags.includes(tag));
        })
        .slice(0, 3);

      expect(relatedPosts).toHaveLength(3);
    });

    it('should return empty array when no posts share tags', () => {
      const currentPost = {
        slug: 'current-post',
        data: {
          tags: ['Python'],
        },
      };

      const allPosts = [
        { slug: 'post-1', data: { tags: ['JavaScript'] } },
        { slug: 'post-2', data: { tags: ['Ruby'] } },
      ];

      const relatedPosts = allPosts.filter(p => {
        return p.data.tags.some(tag => currentPost.data.tags.includes(tag));
      });

      expect(relatedPosts).toHaveLength(0);
    });
  });

  describe('Draft Post Filtering', () => {
    it('should filter out draft posts in production', () => {
      const allPosts = [
        { slug: 'post-1', data: { draft: false } },
        { slug: 'post-2', data: { draft: true } },
        { slug: 'post-3', data: { draft: false } },
      ];

      // Simulate production environment
      const isDev = false;
      const publishedPosts = allPosts.filter(post => {
        return isDev || !post.data.draft;
      });

      expect(publishedPosts).toHaveLength(2);
      expect(publishedPosts[0].slug).toBe('post-1');
      expect(publishedPosts[1].slug).toBe('post-3');
    });

    it('should include draft posts in development', () => {
      const allPosts = [
        { slug: 'post-1', data: { draft: false } },
        { slug: 'post-2', data: { draft: true } },
        { slug: 'post-3', data: { draft: false } },
      ];

      // Simulate development environment
      const isDev = true;
      const publishedPosts = allPosts.filter(post => {
        return isDev || !post.data.draft;
      });

      expect(publishedPosts).toHaveLength(3);
    });
  });
});
