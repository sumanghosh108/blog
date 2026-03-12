/**
 * Reading time calculation utility
 * Calculates estimated reading time based on word count
 */

export interface ReadingTimeResult {
  minutes: number;
  words: number;
  text: string;
}

/**
 * Calculates reading time for given content
 * Uses average reading speed of 225 words per minute (middle of 200-250 range)
 * 
 * @param content - The text content to analyze
 * @returns Object containing minutes, word count, and formatted text
 */
export function calculateReadingTime(content: string): ReadingTimeResult {
  // Remove extra whitespace and split into words
  const words = content.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  
  // Calculate reading time (225 words per minute)
  const wordsPerMinute = 225;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  // Format the text output
  const text = `${minutes} min read`;
  
  return {
    minutes,
    words: wordCount,
    text,
  };
}
