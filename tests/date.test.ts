import { describe, it, expect } from 'vitest';
import { formatDate, getRelativeTime } from '../src/utils/date';

describe('formatDate', () => {
  it('formats date in long format by default', () => {
    const date = new Date('2024-01-15');
    const result = formatDate(date);
    expect(result).toBe('January 15, 2024');
  });

  it('formats date in short format when specified', () => {
    const date = new Date('2024-01-15');
    const result = formatDate(date, 'short');
    expect(result).toBe('Jan 15, 2024');
  });

  it('handles different months correctly', () => {
    const date = new Date('2024-12-25');
    const result = formatDate(date);
    expect(result).toBe('December 25, 2024');
  });
});

describe('getRelativeTime', () => {
  it('returns "just now" for very recent dates', () => {
    const date = new Date(Date.now() - 30 * 1000); // 30 seconds ago
    const result = getRelativeTime(date);
    expect(result).toBe('just now');
  });

  it('returns minutes for dates within the last hour', () => {
    const date = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes ago
    const result = getRelativeTime(date);
    expect(result).toBe('5 minutes ago');
  });

  it('returns singular "minute" for 1 minute ago', () => {
    const date = new Date(Date.now() - 1 * 60 * 1000); // 1 minute ago
    const result = getRelativeTime(date);
    expect(result).toBe('1 minute ago');
  });

  it('returns hours for dates within the last day', () => {
    const date = new Date(Date.now() - 3 * 60 * 60 * 1000); // 3 hours ago
    const result = getRelativeTime(date);
    expect(result).toBe('3 hours ago');
  });

  it('returns singular "hour" for 1 hour ago', () => {
    const date = new Date(Date.now() - 1 * 60 * 60 * 1000); // 1 hour ago
    const result = getRelativeTime(date);
    expect(result).toBe('1 hour ago');
  });

  it('returns days for dates within the last month', () => {
    const date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    const result = getRelativeTime(date);
    expect(result).toBe('7 days ago');
  });

  it('returns singular "day" for 1 day ago', () => {
    const date = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000); // 1 day ago
    const result = getRelativeTime(date);
    expect(result).toBe('1 day ago');
  });

  it('returns months for dates within the last year', () => {
    const date = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000); // ~2 months ago
    const result = getRelativeTime(date);
    expect(result).toBe('2 months ago');
  });

  it('returns singular "month" for 1 month ago', () => {
    const date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 1 month ago
    const result = getRelativeTime(date);
    expect(result).toBe('1 month ago');
  });

  it('returns years for dates over a year ago', () => {
    const date = new Date(Date.now() - 400 * 24 * 60 * 60 * 1000); // ~1 year ago
    const result = getRelativeTime(date);
    expect(result).toBe('1 year ago');
  });

  it('returns plural "years" for multiple years ago', () => {
    const date = new Date(Date.now() - 800 * 24 * 60 * 60 * 1000); // ~2 years ago
    const result = getRelativeTime(date);
    expect(result).toBe('2 years ago');
  });
});
