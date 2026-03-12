You are a senior frontend engineer and static-site architecture expert.

Build a **production-grade developer blog using Astro + Markdown** designed to be deployed on **GitHub Pages under the subdomain blog.sumannaba.in**.

## Core Requirements

Create a modern, fast, SEO-optimized blog with the following stack:

* Framework: **Astro**
* Content: **Markdown (MD files)**
* Styling: **TailwindCSS**
* Syntax highlighting for code blocks
* Static site generation
* Responsive modern UI
* Clean developer-focused design

## Blog Features

Implement the following pages and features:

### 1. Homepage

* Blog title
* Short author intro
* List of recent blog posts
* Featured post section
* Tag filtering
* Clean card layout for posts

### 2. Blog Post Page

* Render Markdown posts
* Author name
* Published date
* Tags
* Reading time
* Table of contents
* Code block syntax highlighting
* Copy code button
* Social sharing buttons

### 3. Tags Page

* List of all tags
* Clicking tag filters posts

### 4. About Page

Show information about the author:

Name: **Suman Ghosh**

Topics written about:

* Machine Learning
* AI Agents
* Data Science
* DevOps
* Python
* Cloud & AWS
* MLOps

### 5. SEO Optimization

Implement:

* meta tags
* OpenGraph tags
* Twitter cards
* sitemap.xml
* robots.txt
* canonical URLs

### 6. Performance

Optimize for:

* Lighthouse score 95+
* minimal JS
* fast loading
* image optimization

## Blog Content System

Use a **content collection** with this structure:

src/content/blog/

Example Markdown post:

---

title: "Building a YOLOv8 Brain Tumor Detection Model"
description: "Step by step guide to building a medical image detection model with YOLOv8"
date: 2026-03-01
tags: ["AI", "Computer Vision", "YOLOv8"]
author: "Suman Ghosh"
---------------------

Include support for:

* headings
* code blocks
* images
* diagrams

## Project Structure

blog/
│
├─ public/
│
├─ src/
│  ├─ components/
│  │   PostCard.astro
│  │   Navbar.astro
│  │   Footer.astro
│  │
│  ├─ layouts/
│  │   BlogLayout.astro
│  │   BaseLayout.astro
│  │
│  ├─ pages/
│  │   index.astro
│  │   blog/[slug].astro
│  │   tags/[tag].astro
│  │   about.astro
│  │
│  └─ content/blog/
│      first-post.md
│
├─ astro.config.mjs
├─ tailwind.config.js
└─ package.json

## Design Requirements

Design style should be similar to:

* Vercel blog
* Stripe engineering blog
* modern developer portfolio

Use:

* minimalist layout
* large readable typography
* dark mode support
* smooth hover effects
* mobile-first design

## GitHub Pages Deployment

Configure Astro for static output:

base: "/"

Provide deployment instructions:

npm install
npm run build

Then deploy using **GitHub Actions for GitHub Pages**.

## Extra Features

Add:

* RSS feed
* Search functionality
* Pagination
* Dark / light theme toggle
* Related posts section

## Example Blog Topics

Include sample markdown posts about:

* YOLOv8 brain tumor detection
* Building AI agents locally
* Deploying FastAPI on AWS
* Python interview logic problems
* Building ML pipelines

## Output

Provide:

1. Complete project structure
2. All configuration files
3. Tailwind setup
4. Example Markdown blog posts

Generate clean, modular, production-ready code.
