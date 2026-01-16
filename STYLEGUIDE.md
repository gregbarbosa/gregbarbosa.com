# Saral Styleguide

This styleguide defines the principles, patterns, and conventions for developing Saral Theme consistently. It's organized as a modular system—each guide covers a specific domain while maintaining cohesion across the project.

## Philosophy

Saral is built for **simplicity, accessibility, and long-term maintainability**. These principles guide all development decisions:

### Simplicity
- Avoid over-engineering solutions
- Prefer composition over abstraction
- Use Tailwind utilities directly when they're sufficient
- Don't create helpers for one-off use cases

### Accessibility-First
- All interactive components must support keyboard navigation
- ARIA attributes are required, not optional
- Focus management is a core responsibility, not an afterthought
- Test with screen readers during development

### Type Safety
- No `any` types (enforced by ESLint)
- Strict null checks enabled
- All component props must be typed with interfaces
- Use TypeScript path aliases (`@/*`) for clarity

### Consistency
- Components follow standard patterns for props, slots, and styling
- Naming conventions are predictable
- Visual consistency across the site (via Tailwind and Starwind)

---

## Quick Reference

### Component Development
→ **Read [COMPONENTS.md](./COMPONENTS.md)** for:
- When to create custom components vs. compose existing ones
- Props definition patterns (interface vs. type)
- Slot conventions (named vs. unnamed)
- Accessibility checklist
- Component composition patterns

### Styling & Layout
→ **Read [STYLING.md](./STYLING.md)** for:
- Tailwind class ordering and conventions
- Responsive design patterns
- Focus, hover, and state styles
- When to use `tailwind-variants` vs. raw Tailwind
- Color tokens and dark mode

### Page Structure
→ **Read [PATTERNS.md](./PATTERNS.md)** for:
- Standard page layout structure
- Using `PageLayout` component
- Width constraints (`max-w-2xl`, `max-w-3xl`)
- Hero section spacing

---

## Decision Trees

### "Should I create a custom component or compose from Starwind?"

```
Is this a reusable, domain-specific element?
├─ YES → Create custom component (BlogCard, ProjectCard, etc.)
│        Place in src/components/
│        Use Starwind components for structure/styling
│
└─ NO  → Use Starwind components directly
         Button, Card, Input, Dialog, etc.
         Or compose multiple Starwind components in your page/layout
```

**Example:**
- ✅ BlogCard - Custom (posts are domain-specific)
- ✅ Button - Starwind (generic UI element)
- ✅ SocialLinks - Custom (appears on multiple pages, uses domain data)
- ✅ Dialog - Starwind (generic)

---

### "Should this be an interface or type?"

```
Does this describe component props or HTML attributes?
├─ YES → Use 'interface Props extends HTMLAttributes<...>'
│        Allows extension and composition
│
└─ NO  → Use 'type Props = ...' for union types
         Or 'interface Props {...}' for simple objects
```

**See COMPONENTS.md for detailed examples.**

---

### "Where should styling be defined?"

```
Is this reusable across multiple components?
├─ YES → Use tailwind-variants and export as constant
│        Example: src/components/starwind/button/Button.astro
│
└─ NO  → Use inline class:list directive
         Example: src/components/BlogCard.astro
```

**See STYLING.md for detailed guidance.**

---

## Quality Gates

Before committing code:

```bash
npm run format:check    # Prettier formatting
npm run lint            # ESLint + TypeScript rules
npm run astro check     # Astro type checking
npm run build           # Full build validation
```

All four commands must pass before pushing.

---

## Project Structure

```
src/
├── components/
│   ├── starwind/          ← Auto-generated UI components (read-only)
│   ├── BlogCard.astro     ← Custom domain components
│   ├── ProjectCard.astro
│   ├── PageLayout.astro   ← Layout containers
│   └── Navbar.astro
├── layouts/
│   ├── BaseLayout.astro   ← HTML structure, head, metadata
│   └── BlogPostLayout.astro
├── pages/
│   ├── index.astro        ← Follow PATTERNS.md structure
│   ├── blog/index.astro
│   └── blog/[...slug].astro
├── content/
│   ├── blog/              ← Markdown content
│   ├── projects/
│   └── reading-list/
├── assets/
│   └── blogimages/        ← Images organized by content ID
├── styles/
│   ├── global.css         ← Deprecated (consolidated to starwind.css)
│   └── starwind.css       ← Tailwind + Starwind component styles
├── consts.ts              ← Global constants and site config
└── plugins/
    ├── remark-reading-time.mjs
    └── remark-modified-time.mjs
```

---

## Key Technologies

- **Astro v6 beta** - Static site generation with server/client boundaries
- **Tailwind CSS v4** - Utility-first styling via Vite plugin
- **tailwind-variants** - Semantic component styling with variants
- **Starwind UI** - Pre-built component library (installed via CLI)
- **TypeScript (strict mode)** - Type safety enforcement
- **ESLint + Prettier** - Code consistency
- **Astro Icon** - SVG icon integration via Iconify

---

## Conventions at a Glance

| Area | Pattern | Example |
|------|---------|---------|
| **File names** | PascalCase | `BlogCard.astro`, `PageLayout.astro` |
| **Props** | `interface Props` or `type Props` | See COMPONENTS.md |
| **Imports** | Use path aliases | `import { Button } from '@/components/starwind/button'` |
| **Classes** | Use `class:list` directive | `class:list={[baseClass, conditionalClass]}` |
| **Variants** | Export `tv()` from component | See Button.astro example in STYLING.md |
| **Accessibility** | ARIA + semantic HTML | See COMPONENTS.md checklist |
| **Focus styles** | `focus-visible:ring-3` | Consistent across all interactive elements |
| **Responsive** | Mobile-first with `md:`, `lg:` | See STYLING.md |

---

## Common Patterns

### Data Flow (Read-Only)
1. Pages fetch data via `getCollection('collection-name')`
2. Data passed to components as typed props
3. Components render (no mutations)

No prop drilling should occur—if data needs to flow through 3+ levels, restructure the component hierarchy.

### Image Handling
- Use `astro:assets` Image component
- Optimize automatically at build time
- Store blog images in `src/assets/blogimages/<post-id>/`
- Cover images: `src/assets/blogimages/<post-id>/cover.jpg`

### Metadata
- All pages use `BaseLayout` with `title` and `description`
- Metadata injected automatically by BaseHead component
- Follows OpenGraph + JSON-LD standards

---

## When to Break the Rules

Sometimes pragmatism wins:

1. **One-off styling** - Inline Tailwind is fine for unique situations
2. **Temporary workarounds** - Document with `TODO` comments
3. **Third-party content** - Don't force consistency on embed code
4. **Performance critical code** - Measure before optimizing

Always document the reason in comments.

---

## Getting Help

- **Astro docs**: https://docs.astro.build
- **Tailwind docs**: https://tailwindcss.com
- **Starwind docs**: https://starwind.dev
- **ESLint rules**: Run `npm run lint -- --fix` for auto-fixes

---

## Next Steps

1. Read the guide relevant to your task (COMPONENTS.md, STYLING.md, PATTERNS.md)
2. Check existing code for similar patterns
3. Follow the conventions
4. Run quality gates before committing
5. Update this styleguide if you discover better patterns
