#!/usr/bin/env node

/**
 * Simple Lighthouse Test using Puppeteer
 * Attempts to run Lighthouse with better error handling
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';

const execAsync = promisify(exec);

const pages = [
  { name: 'Homepage', url: 'http://localhost:4321/' },
  { name: 'Blog List', url: 'http://localhost:4321/blog' },
  { name: 'Blog Post', url: 'http://localhost:4321/blog/yolov8-brain-tumor-detection' },
  { name: 'Tags', url: 'http://localhost:4321/tags' },
  { name: 'About', url: 'http://localhost:4321/about' },
];

async function testPage(page) {
  console.log(`\n🔍 Testing: ${page.name}`);
  console.log(`   URL: ${page.url}`);
  
  try {
    // Try with minimal flags
    const command = `lighthouse "${page.url}" --only-categories=performance --output=json --output-path=./tests/performance/${page.name.toLowerCase().replace(/\s+/g, '-')}.json --chrome-flags="--no-sandbox --disable-dev-shm-usage" --quiet`;
    
    const { stdout, stderr } = await execAsync(command, { timeout: 60000 });
    
    // Read the results
    const resultFile = `./tests/performance/${page.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    if (fs.existsSync(resultFile)) {
      const data = JSON.parse(fs.readFileSync(resultFile, 'utf8'));
      const score = Math.round(data.categories.performance.score * 100);
      const metrics = data.audits.metrics.details.items[0];
      
      console.log(`   ✅ Performance Score: ${score}/100`);
      console.log(`   ✓ FCP: ${Math.round(metrics.firstContentfulPaint)}ms`);
      console.log(`   ✓ LCP: ${Math.round(metrics.largestContentfulPaint)}ms`);
      console.log(`   ✓ TBT: ${Math.round(metrics.totalBlockingTime)}ms`);
      console.log(`   ✓ CLS: ${metrics.cumulativeLayoutShift.toFixed(3)}`);
      
      return { name: page.name, score, passed: score >= 95 };
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    return { name: page.name, error: error.message, passed: false };
  }
}

async function main() {
  console.log('🚀 Running Lighthouse Performance Tests');
  console.log('=' .repeat(60));
  
  const results = [];
  
  for (const page of pages) {
    const result = await testPage(page);
    results.push(result);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  
  results.forEach(r => {
    const status = r.passed ? '✅' : '❌';
    const score = r.score || 'ERROR';
    console.log(`${status} ${r.name.padEnd(20)} ${score}`);
  });
  
  const passed = results.filter(r => r.passed).length;
  console.log(`\n✅ Passed: ${passed}/${results.length}`);
  
  if (passed === results.length) {
    console.log('\n✅ All pages meet performance threshold (≥95)');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some pages did not meet threshold');
    process.exit(1);
  }
}

main().catch(console.error);
