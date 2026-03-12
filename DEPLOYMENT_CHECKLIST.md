# GitHub Pages Deployment Checklist

Quick checklist for deploying the Astro Developer Blog to GitHub Pages with custom domain `blog.sumannaba.in`.

## ✅ Code Configuration (Already Complete)

- [x] Astro config has `site: 'https://blog.sumannaba.in'`
- [x] Astro config has `output: 'static'`
- [x] CNAME file created at `public/CNAME` with domain
- [x] GitHub Actions workflow created at `.github/workflows/deploy.yml`
- [x] Build script exists in `package.json`

## 📋 GitHub Repository Setup (Manual Steps Required)

### 1. Enable GitHub Pages

- [ ] Go to repository **Settings** → **Pages**
- [ ] Set **Source** to **GitHub Actions**
- [ ] Save changes

### 2. Configure Custom Domain

- [ ] In **Settings** → **Pages** → **Custom domain**
- [ ] Enter: `blog.sumannaba.in`
- [ ] Click **Save**
- [ ] Wait for DNS check
- [ ] Enable **Enforce HTTPS** when available

### 3. Configure DNS

- [ ] Log in to your DNS provider for `sumannaba.in`
- [ ] Add CNAME record:
  - **Type**: CNAME
  - **Name**: blog
  - **Value**: `<your-github-username>.github.io`
  - **TTL**: 3600 (or default)
- [ ] Save DNS changes
- [ ] Wait for DNS propagation (up to 24-48 hours)

### 4. Verify Deployment

- [ ] Push code to `main` branch
- [ ] Check **Actions** tab for workflow run
- [ ] Wait for workflow to complete
- [ ] Visit `https://blog.sumannaba.in`
- [ ] Verify site loads correctly

## 🔍 Verification Tests

After deployment, verify:

- [ ] Homepage loads: `https://blog.sumannaba.in`
- [ ] Blog posts load: `https://blog.sumannaba.in/blog/`
- [ ] About page loads: `https://blog.sumannaba.in/about/`
- [ ] Tags page loads: `https://blog.sumannaba.in/tags/`
- [ ] RSS feed works: `https://blog.sumannaba.in/rss.xml`
- [ ] Sitemap works: `https://blog.sumannaba.in/sitemap.xml`
- [ ] HTTPS is enabled (green padlock in browser)
- [ ] Images load correctly
- [ ] Navigation works
- [ ] Theme toggle works
- [ ] Search functionality works

## 🚀 Deployment Process (Automatic)

Once configured, deployment is automatic:

1. Make changes to code
2. Commit and push to `main` branch
3. GitHub Actions automatically builds and deploys
4. Site updates in 1-2 minutes

## 📚 Documentation

For detailed instructions, see:

- `docs/deployment.md` - Complete deployment guide
- `docs/github-pages-setup.md` - Step-by-step GitHub setup
- `.github/workflows/deploy.yml` - Workflow configuration

## 🆘 Troubleshooting

If deployment fails:

1. Check **Actions** tab for error logs
2. Run `npm run build` locally to test
3. Review `docs/github-pages-setup.md` troubleshooting section
4. Verify DNS configuration with `dig blog.sumannaba.in`

## 📞 Quick Commands

```bash
# Test build locally
npm run build

# Preview production build
npm run preview

# Check DNS
dig blog.sumannaba.in

# Check DNS propagation
nslookup blog.sumannaba.in
```

---

**Note**: The code configuration is complete. You only need to complete the GitHub repository setup and DNS configuration steps above.
