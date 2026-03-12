# GitHub Pages Setup Instructions

This document provides step-by-step instructions for configuring your GitHub repository to deploy the Suman Developer Blog to GitHub Pages with the custom domain `blog.sumannaba.in`.

## Prerequisites

- GitHub repository created and code pushed
- Access to DNS settings for `sumannaba.in` domain

## Step 1: Configure GitHub Pages

1. Go to your GitHub repository
2. Click on **Settings** tab
3. In the left sidebar, click **Pages**
4. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions**
   - This allows the workflow in `.github/workflows/deploy.yml` to deploy the site

## Step 2: Configure Custom Domain

1. Still in **Settings** → **Pages**
2. Under **Custom domain**:
   - Enter: `blog.sumannaba.in`
   - Click **Save**
3. Wait for DNS check to complete (may take a few minutes)
4. Once DNS check passes, enable **Enforce HTTPS** (recommended)

## Step 3: Configure DNS Settings

Configure your DNS provider (where you manage `sumannaba.in`) with the following record:

### CNAME Record

```
Type: CNAME
Name: blog
Value: <your-github-username>.github.io
TTL: 3600 (or default)
```

**Replace `<your-github-username>`** with your actual GitHub username.

### Example

If your GitHub username is `sumanghosh`, the CNAME record would be:

```
Type: CNAME
Name: blog
Value: sumanghosh.github.io
TTL: 3600
```

### DNS Propagation

- DNS changes can take up to 24-48 hours to propagate globally
- You can check DNS propagation status using tools like:
  - https://dnschecker.org
  - Command: `dig blog.sumannaba.in`

## Step 4: Verify Deployment

1. Push a commit to the `main` branch
2. Go to **Actions** tab in your repository
3. You should see the "Deploy to GitHub Pages" workflow running
4. Wait for the workflow to complete (usually 1-2 minutes)
5. Visit `https://blog.sumannaba.in` to see your deployed site

## Step 5: Enable Branch Protection (Optional but Recommended)

1. Go to **Settings** → **Branches**
2. Click **Add rule** under "Branch protection rules"
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - Select the "build" check from the workflow
5. Click **Create** or **Save changes**

This ensures that only code that passes the build can be merged to main.

## Troubleshooting

### DNS Not Resolving

If `blog.sumannaba.in` doesn't resolve:

1. Verify CNAME record is correct in your DNS provider
2. Check DNS propagation: `dig blog.sumannaba.in`
3. Wait for DNS propagation (up to 24-48 hours)
4. Clear your browser cache and DNS cache

### GitHub Pages Shows 404

If you get a 404 error:

1. Check that the workflow completed successfully in Actions tab
2. Verify the CNAME file exists in the repository at `public/CNAME`
3. Check that GitHub Pages is configured to use GitHub Actions as source
4. Ensure the custom domain is set in repository settings

### Build Fails

If the GitHub Actions workflow fails:

1. Check the Actions tab for error logs
2. Run `npm run build` locally to reproduce the issue
3. Fix any errors and push again
4. Common issues:
   - Missing dependencies (run `npm install`)
   - TypeScript errors (run `npm run build` to see them)
   - Invalid Markdown frontmatter in blog posts

### HTTPS Not Working

If HTTPS doesn't work:

1. Ensure DNS is properly configured and propagated
2. Wait a few minutes after DNS propagation for GitHub to provision SSL certificate
3. Enable "Enforce HTTPS" in repository settings → Pages
4. GitHub automatically provisions SSL certificates via Let's Encrypt

## Workflow Details

The deployment workflow (`.github/workflows/deploy.yml`) automatically:

1. Triggers on push to `main` branch
2. Checks out the code
3. Sets up Node.js 20
4. Installs dependencies with `npm ci`
5. Runs `npm run build` (includes type checking)
6. Uploads the `dist` folder as an artifact
7. Deploys to GitHub Pages

## Manual Deployment

To manually trigger a deployment:

1. Go to **Actions** tab
2. Select "Deploy to GitHub Pages" workflow
3. Click **Run workflow**
4. Select `main` branch
5. Click **Run workflow** button

## Monitoring

After setup, you can monitor deployments:

- **Actions tab**: See all workflow runs and their status
- **Environments**: Settings → Environments → github-pages shows deployment history
- **Pages settings**: Shows current deployment status and URL

## Next Steps

After successful deployment:

1. Test the site at `https://blog.sumannaba.in`
2. Verify all pages load correctly
3. Check that images and assets load properly
4. Test navigation and links
5. Verify RSS feed: `https://blog.sumannaba.in/rss.xml`
6. Check sitemap: `https://blog.sumannaba.in/sitemap.xml`

## Support

If you encounter issues:

1. Check GitHub Pages documentation: https://docs.github.com/en/pages
2. Check Astro deployment guide: https://docs.astro.build/en/guides/deploy/github/
3. Review workflow logs in Actions tab for specific errors
