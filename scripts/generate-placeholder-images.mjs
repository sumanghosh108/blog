import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const IMAGES_DIR = 'public/images';

// Ensure images directory exists
await mkdir(IMAGES_DIR, { recursive: true });

// Generate placeholder image for YOLOv8 blog post
const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e293b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#334155;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#grad)"/>
  <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="56" font-weight="bold" fill="#f1f5f9" text-anchor="middle" dominant-baseline="middle">
    YOLOv8 Brain Tumor Detection
  </text>
  <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="28" fill="#94a3b8" text-anchor="middle" dominant-baseline="middle">
    Machine Learning - Computer Vision - Healthcare AI
  </text>
  <circle cx="100" cy="100" r="40" fill="#3b82f6" opacity="0.3"/>
  <circle cx="1100" cy="530" r="60" fill="#8b5cf6" opacity="0.3"/>
</svg>
`;

// Generate JPG version
await sharp(Buffer.from(svg))
  .jpeg({ quality: 90 })
  .toFile(join(IMAGES_DIR, 'yolov8-brain-tumor.jpg'));

console.log('✓ Generated yolov8-brain-tumor.jpg');

// Generate WebP version (for testing optimization)
await sharp(Buffer.from(svg))
  .webp({ quality: 80 })
  .toFile(join(IMAGES_DIR, 'yolov8-brain-tumor.webp'));

console.log('✓ Generated yolov8-brain-tumor.webp');

// Generate AVIF version (for testing optimization)
await sharp(Buffer.from(svg))
  .avif({ quality: 75 })
  .toFile(join(IMAGES_DIR, 'yolov8-brain-tumor.avif'));

console.log('✓ Generated yolov8-brain-tumor.avif');

// Generate placeholder for AI agents post
const aiAgentsSvg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e3a8a;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#grad2)"/>
  <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="56" font-weight="bold" fill="#f1f5f9" text-anchor="middle" dominant-baseline="middle">
    Building AI Agents Locally
  </text>
  <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="28" fill="#94a3b8" text-anchor="middle" dominant-baseline="middle">
    AI Agents - Machine Learning - LLMs
  </text>
</svg>
`;

await sharp(Buffer.from(aiAgentsSvg))
  .jpeg({ quality: 90 })
  .toFile(join(IMAGES_DIR, 'ai-agents-local.jpg'));

console.log('✓ Generated ai-agents-local.jpg');

// Generate placeholder for FastAPI AWS post
const fastApiSvg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#064e3b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#065f46;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#grad3)"/>
  <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="56" font-weight="bold" fill="#f1f5f9" text-anchor="middle" dominant-baseline="middle">
    FastAPI on AWS Deployment
  </text>
  <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="28" fill="#94a3b8" text-anchor="middle" dominant-baseline="middle">
    Python - Cloud and AWS - DevOps
  </text>
</svg>
`;

await sharp(Buffer.from(fastApiSvg))
  .jpeg({ quality: 90 })
  .toFile(join(IMAGES_DIR, 'fastapi-aws.jpg'));

console.log('✓ Generated fastapi-aws.jpg');

console.log('\n✅ All placeholder images generated successfully!');
