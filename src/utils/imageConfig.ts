/**
 * Image optimization configuration for the blog
 * Validates Requirements: 7.3 - Automatic image optimization
 */

export interface ImageFormat {
  format: 'avif' | 'webp' | 'png' | 'jpg';
  quality: number;
}

export interface ResponsiveSize {
  breakpoint: string;
  width: number;
}

/**
 * Supported image formats in order of preference
 * AVIF provides best compression, WebP is widely supported, JPG is fallback
 */
export const IMAGE_FORMATS: ImageFormat[] = [
  { format: 'avif', quality: 75 },
  { format: 'webp', quality: 80 },
  { format: 'jpg', quality: 85 },
];

/**
 * Responsive image widths for different breakpoints
 * Aligned with TailwindCSS breakpoints and blog layout constraints
 */
export const RESPONSIVE_WIDTHS = [320, 640, 768, 1024, 1280, 1536];

/**
 * Responsive sizes configuration for different use cases
 */
export const RESPONSIVE_SIZES = {
  // Full-width hero images
  hero: '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px',
  
  // Blog post featured images
  featured: '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1000px',
  
  // Post card thumbnails
  thumbnail: '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 400px',
  
  // Inline content images
  content: '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px',
  
  // Small icons or avatars
  icon: '(max-width: 640px) 64px, 96px',
};

/**
 * Default image quality settings
 */
export const IMAGE_QUALITY = {
  high: 90,
  medium: 80,
  low: 70,
  thumbnail: 60,
};

/**
 * Maximum image dimensions to prevent oversized images
 */
export const MAX_IMAGE_DIMENSIONS = {
  width: 2400,
  height: 1600,
};

/**
 * Get the appropriate sizes attribute for an image based on its usage
 */
export function getImageSizes(usage: keyof typeof RESPONSIVE_SIZES): string {
  return RESPONSIVE_SIZES[usage];
}

/**
 * Get the appropriate quality setting for an image
 */
export function getImageQuality(level: keyof typeof IMAGE_QUALITY): number {
  return IMAGE_QUALITY[level];
}

/**
 * Validate image dimensions and return constrained dimensions if needed
 */
export function constrainImageDimensions(
  width: number,
  height: number
): { width: number; height: number } {
  const maxWidth = MAX_IMAGE_DIMENSIONS.width;
  const maxHeight = MAX_IMAGE_DIMENSIONS.height;

  if (width <= maxWidth && height <= maxHeight) {
    return { width, height };
  }

  const aspectRatio = width / height;

  // If width exceeds max, scale down based on width
  if (width > maxWidth) {
    const newWidth = maxWidth;
    const newHeight = Math.round(maxWidth / aspectRatio);
    
    // Check if the new height also exceeds max
    if (newHeight > maxHeight) {
      return {
        width: Math.round(maxHeight * aspectRatio),
        height: maxHeight,
      };
    }
    
    return { width: newWidth, height: newHeight };
  }

  // If only height exceeds max, scale down based on height
  return {
    width: Math.round(maxHeight * aspectRatio),
    height: maxHeight,
  };
}
