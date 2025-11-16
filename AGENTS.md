# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Rules

- Use `astro add` for official integrations (e.g. astro add tailwind, astro add react). For other packages, install using the command for the preferred package manager rather than editing package.json directly.
- Always check the latest docs before implementing new features.

## Project Overview

Saral Theme is an Astro-based personal blog theme with a focus on simplicity and accessibility. The project uses TypeScript, Tailwind CSS v4, and various Astro integrations for MDX, RSS, sitemap generation, and icon support.

## Project Docs

- Astro docs are avaialble at https://docs.astro.build. A small docs sitemap is avaialble at https://docs.astro.build/llms.txt. A comprehensive one is at https://docs.astro.build/llms-full.txt. Fallback to the astro-docs MCP server when necessary.

## Development Commands

### Core Development

- `npm run dev` or `npm run start` - Start the development server
- `npm run build` - Type check with Astro and build for production
- `npm run preview` - Preview production build locally

### Code Quality

- `npm run lint` - Run ESLint on .js, .jsx, .ts, .tsx, and .astro files
- `npm run lint:fix` - Auto-fix linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting without modifying files
- `npm run astro check` - Run Astro's type checking

### Pre-commit Workflow

Always run these commands before committing:

1. `npm run format:check`
2. `npm run lint`
3. `npm run astro check`
4. `npm run build`

## Architecture

### Content Management

- **Blog posts** are markdown files in `src/content/blog/`
- The filename becomes the URL slug (e.g., `my-post.md` → `/blog/my-post`)
- Blog schema defined in `src/content/config.ts` requires: `title`, `description`, `pubDate`, and optionally `updatedDate` and `coverImageCredit`
- Cover images must be placed at `src/assets/blogimages/<SLUG>/cover.jpg` (recommended: 853×480px)
- Blog images for content go in `src/assets/blogimages/<SLUG>/` and are referenced as `![Alt](../../assets/blogimages/<SLUG>/image.ext)`

### Custom Remark/Rehype Plugins

The project uses custom plugins in `src/plugins/`:

- **remark-reading-time.mjs** - Automatically calculates reading time and adds `minutesRead` to frontmatter
- **remark-modified-time.mjs** - Uses git history to add `lastModified` timestamp to frontmatter

These plugins inject data into frontmatter at build time, so the blog post schema doesn't need to include these fields.

### Site Configuration

- `src/consts.ts` - Global constants including `SITE_TITLE`, `SITE_DESCRIPTION`, `SITE_BASE`, and navigation/social links
- `astro.config.mjs` - Site URL is `https://gregbarbosa.github.io` with base path `/`
- Before deploying to a subdirectory, update `SITE_BASE` in `src/consts.ts`

### Path Aliases

TypeScript path aliases are configured in `tsconfig.json`:

- `@/*` → `src/*`
- `@blogimages/*` → `src/assets/blogimages/*`

### Styling

- Uses Tailwind CSS v4 via Vite plugin (`@tailwindcss/vite`)
- Global styles in `src/styles/global.css`
- Tailwind config is minimal - content paths are set to scan all relevant file types

### Components & Layouts

- `src/components/` - Reusable Astro components (navbar, footer, blog cards, etc.)
- `src/layouts/` - Base layouts including `BaseLayout.astro` and `BlogPostLayout.astro`
- Dynamic routing for blog posts in `src/pages/blog/[...slug].astro`

### Integrations

- **@astrojs/mdx** - MDX support for rich content
- **@astrojs/sitemap** - Automatic sitemap generation
- **@astrojs/partytown** - Third-party scripts (configured for Google Analytics via `dataLayer.push`)
- **astro-icon** - Icon component using Iconify
- **rehype-figure-title** - Automatic figure captions for images
- **rehype-accessible-emojis** - Accessible emoji support

### ESLint Configuration

The project uses a strict ESLint setup:

- No console statements allowed (`no-console: error`)
- Strict TypeScript rules (no `any`, no non-null assertions)
- Astro-specific linting rules
- JSX accessibility rules for .jsx/.tsx files
- Config files (\*.config.js/mjs/ts) are ignored

## Git Workflow Notes

- Current branch: `dev`
- Main branch for PRs: `main`
- GitHub Actions run on pushes/PRs to `main` and `develop` branches
- Linting workflow tests against Node 18.x and 20.x

## Deployment

- Configured for GitHub Pages deployment
- Remove `.github/workflows/deploy.yml` if not using GitHub Pages
- Remove `<meta name="robots" content="noindex" />` from `src/components/BaseHead.astro` before production deployment
