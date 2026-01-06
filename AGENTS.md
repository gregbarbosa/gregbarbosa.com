# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Rules

- Use `astro add` for official integrations (e.g. astro add tailwind, astro add react). For other packages, install using the command for the preferred package manager rather than editing package.json directly.
- Always check the latest docs before implementing new features.

### Browser Debugging Skills

- Use **web-browser** skill for everyday debugging (5x more context efficient):
  - Quick visual checks, screenshots, navigation
  - Simple DOM queries and element selection
  - Interactive element picker
- Use **chrome-devtools** skill only when needed:
  - Performance profiling (Core Web Vitals)
  - Network request analysis
  - Console error monitoring
  - Complex element discovery with snapshot.js
  - When structured JSON output is required

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
- Blog schema defined in `src/content/config.ts` requires: `title`, `description`, `author`, `pubDate`, and optionally `updatedDate`, `coverImageCredit`, and `category`
- Cover images must be placed at `src/assets/blogimages/<SLUG>/cover.jpg` (recommended: 853×480px)
- Blog images for content go in `src/assets/blogimages/<SLUG>/` and are referenced as `![Alt](../../assets/blogimages/<SLUG>/image.ext)`

### Obsidian Templates

- **Template location**: `templates/blog-post.md`
- **Frontmatter fields**: title, author, description, featured, category, pubDate, updatedDate
- **Templater syntax**: Uses `<% tp.file.creation_date("YYYY-MM-DD") %>` for dates

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

- Current branch: `main`
- Main branch: `main`
- GitHub Actions run on pushes to `main` branch
- Linting workflow tests against Node 20.x

## Obsidian Vault Workflow

This repo is configured as an Obsidian vault. See [OBSIDIAN-SETUP.md](./OBSIDIAN-SETUP.md) for plugin configuration.

**Content publishing workflow:**

1. Create note from template: `templates/blog-post.md`
2. Write content, add images to `src/assets/blogimages/`
3. Push from Obsidian Git
4. Auto-PR created → Auto-merged → Deployed

## Deployment

- Configured for GitHub Pages deployment

### Caching on GitHub Pages

GitHub Pages uses a hardcoded 10-minute cache TTL (`max-age=600`) for all `_astro/*` assets. This is a known limitation - custom cache headers in `public/_headers` are ignored.

**Impact:** Minor repeated downloads for visitors within 10-minute windows.
**Acceptable for:** Personal blogs with typical traffic patterns.

**Alternatives (if caching becomes an issue):**

- Connect Cloudflare (free) in front of GitHub Pages for full caching control
- Migrate to Vercel/Netlify which support proper immutable caching headers

## GitHub Actions CI/CD

After pushing to `main`, GitHub Actions automatically runs:

1. **Lint, Format, and Type Check** - Runs on Node 20.x:
   - `npm run format:check`
   - `npm run lint`
   - `npm run astro check`

2. **Deploy to GitHub Pages** - Builds and deploys on success (only runs after lint passes)

**Post-push workflow:**

1. Push to `main`
2. Wait ~1-2 minutes for CI to complete
3. Check status: `gh run list --limit 5`
4. If CI fails, check logs: `gh run view <run-id> --log`
5. Fix issues, commit, and push again

### Auto Content PR Workflow

This repo uses an auto-PR workflow for safe content publishing:

**How it works:**

- Push to any branch except `main` triggers the workflow
- Workflow checks if only content files changed (blog posts, images, templates)
- **Content-only changes**: Auto-creates PR → Waits for lint → Auto-merges → Deploys
- **Non-content changes**: Creates PR with warning comment → Requires manual review

**Protected files (require manual review):**

- `src/components/`, `src/layouts/`, `src/pages/`
- `astro.config.*`, `package.json`
- `.github/workflows/`, `.gitignore`

**Commands:**

- Check runs: `gh run list --limit 5`
- Check specific run: `gh run view <run-id> --log`
