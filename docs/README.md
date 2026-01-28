# Documentation

Complete documentation for Saral Theme development, deployment, and contribution.

## Quick Links

### Development Guides

All development guidance is organized by topic:

- **[Styleguide](./guides/STYLEGUIDE.md)** - Project philosophy, conventions, and decision trees
- **[Components](./guides/COMPONENTS.md)** - Component patterns, props, slots, accessibility
- **[Styling](./guides/STYLING.md)** - Tailwind CSS, responsive design, dark mode
- **[Page Patterns](./guides/PATTERNS.md)** - Page structure, layouts, PageLayout usage

### Setup & Configuration

- **[Obsidian Setup](./setup/OBSIDIAN-SETUP.md)** - Configure Obsidian vault for content management
- **[Google Analytics 4](./setup/google-analytics.md)** - GA4 integration with Partytown
- **[GitHub Pages Deployment](./deployment/github-pages-deployment.md)** - Deploy to GitHub Pages

### Audits & Analysis

- **[Codebase Audit Prompt](./CODEBASE-AUDIT-PROMPT.md)** - Comprehensive audit prompt to check codebase alignment with styleguide, patterns, styling, and components

### Architecture & Strategy

- **[Open Source Theme Strategy](./architecture/OPEN-SOURCE-THEME-STRATEGY.md)** - Publishing strategy and architecture
- **[Text Overlay Proposal](./architecture/TEXT-OVERLAY-PROPOSAL.md)** - UI/UX design decisions

---

## Documentation Structure

```
docs/
├── README.md                        ← You are here
├── guides/                          ← Development guidance
│   ├── STYLEGUIDE.md               ← Start here for philosophy & overview
│   ├── COMPONENTS.md               ← Component development patterns
│   ├── STYLING.md                  ← CSS and Tailwind conventions
│   └── PATTERNS.md                 ← Page structure & layouts
├── setup/                           ← Configuration & tools
│   ├── OBSIDIAN-SETUP.md           ← Obsidian vault configuration
│   └── google-analytics.md         ← GA4 integration setup
├── deployment/                      ← Deployment configuration
│   └── github-pages-deployment.md  ← GitHub Pages setup guide
├── architecture/                    ← Project strategy & design
│   ├── OPEN-SOURCE-THEME-STRATEGY.md
│   └── TEXT-OVERLAY-PROPOSAL.md
└── screenshots/                     ← Visual reference
    ├── about-page.png
    ├── links-light.png
    ├── local.png
    └── original.png
```

---

## Where to Start?

