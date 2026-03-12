import { describe, it, expect } from 'vitest';
import { calculateReadingTime } from '../src/utils/readingTime';

describe('calculateReadingTime', () => {
  it('calculates reading time for 225 words as 1 minute', () => {
    const content = 'word '.repeat(225);
    const result = calculateReadingTime(content);
    expect(result.minutes).toBe(1);
    expect(result.words).toBe(225);
    expect(result.text).toBe('1 min read');
  });

  it('calculates reading time for 450 words as 2 minutes', () => {
    const content = 'word '.repeat(450);
    const result = calculateReadingTime(content);
    expect(result.minutes).toBe(2);
    expect(result.words).toBe(450);
    expect(result.text).toBe('2 min read');
  });

  it('rounds up partial minutes', () => {
    const content = 'word '.repeat(250); // 250 words should round up to 2 minutes
    const result = calculateReadingTime(content);
    expect(result.minutes).toBe(2);
    expect(result.words).toBe(250);
  });

  it('handles empty content', () => {
    const result = calculateReadingTime('');
    expect(result.minutes).toBe(0);
    expect(result.words).toBe(0);
    expect(result.text).toBe('0 min read');
  });

  it('handles single word', () => {
    const result = calculateReadingTime('hello');
    expect(result.minutes).toBe(1);
    expect(result.words).toBe(1);
    expect(result.text).toBe('1 min read');
  });

  it('handles content with multiple spaces', () => {
    const content = 'word    with    multiple    spaces';
    const result = calculateReadingTime(content);
    expect(result.words).toBe(4);
  });

  it('handles content with newlines and tabs', () => {
    const content = 'word\n\twith\n\tnewlines\n\tand\n\ttabs';
    const result = calculateReadingTime(content);
    expect(result.words).toBe(5);
  });

  it('calculates reading time within 200-250 wpm range', () => {
    // Test that 1000 words takes between 4-5 minutes (200-250 wpm)
    const content = 'word '.repeat(1000);
    const result = calculateReadingTime(content);
    expect(result.minutes).toBeGreaterThanOrEqual(4);
    expect(result.minutes).toBeLessThanOrEqual(5);
  });
});
