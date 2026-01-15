# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Rules

- Use `astro add` for official integrations (e.g. astro add tailwind, astro add react). For other packages, install using the command for the preferred package manager rather than editing package.json directly.
- Always check the latest docs before implementing new features.

### Page Structure

- **Read [PATTERNS.md](./PATTERNS.md) before creating or modifying pages** - All pages must follow the standard page structure using `PageLayout`
- Never duplicate layout wrappers inside `PageLayout` slots
- Always wrap page content in `max-w-2xl` or `max-w-3xl` with `mb-12`

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

- Astro docs are available at https://docs.astro.build. A small docs sitemap is avaialble at https://docs.astro.build/llms.txt. A comprehensive one is at https://docs.astro.build/llms-full.txt. Fallback to the astro-docs MCP server when necessary.
- Starwind UI docs are available at https://starwind.dev/docs/getting-started/ai/. Small docs sitemap is available at https://starwind.dev/llms.txt. Comprehgensive one is at https://starwind.dev/llms-full.txt. Fallback to the starwind ui MCP server when necessary.

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

## Conventional Commits

This project follows the **Conventional Commits** specification for all git commits. This ensures consistent, semantic commit messages that clearly communicate the type and impact of changes.

**Reference:** https://www.conventionalcommits.org/en/v1.0.0/

### Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Commit Types

Choose the type that best describes the primary purpose of your commit:

- **feat** - A new feature or capability
  - *Example:* `feat(homepage): add tagline subtitle`
  - Use when: Adding new functionality, new components, new pages
  
- **fix** - A bug fix
  - *Example:* `fix(navbar): correct mobile menu alignment`
  - Use when: Resolving a broken feature, fixing styling issues, patching bugs
  
- **style** - Code style changes (formatting, semicolons, whitespace) with NO logic impact
  - *Example:* `style(components): format button component`
  - Use when: Running Prettier, fixing ESLint warnings (non-logic), adjusting CSS whitespace
  - **DO NOT use for visual/design changes** - those are `fix` if buggy or `feat` if new
  
- **refactor** - Code restructuring without changing functionality or fixing bugs
  - *Example:* `refactor(layouts): extract common patterns into BaseLayout`
  - Use when: Reorganizing code, extracting components, improving code structure, renaming (without behavior change)
  
- **chore** - Maintenance tasks, dependency updates, tooling (no user-facing impact)
  - *Example:* `chore(deps): update astro to 4.15.0`
  - Use when: Package updates, build tool config, GitHub Actions changes, .gitignore modifications
  
- **docs** - Documentation updates
  - *Example:* `docs(readme): update installation instructions`
  - Use when: Updating README, comments, inline docs, or like this AGENTS.md update
  
- **perf** - Performance improvements
  - *Example:* `perf(images): lazy-load blog cover images`
  - Use when: Optimizing bundle size, reducing render time, caching improvements

### Scope (Optional but Recommended)

The scope specifies which part of the project is affected:

- `homepage` - Home page changes
- `navbar` - Navigation component
- `blog` - Blog system (posts, layouts)
- `components` - Reusable components
- `layouts` - Page layouts
- `styles` - Global styling
- `config` - Configuration files
- `deps` - Dependencies
- `ci` - CI/CD workflows

### Subject Line Rules

- Use imperative, present tense: **"add"** not **"added"** or **"adds"**
- Don't capitalize first letter: **"add"** not **"Add"**
- No period at the end
- Limit to ~50 characters
- Be specific and descriptive

### Body (Optional for Small Changes)

Use for commits with more context needed:

```
feat(projects): redesign projects page with tech stack

Add new sections for elevator pitch, why/how built, and access links.
Implement grid layout for better project organization.
Closes #36
```

### Breaking Changes

If a commit introduces a **breaking change** that affects users/developers:

```
feat(theme)!: remove light mode support, lighthouse-only

BREAKING CHANGE: Light theme mode is removed. Only lighthouse mode available.
Users must switch to lighthouse theme in settings.
```

Or add `BREAKING CHANGE:` in the footer:

```
refactor(nav)!: restructure navigation config

Complete rewrite of navigation structure.

BREAKING CHANGE: Old nav format no longer supported.
```

### Decision Tree: Which Type?

When in doubt, ask yourself:

1. **Does it add new capability?** → `feat`
2. **Does it fix something broken?** → `fix`
3. **Is it just formatting/whitespace?** → `style`
4. **Is it reorganizing without changing behavior?** → `refactor`
5. **Is it a dependency/build/config change?** → `chore`
6. **Is it making something faster?** → `perf`
7. **Is it updating docs?** → `docs`

### Common Examples for This Project

| Change | Type | Message |
|--------|------|---------|
| Add new blog sidebar component | `feat` | `feat(components): add blog sidebar widget` |
| Fix broken blog links | `fix` | `fix(blog): correct archive link routing` |
| Format code with Prettier | `style` | `style(components): format with Prettier` |
| Reorganize component folders | `refactor` | `refactor(components): reorganize by domain` |
| Update Astro version | `chore` | `chore(deps): update astro to 4.15.0` |
| Update AGENTS.md guidance | `docs` | `docs: add conventional commits guidance` |
| Optimize hero image loading | `perf` | `perf(homepage): lazy-load hero image` |

## Git Workflow Notes

- Current branch: `main`
- Main branch: `main`
- GitHub Actions run on pushes to `main` branch
- Linting workflow tests against Node 20.x

### Branch Management Strategy

- **Feature Branches**: Always create a new branch for features or fixes (e.g., `feature/nav-redesign`, `fix/broken-link`).
- **Selective Commits**: If work is mixed across different concerns (e.g., design vs. content), use `git checkout -b new-branch` and selectively `git add` specific files to separate the work into clean, focused branches.
- **Cleanup**: Delete feature branches after they are merged into `main` to keep the repository clean.
- **Squash & Merge**: Use "Squash and Merge" for PRs to keep the `main` history clean. Note that local git may not realize these are merged, so force delete (`git branch -D`) is often required locally.

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

**Self-Review & Approval Note:**
If the repository requires PR reviews but you are a solo developer, ensure repository settings allow bypassing reviews or uncheck "Require pull request reviews before merging" in Branch Protection Rules. This prevents deadlocks where you cannot approve your own PR.

## Starwind UI

**Starwind UI** is a component library for Astro projects using Tailwind CSS v4.

### Installation

- **ALWAYS use the CLI** - Components must be installed via `npx starwind@latest add <component>`, not manually created
- The CLI is interactive - run commands directly in terminal (not via exec tools that don't support interactivity)
- Components are installed to `src/components/starwind/`
- A `src/styles/starwind.css` file is created and must be imported in layouts

### Adding Components

```bash
npx starwind@latest init          # First-time setup (interactive)
npx starwind@latest add button    # Add individual components
```

### Notes

- The CLI is designed for interactive use only - do not manually create Starwind components
- If the CLI approach isn't feasible, ask the user to install the component themselves
- Always follow the CLI output for proper setup

## Landing the Plane (Session Completion)

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd sync
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**

- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
