/**
 * Example usage of the Table of Contents utilities
 */

import { extractHeadings, generateTOC } from '../src/utils/toc';

// Example Markdown content
const markdownContent = `
# Introduction to Machine Learning

Machine learning is a subset of artificial intelligence.

## What is Machine Learning?

Machine learning enables computers to learn from data.

### Supervised Learning
Training with labeled data.

### Unsupervised Learning
Finding patterns in unlabeled data.

## Applications

### Healthcare
Medical diagnosis and treatment.

### Finance
Fraud detection and risk assessment.

## Conclusion

Machine learning is transforming industries.
`;

// Extract headings from Markdown
const headings = extractHeadings(markdownContent);

console.log('Extracted Headings:');
console.log(JSON.stringify(headings, null, 2));

// Generate HTML table of contents
const tocHTML = generateTOC(headings);

console.log('\nGenerated TOC HTML:');
console.log(tocHTML);
