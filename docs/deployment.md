# GitHub Pages Deployment Guide

This document explains how the Suman Developer Blog is deployed to GitHub Pages with a custom domain.

## Overview

The blog is automatically deployed to GitHub Pages at `https://blog.sumannaba.in` using GitHub Actions whenever changes are pushed to the `main` branch.

## Configuration

### Astro Configuration

The `astro.config.mjs` file is configured for static site generation and GitHub Pages deployment:

```javascript
export default defineConfig({
  site: 'https://blog.sumannaba.in',
  base: '/',
  output: 'static',
  // ... other config
});
```

- **site**: The full URL where the blog will be hosted
- **base**: The base path (root `/` for custom domain)
- **output**: Set to `static` for GitHub Pages compatibility

### Custom Domain

The custom domain `blog.sumannaba.in` is configured via:

1. **CNAME file**: Located at `public/CNAME` containing the domain name
2. **DNS Configuration**: A CNAME record pointing to your GitHub Pages URL (configured in your DNS provider)

## GitHub Actions Workflow

The deployment workflow (`.github/workflows/deploy.yml`) runs automatically on:

- Push to `main` branch
- Manual trigger from GitHub Actions tab

### Workflow Steps

1. **Checkout**: Clones the repository
2. **Setup Node.js**: Installs Node.js 20 with npm caching
3. **Install Dependencies**: Runs `npm ci` for clean install
4. **Build**: Runs `npm run build` (includes type checking and Astro build)
5. **Upload Artifact**: Prepares the `dist` folder for deployment
6. **Deploy**: Deploys to GitHub Pages using official GitHub action

### Permissions

The workflow requires these permissions:
- `contents: read` - Read repository contents
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - Authenticate with GitHub Pages

## Repository Settings

To enable GitHub Pages deployment, configure these settings in your GitHub repository:

1. Go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Under **Custom domain**, enter `blog.sumannaba.in`
4. Enable **Enforce HTTPS**

## DNS Configuration

Configure your DNS provider with a CNAME record:

```
Type: CNAME
Name: blog
Value: <your-github-username>.github.io
TTL: 3600 (or your provider's default)
```

Replace `<your-github-username>` with your actual GitHub username.

## Deployment Process

1. Make changes to your blog (add posts, update components, etc.)
2. Commit and push to the `main` branch
3. GitHub Actions automatically triggers the deployment workflow
4. The workflow builds the site and deploys to GitHub Pages
5. Your changes are live at `https://blog.sumannaba.in` within 1-2 minutes

## Manual Deployment

To manually trigger a deployment:

1. Go to **Actions** tab in your GitHub repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow** button
4. Select the `main` branch
5. Click **Run workflow**

## Troubleshooting

### Build Failures

If the build fails:
1. Check the Actions tab for error logs
2. Run `npm run build` locally to reproduce the issue
3. Fix any TypeScript errors or build issues
4. Push the fix to trigger a new deployment

### Custom Domain Not Working

If your custom domain isn't working:
1. Verify the CNAME file exists in `public/CNAME`
2. Check DNS configuration with `dig blog.sumannaba.in`
3. Ensure GitHub Pages is configured with the custom domain
4. Wait for DNS propagation (can take up to 24 hours)

### 404 Errors

If you get 404 errors:
1. Verify the `base` path in `astro.config.mjs` is correct
2. Check that all internal links use relative paths
3. Ensure the site is fully deployed (check Actions tab)

## Local Preview

To preview the production build locally:

```bash
npm run build
npm run preview
```

This builds the site and serves it locally at `http://localhost:4321` to verify everything works before deployment.

## Performance

The deployed site is optimized for performance:
- Static HTML generation (no server required)
- Optimized assets (CSS, JS, images)
- CDN delivery via GitHub Pages
- Minimal JavaScript for fast loading

Expected Lighthouse scores:
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100
