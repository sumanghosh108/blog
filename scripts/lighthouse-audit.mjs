#!/usr/bin/env node

/**
 * Lighthouse Performance Audit Script
 * 
 * Runs Lighthouse audits on key pages of the blog to verify:
 * - Performance score ≥ 95
 * - Loading times across pages
 * 
 * Requirements: 7.1, 7.4
 */

import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:4321';

// Key pages to audit
const PAGES = [
  { name: 'Homepage', url: '/' },
  { name: 'Blog List', url: '/blog' },
  { name: 'Blog Post - YOLOv8', url: '/blog/yolov8-brain-tumor-detection' },
  { name: 'Blog Post - AI Agents', url: '/blog/building-ai-agents-locally' },
  { name: 'Tags Page', url: '/tags' },
  { name: 'About Page', url: '/about' },
];

const PERFORMANCE_THRESHOLD = 95;

async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'error',
    output: 'json',
    onlyCategories: ['performance'],
    port: chrome.port,
  };

  const runnerResult = await lighthouse(url, options);
  await chrome.kill();

  return runnerResult;
}

async function auditPage(page) {
  const url = `${BASE_URL}${page.url}`;
  console.log(`\n🔍 Auditing: ${page.name}`);
  console.log(`   URL: ${url}`);

  try {
    const result = await runLighthouse(url);
    const { lhr } = result;

    const performanceScore = lhr.categories.performance.score * 100;
    const metrics = lhr.audits['metrics'].details.items[0];

    const results = {
      name: page.name,
      url: page.url,
      performanceScore: Math.round(performanceScore),
      metrics: {
        firstContentfulPaint: Math.round(metrics.firstContentfulPaint),
        largestContentfulPaint: Math.round(metrics.largestContentfulPaint),
        totalBlockingTime: Math.round(metrics.totalBlockingTime),
        cumulativeLayoutShift: metrics.cumulativeLayoutShift.toFixed(3),
        speedIndex: Math.round(metrics.speedIndex),
        timeToInteractive: Math.round(metrics.interactive),
      },
      passed: performanceScore >= PERFORMANCE_THRESHOLD,
    };

    // Display results
    console.log(`   ✓ Performance Score: ${results.performanceScore}/100`);
    console.log(`   ✓ First Contentful Paint: ${results.metrics.firstContentfulPaint}ms`);
    console.log(`   ✓ Largest Contentful Paint: ${results.metrics.largestContentfulPaint}ms`);
    console.log(`   ✓ Total Blocking Time: ${results.metrics.totalBlockingTime}ms`);
    console.log(`   ✓ Cumulative Layout Shift: ${results.metrics.cumulativeLayoutShift}`);
    console.log(`   ✓ Speed Index: ${results.metrics.speedIndex}ms`);
    console.log(`   ✓ Time to Interactive: ${results.metrics.timeToInteractive}ms`);

    if (results.passed) {
      console.log(`   ✅ PASSED (≥${PERFORMANCE_THRESHOLD})`);
    } else {
      console.log(`   ❌ FAILED (Expected ≥${PERFORMANCE_THRESHOLD}, got ${results.performanceScore})`);
    }

    return results;
  } catch (error) {
    console.error(`   ❌ Error auditing ${page.name}:`, error.message);
    return {
      name: page.name,
      url: page.url,
      error: error.message,
      passed: false,
    };
  }
}

async function main() {
  console.log('🚀 Starting Lighthouse Performance Audit');
  console.log(`📊 Performance Threshold: ≥${PERFORMANCE_THRESHOLD}`);
  console.log(`🌐 Base URL: ${BASE_URL}`);
  console.log('=' .repeat(60));

  const results = [];

  for (const page of PAGES) {
    const result = await auditPage(page);
    results.push(result);
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📈 AUDIT SUMMARY');
  console.log('='.repeat(60));

  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  const avgScore = Math.round(
    results
      .filter(r => r.performanceScore)
      .reduce((sum, r) => sum + r.performanceScore, 0) / 
    results.filter(r => r.performanceScore).length
  );

  console.log(`\nTotal Pages Audited: ${results.length}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📊 Average Performance Score: ${avgScore}/100`);

  // Detailed results table
  console.log('\n📋 Detailed Results:');
  console.log('-'.repeat(60));
  results.forEach(r => {
    const status = r.passed ? '✅' : '❌';
    const score = r.performanceScore || 'ERROR';
    console.log(`${status} ${r.name.padEnd(25)} ${score}/100`);
  });

  // Save results to file
  const outputDir = 'tests/performance';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outputFile = path.join(outputDir, `lighthouse-results-${timestamp}.json`);
  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
  console.log(`\n💾 Results saved to: ${outputFile}`);

  // Exit with appropriate code
  if (failed > 0) {
    console.log('\n❌ Some pages failed to meet the performance threshold.');
    process.exit(1);
  } else {
    console.log('\n✅ All pages meet the performance threshold!');
    process.exit(0);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
