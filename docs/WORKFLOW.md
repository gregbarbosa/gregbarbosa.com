# Development Workflow & Styleguide Usage

This document explains how to use the styleguide system for different development workflows.

## Before Any Work

**Always start here:**

1. Read [STYLEGUIDE.md](./guides/STYLEGUIDE.md) - Get the philosophy and understand the conventions
2. Open [docs/README.md](./README.md) for quick reference navigation
3. Bookmark the specific guide you'll reference most (COMPONENTS.md, STYLING.md, or PATTERNS.md)

---

## Workflow: Creating a New Component

**1. Decide if you need a component**
- Read: [COMPONENTS.md - When to Create a New Component](./guides/COMPONENTS.md#when-to-create-a-new-component)
- Ask: Is this reusable? Complex? Domain-specific?

**2. Choose a props pattern**
- Read: [COMPONENTS.md - Props Definition Patterns](./guides/COMPONENTS.md#props-definition-patterns)
- Options:
  - Simple Props with Interface (most common)
  - Extending HTML Attributes (for styled components)
  - Polymorphic Components (rare)
  - Using tailwind-variants (for multi-variant components)

**3. Plan composition**
- Read: [COMPONENTS.md - Component Composition Strategies](./guides/COMPONENTS.md#component-composition-strategies)
- Decide: Will you compose Starwind components or build from scratch?
- Remember: Don't edit Starwind components directly

**4. Check accessibility**
- Read: [COMPONENTS.md - Accessibility Checklist](./guides/COMPONENTS.md#accessibility-checklist)
- Implement:
  - Keyboard navigation
  - Focus indicators (`focus-visible:ring-3`)
  - ARIA attributes
  - Semantic HTML

**5. Add styling**
- Read: [STYLING.md - Tailwind Class Organization](./guides/STYLING.md#tailwind-class-organization)
- Options:
  - Simple components: inline `class:list`
  - Multi-variant: use `tailwind-variants` with `tv()`
  - Check: [STYLING.md - Component Styling with tailwind-variants](./guides/STYLING.md#component-styling-with-tailwind-variants)

**6. Before committing**
```bash
npm run format:check
npm run lint
npm run astro check
npm run build
```

---

## Workflow: Adding Styling to a Page

**1. Plan responsive behavior**
- Read: [STYLING.md - Responsive Design Patterns](./guides/STYLING.md#responsive-design-patterns)
- Mobile-first approach: Default styles for mobile, use `md:`, `lg:` for larger screens

**2. Choose colors**
- Read: [STYLING.md - Color System](./guides/STYLING.md#color-system)
- Use semantic tokens: `bg-primary`, `text-foreground`, `border-border`
- Don't hardcode colors like `bg-[#1a1a1a]`

**3. Organize classes properly**
- Read: [STYLING.md - Tailwind Class Organization](./guides/STYLING.md#tailwind-class-organization)
- Order: layout → sizing → spacing → flex → typography → colors → borders → states → responsive
- Use `class:list` for readability:
```astro
<div class:list={[
  'flex items-center',        <!-- Layout -->
  'p-4 md:p-6',              <!-- Spacing -->
  'text-lg font-bold',       <!-- Typography -->
  'bg-primary text-white',   <!-- Colors -->
  'rounded-lg shadow-sm',    <!-- Borders, shadows -->
  'hover:shadow-md transition-shadow',  <!-- States -->
  'md:grid-cols-2',          <!-- Responsive -->
]}>
```

**4. Handle interactive states**
- Read: [STYLING.md - Focus & Interactive States](./guides/STYLING.md#focus--interactive-states)
- Always include: `focus-visible:ring-3`
- Add hover/active states appropriately

**5. Dark mode**
- Read: [STYLING.md - Dark Mode](./guides/STYLING.md#dark-mode)
- Use: `dark:` prefix when default color doesn't work in dark mode

---

## Workflow: Creating a New Page

**1. Use the standard structure**
- Read: [PATTERNS.md - Standard Page Structure](./guides/PATTERNS.md#standard-page-structure)
- Copy: [PATTERNS.md - Template](./guides/PATTERNS.md#template)
- Must include: `BaseLayout` and `PageLayout` components

**2. Choose width constraint**
- Read: [PATTERNS.md - Width Guidelines](./guides/PATTERNS.md#width-guidelines)
- `max-w-2xl` for text-heavy pages
- `max-w-3xl` for mixed content
- No wrapper for dense grids

**3. Compose components**
- Read: [COMPONENTS.md - Component Composition Strategies](./guides/COMPONENTS.md#component-composition-strategies)
- Fetch data with `getCollection()`
- Pass to presentational components
- Keep page logic simple

---

## Workflow: Code Review / Audit

**Run a comprehensive audit:**

1. Use the audit prompt from [CODEBASE-AUDIT-PROMPT.md](./CODEBASE-AUDIT-PROMPT.md)
2. Instructs Claude to:
   - Read all 4 styleguide documents
   - Check codebase systematically
   - Generate prioritized report
   - Suggest fixes and effort estimates

**Get the prompt:** Copy from [CODEBASE-AUDIT-PROMPT.md](./CODEBASE-AUDIT-PROMPT.md) or use this condensed version:

```
Read docs/guides/STYLEGUIDE.md, COMPONENTS.md, STYLING.md, and PATTERNS.md.

Then audit codebase for:
1. Props patterns - Check interface vs type consistency
2. Styling conventions - Verify class ordering, semantic tokens, focus styles
3. Accessibility - Check ARIA, semantic HTML, focus indicators
4. Composition - Verify Starwind usage, no prop drilling
5. Imports - Check path aliases and organization
6. Naming - Verify PascalCase files in correct directories

Produce markdown report with:
- Category breakdown
- Specific files/line numbers
- Severity (critical → low)
- Suggested fixes
- Effort estimates by category
```

---

## Workflow: Updating the Styleguide

When you discover a better pattern:

1. **Document it** - Add to the relevant guide (STYLEGUIDE, COMPONENTS, STYLING, PATTERNS)
2. **Add example** - Reference actual code from `src/` that demonstrates it
3. **Update related sections** - Check other guides for cross-references
4. **Commit with docs scope** - `git commit -m "docs: add/update pattern description"`
5. **Communicate** - Let team know about the new convention

---

## Quick Reference Cards

### Component Props Template

```astro
---
import type { HTMLAttributes } from 'astro/types'

interface Props extends HTMLAttributes<'div'> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

const { variant = 'primary', size = 'md', class: className, ...rest } = Astro.props
---

<div class:list={[
  'flex items-center',
  variant === 'primary' && 'bg-primary text-white',
  variant === 'secondary' && 'bg-secondary text-foreground',
  size === 'sm' && 'px-3 py-2 text-sm',
  size === 'md' && 'px-4 py-2 text-base',
  size === 'lg' && 'px-6 py-3 text-lg',
  className,
]} {...rest}>
  <slot />
</div>
```

### Class Organization Template

```astro
<div class:list={[
  'flex flex-col gap-4',                    <!-- Display, layout, gap -->
  'w-full p-6 md:p-8',                     <!-- Sizing, spacing -->
  'items-center justify-between',           <!-- Flex properties -->
  'text-lg font-semibold',                 <!-- Typography -->
  'bg-card text-foreground border border-border',  <!-- Colors, borders -->
  'rounded-lg shadow-sm',                  <!-- Styling -->
  'transition-all',                        <!-- Transforms -->
  'hover:shadow-md focus-visible:ring-3',  <!-- States -->
  'md:flex-row lg:gap-6',                  <!-- Responsive -->
]}>
```

### Page Template

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro'
import PageLayout from '../components/PageLayout.astro'

const title = 'Page Title'
const description = 'Page description'
---

<BaseLayout title={title} description={description}>
  <PageLayout title={title} description={description}>
    <div class="max-w-2xl mb-12">
      <!-- Content -->
    </div>
  </PageLayout>
</BaseLayout>
```

---

## Common Mistakes to Avoid

| Mistake | Why It's Wrong | How to Fix |
|---------|----------------|-----------|
| Not reading STYLEGUIDE.md first | Miss the philosophy | Always start with STYLEGUIDE.md |
| Using `type Props = ...` for all components | Loses flexibility and extension | Use `interface Props extends HTMLAttributes<...>` |
| Hardcoding colors like `bg-[#1a1a1a]` | Won't update with theme changes | Use semantic tokens: `bg-foreground` |
| Missing `focus-visible:ring-3` on buttons | Fails accessibility (WCAG) | Always add focus indicator to interactive elements |
| Editing Starwind components directly | Updates will be lost, creates bugs | Wrap or compose instead |
| Classes out of order | Hard to read and maintain | Follow the ordering: layout → sizing → spacing → flex → typography → colors → borders → states → responsive |
| Prop drilling (passing through 3+ levels) | Hard to refactor, tightly couples | Restructure component hierarchy |
| Not using path aliases in imports | Harder to read, harder to refactor | Always use `@/components/`, `@/consts` |
| Creating components for one-off use | Code bloat, harder to maintain | Use inline composition instead |

---

## Quality Gate Checklist

Before every commit:

```bash
□ npm run format:check    # Code formatted with Prettier
□ npm run lint            # ESLint passes (no console, strict types)
□ npm run astro check     # Astro type checking passes
□ npm run build           # Full build succeeds

□ Reviewed styleguide relevant to changes
□ Components follow props patterns
□ Styling follows class ordering
□ Interactive elements have focus indicators
□ Imports use path aliases
□ Files are PascalCase in right directories
□ No prop drilling (3+ levels)
□ Accessibility checklist passed (if interactive)
```

---

## Resources

**Documentation Guides:**
- [STYLEGUIDE.md](./guides/STYLEGUIDE.md) - Philosophy & conventions
- [COMPONENTS.md](./guides/COMPONENTS.md) - Component patterns
- [STYLING.md](./guides/STYLING.md) - CSS/Tailwind conventions
- [PATTERNS.md](./guides/PATTERNS.md) - Page structure

**External Resources:**
- Astro docs: https://docs.astro.build
- Tailwind docs: https://tailwindcss.com
- Starwind docs: https://starwind.dev
- WCAG Accessibility: https://www.w3.org/WAI/WCAG21/quickref/

**Tools:**
- ESLint: `npm run lint -- --fix`
- Prettier: `npm run format`
- Type checking: `npm run astro check`
- Full validation: `npm run build`

---

## Getting Help

1. **Finding a pattern?** → Check STYLEGUIDE.md decision trees
2. **Creating a component?** → Use COMPONENTS.md step-by-step guide
3. **Adding styling?** → Follow STYLING.md class organization
4. **Creating a page?** → Copy from PATTERNS.md template
5. **Code not passing lint?** → Run `npm run lint -- --fix` then read error messages
6. **Something doesn't fit?** → Update the styleguide and document the new pattern

---

**Last updated:** 2025-01-16

This workflow system is designed to make development fast, consistent, and maintainable. When in doubt, start with STYLEGUIDE.md and refer to the specific guide for your task.