### I'm creating a new **component**
1. Read [Styleguide - Component Types](./guides/STYLEGUIDE.md#component-types)
2. Check [Components - Props Definition Patterns](./guides/COMPONENTS.md#props-definition-patterns)
3. Reference [Components - Accessibility Checklist](./guides/COMPONENTS.md#accessibility-checklist)

### I need to add **styling**
1. Review [Styling - Tailwind Class Organization](./guides/STYLING.md#tailwind-class-organization)
2. Check [Styling - Responsive Design Patterns](./guides/STYLING.md#responsive-design-patterns)
3. See [Components - Component Styling with tailwind-variants](./guides/COMPONENTS.md#component-styling-with-tailwind-variants)

### I'm creating a new **page**
1. Read [Page Patterns - Standard Page Structure](./guides/PATTERNS.md#standard-page-structure)
2. Check [Page Patterns - Width Guidelines](./guides/PATTERNS.md#width-guidelines)
3. Follow the [Page Patterns - Template](./guides/PATTERNS.md#template)

### I want to understand the **big picture**
1. Start with [Styleguide - Philosophy](./guides/STYLEGUIDE.md#philosophy)
2. Review [Styleguide - Project Structure](./guides/STYLEGUIDE.md#project-structure)
3. Check the relevant detailed guide

---

## Key Technologies

- **Astro v6 beta** - Static site generation with server/client boundaries
- **Tailwind CSS v4** - Utility-first styling via Vite plugin
- **tailwind-variants** - Semantic component styling with variants
- **Starwind UI** - Pre-built component library
- **TypeScript (strict mode)** - Type safety enforcement
- **ESLint + Prettier** - Code consistency

---

## Before You Code

Always run the **pre-commit quality gates**:

```bash
npm run format:check    # Prettier formatting
npm run lint            # ESLint + TypeScript rules
npm run astro check     # Astro type checking
npm run build           # Full build validation
```

All four commands must pass before committing.

---

## Development Commands

### Core Development

```bash
npm run dev              # Start development server
npm run build            # Type check with Astro and build for production
npm run preview          # Preview production build locally
```

### Code Quality

```bash
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix linting issues
npm run format           # Format code with Prettier
npm run format:check     # Check formatting without modifying
npm run astro check      # Run Astro type checking
```

---

## Project Structure

```
src/
├── components/
│   ├── starwind/           ← Auto-generated UI library (read-only)
│   ├── BlogCard.astro      ← Custom domain components
│   ├── ProjectCard.astro
│   └── PageLayout.astro
├── layouts/
│   ├── BaseLayout.astro    ← HTML structure, head, metadata
│   └── BlogPostLayout.astro
├── pages/
│   ├── index.astro
│   ├── blog/
│   └── projects/
├── content/
│   ├── blog/               ← Markdown content
│   ├── projects/
│   └── reading-list/
├── assets/
│   └── blogimages/         ← Images organized by content ID
├── styles/
│   ├── global.css          ← Deprecated
│   └── starwind.css        ← Tailwind + Starwind styles
├── consts.ts               ← Global constants
└── plugins/
    ├── remark-reading-time.mjs
    └── remark-modified-time.mjs
```

See [Styleguide - Project Structure](./guides/STYLEGUIDE.md#project-structure) for detailed explanation.

---

## Conventions at a Glance

| Area | Pattern |
|------|---------|
| Files | PascalCase: `BlogCard.astro` |
| Props | `interface Props extends ...` |
| Imports | Use path aliases: `@/components/` |
| Classes | Use `class:list` directive |
| Variants | Export `tv()` from components |
| Accessibility | ARIA + semantic HTML required |
| Focus | `focus-visible:ring-3` standard |
| Responsive | Mobile-first with `md:`, `lg:` |

See [Styleguide - Conventions at a Glance](./guides/STYLEGUIDE.md#conventions-at-a-glance) for full reference.

---

## Common Tasks

### Add a New Blog Post

1. Create markdown file in `src/content/blog/`
2. Add required frontmatter: `title`, `description`, `author`, `pubDate`
3. Place cover image at `src/assets/blogimages/<post-id>/cover.jpg`
4. Reference images as `![Alt](../../assets/blogimages/<post-id>/image.ext)`

### Create a Component

1. Read [Components - When to Create a New Component](./guides/COMPONENTS.md#when-to-create-a-new-component)
2. Choose a props pattern from [Components - Props Definition Patterns](./guides/COMPONENTS.md#props-definition-patterns)
3. Check the [Components - Accessibility Checklist](./guides/COMPONENTS.md#accessibility-checklist)

### Update Styling

1. Review [Styling - Tailwind Class Organization](./guides/STYLING.md#tailwind-class-organization)
2. Check if you need [Styling - Component Styling with tailwind-variants](./guides/STYLING.md#component-styling-with-tailwind-variants)
3. Test responsive behavior with breakpoints in [Styling - Responsive Design Patterns](./guides/STYLING.md#responsive-design-patterns)

---

## Getting Help

- **Astro docs**: https://docs.astro.build
- **Tailwind docs**: https://tailwindcss.com
- **Starwind docs**: https://starwind.dev
- **ESLint rules**: Run `npm run lint -- --fix` for auto-fixes

---

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines.

---

## License & Code of Conduct

- **License**: See repository root
- **Code of Conduct**: See [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md)
- **Security**: See [SECURITY.md](../SECURITY.md)

---

**Last updated:** 2025-01-16
