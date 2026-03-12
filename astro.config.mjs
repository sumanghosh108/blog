import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
// Note: Sitemap integration will be added in a later task when content is available

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.sumannaba.in',
  base: '/',
  output: 'static',
  integrations: [
    tailwind(),
    // sitemap() - to be added when content pages are created
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  image: {
    // Configure image optimization
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    // Define responsive image sizes for different breakpoints
    // These match common device widths and blog layout constraints
    remotePatterns: [],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
