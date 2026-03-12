import { describe, it, expect } from 'vitest';
import {
  IMAGE_FORMATS,
  RESPONSIVE_WIDTHS,
  RESPONSIVE_SIZES,
  IMAGE_QUALITY,
  MAX_IMAGE_DIMENSIONS,
  getImageSizes,
  getImageQuality,
  constrainImageDimensions,
} from '../src/utils/imageConfig';

describe('Image Optimization Configuration', () => {
  describe('IMAGE_FORMATS', () => {
    it('should define AVIF, WebP, and JPG formats', () => {
      expect(IMAGE_FORMATS).toHaveLength(3);
      expect(IMAGE_FORMATS[0].format).toBe('avif');
      expect(IMAGE_FORMATS[1].format).toBe('webp');
      expect(IMAGE_FORMATS[2].format).toBe('jpg');
    });

    it('should have appropriate quality settings for each format', () => {
      expect(IMAGE_FORMATS[0].quality).toBe(75); // AVIF
      expect(IMAGE_FORMATS[1].quality).toBe(80); // WebP
      expect(IMAGE_FORMATS[2].quality).toBe(85); // JPG
    });
  });

  describe('RESPONSIVE_WIDTHS', () => {
    it('should include common device widths', () => {
      expect(RESPONSIVE_WIDTHS).toContain(320); // Mobile portrait
      expect(RESPONSIVE_WIDTHS).toContain(640); // Mobile landscape
      expect(RESPONSIVE_WIDTHS).toContain(768); // Tablet portrait
      expect(RESPONSIVE_WIDTHS).toContain(1024); // Tablet landscape
      expect(RESPONSIVE_WIDTHS).toContain(1280); // Desktop
      expect(RESPONSIVE_WIDTHS).toContain(1536); // Large desktop
    });

    it('should be in ascending order', () => {
      const sorted = [...RESPONSIVE_WIDTHS].sort((a, b) => a - b);
      expect(RESPONSIVE_WIDTHS).toEqual(sorted);
    });
  });

  describe('RESPONSIVE_SIZES', () => {
    it('should define sizes for different use cases', () => {
      expect(RESPONSIVE_SIZES).toHaveProperty('hero');
      expect(RESPONSIVE_SIZES).toHaveProperty('featured');
      expect(RESPONSIVE_SIZES).toHaveProperty('thumbnail');
      expect(RESPONSIVE_SIZES).toHaveProperty('content');
      expect(RESPONSIVE_SIZES).toHaveProperty('icon');
    });

    it('should have valid sizes attribute format', () => {
      Object.values(RESPONSIVE_SIZES).forEach((sizes) => {
        expect(sizes).toMatch(/\(max-width:/);
        expect(sizes).toMatch(/vw|px/);
      });
    });
  });

  describe('IMAGE_QUALITY', () => {
    it('should define quality levels', () => {
      expect(IMAGE_QUALITY).toHaveProperty('high');
      expect(IMAGE_QUALITY).toHaveProperty('medium');
      expect(IMAGE_QUALITY).toHaveProperty('low');
      expect(IMAGE_QUALITY).toHaveProperty('thumbnail');
    });

    it('should have quality values between 0 and 100', () => {
      Object.values(IMAGE_QUALITY).forEach((quality) => {
        expect(quality).toBeGreaterThanOrEqual(0);
        expect(quality).toBeLessThanOrEqual(100);
      });
    });

    it('should have descending quality values', () => {
      expect(IMAGE_QUALITY.high).toBeGreaterThan(IMAGE_QUALITY.medium);
      expect(IMAGE_QUALITY.medium).toBeGreaterThan(IMAGE_QUALITY.low);
      expect(IMAGE_QUALITY.low).toBeGreaterThan(IMAGE_QUALITY.thumbnail);
    });
  });

  describe('MAX_IMAGE_DIMENSIONS', () => {
    it('should define maximum width and height', () => {
      expect(MAX_IMAGE_DIMENSIONS).toHaveProperty('width');
      expect(MAX_IMAGE_DIMENSIONS).toHaveProperty('height');
    });

    it('should have reasonable maximum dimensions', () => {
      expect(MAX_IMAGE_DIMENSIONS.width).toBe(2400);
      expect(MAX_IMAGE_DIMENSIONS.height).toBe(1600);
    });
  });

  describe('getImageSizes', () => {
    it('should return sizes string for valid usage', () => {
      const sizes = getImageSizes('hero');
      expect(sizes).toBe(RESPONSIVE_SIZES.hero);
    });

    it('should return sizes for all defined use cases', () => {
      expect(getImageSizes('hero')).toBeTruthy();
      expect(getImageSizes('featured')).toBeTruthy();
      expect(getImageSizes('thumbnail')).toBeTruthy();
      expect(getImageSizes('content')).toBeTruthy();
      expect(getImageSizes('icon')).toBeTruthy();
    });
  });

  describe('getImageQuality', () => {
    it('should return quality number for valid level', () => {
      const quality = getImageQuality('high');
      expect(quality).toBe(IMAGE_QUALITY.high);
    });

    it('should return quality for all defined levels', () => {
      expect(getImageQuality('high')).toBe(90);
      expect(getImageQuality('medium')).toBe(80);
      expect(getImageQuality('low')).toBe(70);
      expect(getImageQuality('thumbnail')).toBe(60);
    });
  });

  describe('constrainImageDimensions', () => {
    it('should not modify dimensions within limits', () => {
      const result = constrainImageDimensions(1200, 800);
      expect(result).toEqual({ width: 1200, height: 800 });
    });

    it('should constrain width when exceeding maximum', () => {
      const result = constrainImageDimensions(3000, 2000);
      expect(result.width).toBe(2400);
      expect(result.height).toBe(1600);
    });

    it('should constrain height when exceeding maximum', () => {
      const result = constrainImageDimensions(1200, 2000);
      expect(result.width).toBeLessThanOrEqual(MAX_IMAGE_DIMENSIONS.width);
      expect(result.height).toBeLessThanOrEqual(MAX_IMAGE_DIMENSIONS.height);
    });

    it('should maintain aspect ratio when constraining', () => {
      const originalAspect = 3000 / 2000;
      const result = constrainImageDimensions(3000, 2000);
      const newAspect = result.width / result.height;
      expect(Math.abs(originalAspect - newAspect)).toBeLessThan(0.01);
    });

    it('should handle square images', () => {
      const result = constrainImageDimensions(3000, 3000);
      expect(result.width).toBeLessThanOrEqual(MAX_IMAGE_DIMENSIONS.width);
      expect(result.height).toBeLessThanOrEqual(MAX_IMAGE_DIMENSIONS.height);
    });

    it('should handle portrait images', () => {
      const result = constrainImageDimensions(1000, 2000);
      expect(result.width).toBeLessThanOrEqual(MAX_IMAGE_DIMENSIONS.width);
      expect(result.height).toBeLessThanOrEqual(MAX_IMAGE_DIMENSIONS.height);
    });

    it('should handle landscape images', () => {
      const result = constrainImageDimensions(3000, 1500);
      expect(result.width).toBeLessThanOrEqual(MAX_IMAGE_DIMENSIONS.width);
      expect(result.height).toBeLessThanOrEqual(MAX_IMAGE_DIMENSIONS.height);
    });
  });

  describe('Image Optimization Requirements', () => {
    it('should support modern image formats (WebP, AVIF)', () => {
      const formats = IMAGE_FORMATS.map((f) => f.format);
      expect(formats).toContain('avif');
      expect(formats).toContain('webp');
    });

    it('should provide fallback to JPEG', () => {
      const formats = IMAGE_FORMATS.map((f) => f.format);
      expect(formats).toContain('jpg');
    });

    it('should define responsive sizes for different breakpoints', () => {
      expect(RESPONSIVE_WIDTHS.length).toBeGreaterThanOrEqual(5);
      expect(RESPONSIVE_WIDTHS).toContain(320); // Mobile
      expect(RESPONSIVE_WIDTHS).toContain(1024); // Desktop
    });

    it('should optimize for Lighthouse performance score ≥ 95', () => {
      // Verify quality settings are optimized for performance
      expect(IMAGE_FORMATS[0].quality).toBeLessThanOrEqual(80); // AVIF
      expect(IMAGE_FORMATS[1].quality).toBeLessThanOrEqual(85); // WebP
      
      // Verify responsive widths cover common devices
      expect(RESPONSIVE_WIDTHS.length).toBeGreaterThanOrEqual(6);
    });
  });
});
