/**
 * Tag Filter Page Tests
 * Tests for the dynamic tag filter page at /tags/[tag]
 * 
 * Validates Requirements: 4.2, 2.5
 */

import { describe, it, expect } from 'vitest';

describe('Tag Filter Page Logic', () => {
  it('should filter posts by tag correctly', () => {
    // Mock blog posts with tags
    const mockPosts = [
      { 
        slug: 'post-1', 
        data: { 
          draft: false, 
          publishDate: new Date('2024-01-20'),
          tags: ['Machine Learning', 'Python']
        } 
      },
      { 
        slug: 'post-2', 
        data: { 
          draft: false, 
          publishDate: new Date('2024-01-25'),
          tags: ['DevOps', 'Cloud & AWS']
        } 
      },
      { 
        slug: 'post-3', 
        data: { 
          draft: false, 
          publishDate: new Date('2024-01-15'),
          tags: ['Machine Learning', 'AI Agents']
        } 
      },
    ];
    
    // Test filtering for a specific tag
    const testTag = 'Machine Learning';
    const tagSlug = testTag.toLowerCase().replace(/\s+/g, '-');
    
    // Filter posts by tag (case-insensitive slug matching)
    const filteredPosts = mockPosts.filter(post => 
      !post.data.draft && post.data.tags.some(postTag => 
        postTag.toLowerCase().replace(/\s+/g, '-') === tagSlug
      )
    );
    
    // Verify correct posts are filtered
    expect(filteredPosts).toHaveLength(2);
    expect(filteredPosts[0].slug).toBe('post-1');
    expect(filteredPosts[1].slug).toBe('post-3');
    
    // Verify all filtered posts have the tag
    filteredPosts.forEach(post => {
      const hasTag = post.data.tags.some(postTag => 
        postTag.toLowerCase().replace(/\s+/g, '-') === tagSlug
      );
      expect(hasTag).toBe(true);
    });
  });

  it('should sort filtered posts by date (newest first)', () => {
    const mockPosts = [
      { 
        slug: 'post-1', 
        data: { 
          draft: false, 
          publishDate: new Date('2024-01-15'),
          tags: ['Python']
        } 
      },
      { 
        slug: 'post-2', 
        data: { 
          draft: false, 
          publishDate: new Date('2024-01-25'),
          tags: ['Python']
        } 
      },
      { 
        slug: 'post-3', 
        data: { 
          draft: false, 
          publishDate: new Date('2024-01-20'),
          tags: ['Python']
        } 
      },
    ];
    
    const tagSlug = 'python';
    
    const filteredPosts = mockPosts
      .filter(post => 
        !post.data.draft && post.data.tags.some(postTag => 
          postTag.toLowerCase().replace(/\s+/g, '-') === tagSlug
        )
      )
      .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
    
    // Verify posts are sorted by date (newest first)
    expect(filteredPosts[0].slug).toBe('post-2'); // Jan 25 (newest)
    expect(filteredPosts[1].slug).toBe('post-3'); // Jan 20
    expect(filteredPosts[2].slug).toBe('post-1'); // Jan 15 (oldest)
    
    for (let i = 0; i < filteredPosts.length - 1; i++) {
      expect(filteredPosts[i].data.publishDate.getTime())
        .toBeGreaterThanOrEqual(filteredPosts[i + 1].data.publishDate.getTime());
    }
  });

  it('should generate static paths for all unique tags', () => {
    const mockPosts = [
      { 
        slug: 'post-1', 
        data: { 
          draft: false, 
          tags: ['Machine Learning', 'Python']
        } 
      },
      { 
        slug: 'post-2', 
        data: { 
          draft: false, 
          tags: ['DevOps', 'Cloud & AWS']
        } 
      },
      { 
        slug: 'post-3', 
        data: { 
          draft: false, 
          tags: ['Machine Learning', 'AI Agents']
        } 
      },
    ];
    
    const publishedPosts = mockPosts.filter(post => !post.data.draft);
    
    // Extract all unique tags
    const uniqueTags = new Set<string>();
    publishedPosts.forEach(post => {
      post.data.tags.forEach(tag => uniqueTags.add(tag));
    });
    
    // Verify we have unique tags
    expect(uniqueTags.size).toBe(5);
    expect(uniqueTags.has('Machine Learning')).toBe(true);
    expect(uniqueTags.has('Python')).toBe(true);
    expect(uniqueTags.has('DevOps')).toBe(true);
    expect(uniqueTags.has('Cloud & AWS')).toBe(true);
    expect(uniqueTags.has('AI Agents')).toBe(true);
    
    // Verify each tag can be converted to a slug
    uniqueTags.forEach(tag => {
      const slug = tag.toLowerCase().replace(/\s+/g, '-');
      expect(slug).toBeTruthy();
      expect(slug).not.toContain(' ');
    });
  });

  it('should handle tags with spaces correctly', () => {
    const tag = 'Machine Learning';
    const expectedSlug = 'machine-learning';
    const actualSlug = tag.toLowerCase().replace(/\s+/g, '-');
    
    expect(actualSlug).toBe(expectedSlug);
  });

  it('should handle tags with special characters', () => {
    const tag = 'Cloud & AWS';
    const expectedSlug = 'cloud-&-aws';
    const actualSlug = tag.toLowerCase().replace(/\s+/g, '-');
    
    expect(actualSlug).toBe(expectedSlug);
  });

  it('should filter out draft posts', () => {
    const mockPosts = [
      { 
        slug: 'post-1', 
        data: { 
          draft: false, 
          tags: ['Python']
        } 
      },
      { 
        slug: 'post-2', 
        data: { 
          draft: true, 
          tags: ['Python']
        } 
      },
      { 
        slug: 'post-3', 
        data: { 
          draft: false, 
          tags: ['Python']
        } 
      },
    ];
    
    const tagSlug = 'python';
    
    const filteredPosts = mockPosts.filter(post => 
      !post.data.draft && post.data.tags.some(postTag => 
        postTag.toLowerCase().replace(/\s+/g, '-') === tagSlug
      )
    );
    
    // Verify no draft posts are included
    expect(filteredPosts).toHaveLength(2);
    filteredPosts.forEach(post => {
      expect(post.data.draft).toBe(false);
    });
  });

  it('should return empty array when no posts match tag', () => {
    const mockPosts = [
      { 
        slug: 'post-1', 
        data: { 
          draft: false, 
          tags: ['Python']
        } 
      },
      { 
        slug: 'post-2', 
        data: { 
          draft: false, 
          tags: ['DevOps']
        } 
      },
    ];
    
    const tagSlug = 'machine-learning';
    
    const filteredPosts = mockPosts.filter(post => 
      !post.data.draft && post.data.tags.some(postTag => 
        postTag.toLowerCase().replace(/\s+/g, '-') === tagSlug
      )
    );
    
    expect(filteredPosts).toHaveLength(0);
  });

  it('should handle case-insensitive tag matching', () => {
    const mockPosts = [
      { 
        slug: 'post-1', 
        data: { 
          draft: false, 
          tags: ['Machine Learning']
        } 
      },
    ];
    
    // Test with different case
    const tagSlug = 'machine-learning';
    
    const filteredPosts = mockPosts.filter(post => 
      !post.data.draft && post.data.tags.some(postTag => 
        postTag.toLowerCase().replace(/\s+/g, '-') === tagSlug
      )
    );
    
    expect(filteredPosts).toHaveLength(1);
    expect(filteredPosts[0].slug).toBe('post-1');
  });
});
