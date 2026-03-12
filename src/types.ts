import type { CollectionEntry } from 'astro:content';

/**
 * Blog post type from content collection
 */
export type BlogPost = CollectionEntry<'blog'>;

/**
 * Reading time calculation result
 */
export interface ReadingTimeResult {
  minutes: number;
  words: number;
  text: string; // e.g., "5 min read"
}

/**
 * Rendered blog post with additional computed properties
 */
export interface RenderedPost {
  id: string;
  slug: string;
  body: string;
  collection: 'blog';
  data: {
    title: string;
    description: string;
    publishDate: Date;
    author: string;
    tags: string[];
    image?: string;
    featured: boolean;
    draft: boolean;
  };
  headings: Array<{
    depth: number;
    text: string;
    slug: string;
  }>;
  Content: any; // Astro component type
  readingTime: ReadingTimeResult;
}
