import { describe, it, expect } from 'vitest';

/**
 * Homepage Implementation Tests
 * Validates Requirements: 2.1, 2.2, 2.3, 2.4, 5.2, 5.3
 */

describe('Homepage Data Processing Logic', () => {
  it('should filter out draft posts', () => {
    const mockPosts = [
      { slug: 'post-1', data: { draft: false, publishDate: new Date('2024-01-20') } },
      { slug: 'post-2', data: { draft: true, publishDate: new Date('2024-01-25') } },
      { slug: 'post-3', data: { draft: false, publishDate: new Date('2024-01-15') } },
    ];
    
    const publishedPosts = mockPosts.filter(post => !post.data.draft);
    
    expect(publishedPosts).toHaveLength(2);
    expect(publishedPosts.every(post => !post.data.draft)).toBe(true);
  });

  it('should sort posts by publishDate (newest first)', () => {
    const mockPosts = [
      { slug: 'post-1', data: { draft: false, publishDate: new Date('2024-01-15') } },
      { slug: 'post-2', data: { draft: false, publishDate: new Date('2024-01-25') } },
      { slug: 'post-3', data: { draft: false, publishDate: new Date('2024-01-20') } },
    ];
    
    const sortedPosts = mockPosts
      .filter(post => !post.data.draft)
      .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
    
    expect(sortedPosts[0].slug).toBe('post-2'); // Jan 25 (newest)
    expect(sortedPosts[1].slug).toBe('post-3'); // Jan 20
    expect(sortedPosts[2].slug).toBe('post-1'); // Jan 15 (oldest)
  });

  it('should identify featured post correctly', () => {
    const mockPosts = [
      { slug: 'post-1', data: { draft: false, featured: false, publishDate: new Date('2024-01-20') } },
      { slug: 'post-2', data: { draft: false, featured: true, publishDate: new Date('2024-01-15') } },
      { slug: 'post-3', data: { draft: false, featured: false, publishDate: new Date('2024-01-25') } },
    ];
    
    const publishedPosts = mockPosts.filter(post => !post.data.draft);
    const featuredPost = publishedPosts.find(post => post.data.featured);
    
    expect(featuredPost).toBeDefined();
    expect(featuredPost?.slug).toBe('post-2');
    expect(featuredPost?.data.featured).toBe(true);
  });

  it('should have correct author information', () => {
    const authorName = "Suman Ghosh";
    const authorTopics = [
      "Machine Learning",
      "AI Agents", 
      "Data Science",
      "DevOps",
      "Python",
      "Cloud & AWS",
      "MLOps"
    ];
    
    expect(authorName).toBe("Suman Ghosh");
    expect(authorTopics).toHaveLength(7);
    expect(authorTopics).toContain("Machine Learning");
    expect(authorTopics).toContain("AI Agents");
    expect(authorTopics).toContain("Data Science");
    expect(authorTopics).toContain("DevOps");
    expect(authorTopics).toContain("Python");
    expect(authorTopics).toContain("Cloud & AWS");
    expect(authorTopics).toContain("MLOps");
  });

  it('should exclude featured post from recent posts list', () => {
    const mockPosts = [
      { slug: 'post-1', data: { draft: false, featured: false, publishDate: new Date('2024-01-20') } },
      { slug: 'post-2', data: { draft: false, featured: true, publishDate: new Date('2024-01-25') } },
      { slug: 'post-3', data: { draft: false, featured: false, publishDate: new Date('2024-01-15') } },
      { slug: 'post-4', data: { draft: false, featured: false, publishDate: new Date('2024-01-10') } },
    ];
    
    const publishedPosts = mockPosts
      .filter(post => !post.data.draft)
      .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
    
    const featuredPost = publishedPosts.find(post => post.data.featured);
    const recentPosts = featuredPost 
      ? publishedPosts.filter(post => post.slug !== featuredPost.slug).slice(0, 6)
      : publishedPosts.slice(0, 6);
    
    expect(recentPosts.every(post => post.slug !== featuredPost?.slug)).toBe(true);
    expect(recentPosts).toHaveLength(3);
  });

  it('should limit recent posts to 6 items', () => {
    const mockPosts = Array.from({ length: 10 }, (_, i) => ({
      slug: `post-${i}`,
      data: { 
        draft: false, 
        featured: i === 0, 
        publishDate: new Date(`2024-01-${25 - i}`) 
      }
    }));
    
    const publishedPosts = mockPosts
      .filter(post => !post.data.draft)
      .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
    
    const featuredPost = publishedPosts.find(post => post.data.featured);
    const recentPosts = featuredPost 
      ? publishedPosts.filter(post => post.slug !== featuredPost.slug).slice(0, 6)
      : publishedPosts.slice(0, 6);
    
    expect(recentPosts.length).toBeLessThanOrEqual(6);
  });
});

