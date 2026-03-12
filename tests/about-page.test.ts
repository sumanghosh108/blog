/**
 * Unit tests for About page
 * Validates Requirements: 5.1, 5.2, 5.3
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('About Page', () => {
  const aboutPagePath = join(process.cwd(), 'dist', 'about', 'index.html');
  let aboutPageHTML: string;

  try {
    aboutPageHTML = readFileSync(aboutPagePath, 'utf-8');
  } catch (error) {
    aboutPageHTML = '';
  }

  it('should exist and be generated', () => {
    expect(aboutPageHTML).toBeTruthy();
    expect(aboutPageHTML.length).toBeGreaterThan(0);
  });

  it('should display author name "Suman Ghosh"', () => {
    expect(aboutPageHTML).toContain('Suman Ghosh');
  });

  it('should list all expertise topics', () => {
    const expertiseTopics = [
      'Machine Learning',
      'AI Agents',
      'Data Science',
      'DevOps',
      'Python',
      'Cloud & AWS',
      'MLOps'
    ];

    expertiseTopics.forEach(topic => {
      expect(aboutPageHTML).toContain(topic);
    });
  });

  it('should include author bio section', () => {
    expect(aboutPageHTML).toContain('Background');
    expect(aboutPageHTML).toContain('passionate technologist');
  });

  it('should include contact information or social links', () => {
    // Check for social links
    const hasSocialLinks = 
      aboutPageHTML.includes('github.com') ||
      aboutPageHTML.includes('linkedin.com') ||
      aboutPageHTML.includes('mailto:');
    
    expect(hasSocialLinks).toBe(true);
  });

  it('should have proper page title and meta description', () => {
    expect(aboutPageHTML).toContain('<title>About');
    expect(aboutPageHTML).toContain('Suman Ghosh');
  });

  it('should use PageLayout component structure', () => {
    // Check for container and prose classes that PageLayout provides
    expect(aboutPageHTML).toContain('container');
    expect(aboutPageHTML).toContain('prose');
  });

  it('should have sections for expertise areas', () => {
    expect(aboutPageHTML).toContain('Areas of Expertise');
  });

  it('should have a "What I Write About" section', () => {
    expect(aboutPageHTML).toContain('What I Write About');
  });

  it('should have a "Get in Touch" section', () => {
    expect(aboutPageHTML).toContain('Get in Touch');
  });

  it('should display expertise topics in a grid layout', () => {
    // Check for grid classes
    expect(aboutPageHTML).toContain('grid');
  });

  it('should have links that open in new tabs for external sites', () => {
    // Check for target="_blank" and rel="noopener noreferrer"
    if (aboutPageHTML.includes('github.com') || aboutPageHTML.includes('linkedin.com')) {
      expect(aboutPageHTML).toContain('target="_blank"');
      expect(aboutPageHTML).toContain('rel="noopener noreferrer"');
    }
  });
});
