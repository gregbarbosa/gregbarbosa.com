# Styling & CSS Conventions

This guide covers Tailwind CSS, styling patterns, and responsive design conventions for Saral. All styles should follow these patterns for consistency and maintainability.

## Overview

Saral uses:
- **Tailwind CSS v4** - Utility-first CSS framework via Vite plugin
- **tailwind-variants** - Semantic component styling with variants
- **CSS Grid/Flexbox** - Layout system
- **Dark mode** - Built-in via `dark:` prefix

**No custom CSS files** are needed for most components—Tailwind utilities handle everything. Global styles are consolidated in `src/styles/starwind.css`.

---

## Tailwind Class Organization

### Order of Classes (Left-to-Right)

When writing `class:list`, follow this order for readability:

1. **Display & Layout** - `flex`, `grid`, `block`, `inline-flex`
2. **Sizing** - `w-full`, `h-screen`, `size-10`
3. **Spacing** - `p-4`, `m-2`, `gap-3`
4. **Flex/Grid properties** - `items-center`, `justify-between`, `gap-3`
5. **Typography** - `text-lg`, `font-bold`, `font-semibold`
6. **Colors** - `bg-primary`, `text-white`, `border-input`
7. **Borders/Shadows** - `border`, `rounded-lg`, `shadow-md`
8. **Transforms/Transitions** - `transform`, `scale-110`, `transition-colors`
9. **States** - `hover:`, `focus-visible:`, `disabled:`, `dark:`
10. **Responsive** - `md:`, `lg:`, `xl:` (at the end)

### Example: Well-Organized Class List

```astro
<div class:list={[
  'flex flex-col gap-4',                           <!-- Layout -->
  'w-full p-6',                                    <!-- Sizing, spacing -->
  'items-center justify-between',                  <!-- Flex properties -->
  'text-lg font-semibold',                         <!-- Typography -->
  'bg-card text-foreground border border-border',  <!-- Colors, borders -->
  'rounded-lg shadow-sm',                          <!-- Styling -->
  'transition-all',                                <!-- Transitions -->
  'hover:shadow-md focus-visible:ring-2',          <!-- States -->
  'md:flex-row lg:gap-6',                          <!-- Responsive -->
]}>
```

### With Conditionals

Always put conditional classes at the end:

```astro
<div class:list={[
  'rounded-lg border p-4',
  'transition-colors',
  variant === 'primary' && 'bg-primary text-white',
  variant === 'outline' && 'border-primary bg-transparent',
  disabled && 'opacity-50 pointer-events-none',
  className,
]}>
```

---

## Responsive Design Patterns

### Mobile-First Approach

Default styles apply to mobile. Use breakpoints for larger screens:

```astro
<div class="
  grid grid-cols-1          <!-- Mobile: 1 column -->
  md:grid-cols-2            <!-- Tablet: 2 columns (768px+) -->
  lg:grid-cols-3            <!-- Desktop: 3 columns (1024px+) -->
  xl:grid-cols-4            <!-- Wide: 4 columns (1280px+) -->
  gap-4 md:gap-6
">
```

### Common Breakpoints

| Prefix | Width | Use Case |
|--------|-------|----------|
| (default) | Mobile-first | Phone, default styles |
| `sm:` | 640px | Large phone, small tablet |
| `md:` | 768px | Tablet, landscape phone |
| `lg:` | 1024px | Desktop, iPad Pro |
| `xl:` | 1280px | Large desktop |
| `2xl:` | 1536px | Extra-wide desktop |

### Container Queries (Limited Use)

For component-specific responsive behavior:

```astro
<div class="@container">
  <div class="@sm:flex @md:flex-col @lg:grid @lg:grid-cols-2">
    <!-- Responsive within container, not viewport -->
  </div>
</div>
```

---

## Focus & Interactive States

### Focus Visible (Keyboard)

Always use `focus-visible` for keyboard focus (not mouse):

```astro
<button class="focus-visible:ring-3 focus-visible:ring-offset-0">
  Click me
</button>
```

**Pattern: `focus-visible:ring-3`**
- Creates a 3px focus ring
- Works for buttons, inputs, links
- Distinguishes keyboard from mouse focus

### Hover States

Use `hover:` for mouse interactions:

```astro
<button class="hover:bg-primary/90 hover:shadow-md transition-all">
  Hover me
</button>
```

### Disabled States

Always pair with styling:

```astro
<button disabled class="disabled:opacity-50 disabled:pointer-events-none">
  Disabled
</button>
```

### Active States

For active buttons/links:

```astro
<a aria-current="page" class="font-bold text-primary">
  Current page
</a>
```

---

## Color System

### Using Token Colors

Saral defines semantic color tokens in Tailwind config. Use these instead of arbitrary colors:

**Light Mode:**
- `bg-foreground` - Darkest background
- `bg-background` - Light background
- `text-foreground` - Dark text
- `text-muted` - Muted text
- `border-border` - Border color
- `bg-primary` - Brand color
- `bg-secondary` - Secondary accent

**Dark Mode:**
- Same names, automatically inverted
- Use `dark:` prefix only when override needed

### Example: Color Usage

```astro
<!-- Good: Uses semantic tokens -->
<button class="bg-primary text-primary-foreground hover:bg-primary/90">
  Click
</button>

<!-- Bad: Hardcoded colors -->
<button class="bg-blue-600 text-white">
  Don't do this
</button>

<!-- Good: Dark mode aware -->
<div class="bg-background text-foreground dark:bg-slate-950 dark:text-white">
  Content
</div>
```

### Opacity Modifiers

Use opacity variants for hover/disabled states:

```astro
<!-- 90% opacity on hover -->
<button class="bg-primary hover:bg-primary/90">
  Hover for lighter shade
</button>

<!-- For text opacity -->
<p class="text-foreground/70">
  Muted text
</p>
```

---

## Component Styling with tailwind-variants

### Structure

```astro
---
import { tv, type VariantProps } from 'tailwind-variants'

// Define styles once
export const button = tv({
  // Base styles applied to all variants
  base: [
    'inline-flex items-center justify-center rounded-md',
    'font-medium transition-all focus-visible:ring-3',
    'disabled:opacity-50 disabled:pointer-events-none',
  ],

  // Variant groups
  variants: {
    variant: {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      outline: 'border border-input bg-background hover:bg-muted',
      ghost: 'hover:bg-muted hover:text-foreground',
    },
    size: {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-4 text-base',
      lg: 'h-12 px-8 text-lg',
    },
  },

  // Default when not specified
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})
---

interface Props extends VariantProps<typeof button> {}

const { variant, size, class: className, ...rest } = Astro.props

<button class:list={button({ variant, size, class: className })} {...rest}>
  <slot />
</button>
```

### When to Use tailwind-variants

**Use `tv()` when:**
- Component has 3+ related style variants
- Variants are mutually exclusive (variant OR outline, not both)
- Want type-safe variant selection
- Example: Button (primary/outline/ghost), Badge (default/secondary)

**Use inline `class:list` when:**
- Simple conditionals
- One-off components
- Only 1-2 variants
- Example: Custom cards with optional hover states

---

## Typography Patterns

### Font Sizes

```astro
<!-- Responsive text sizes -->
<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold">
  Heading
</h1>

<h2 class="text-2xl md:text-3xl font-semibold">
  Subheading
</h2>

<p class="text-base md:text-lg leading-relaxed">
  Body text with comfortable line height
</p>

<small class="text-sm text-muted">
  Caption or helper text
</small>
```

### Font Weights

| Class | Weight | Use |
|-------|--------|-----|
| `font-normal` | 400 | Body text |
| `font-medium` | 500 | Emphasis, labels |
| `font-semibold` | 600 | Subheadings |
| `font-bold` | 700 | Main headings, CTAs |

### Line Height

```astro
<!-- For readability -->
<p class="leading-relaxed">
  Long-form text with generous line height
</p>

<p class="leading-tight">
  Compact text (careful with accessibility)
</p>
```

---

## Spacing System

### Consistent Spacing

Use Tailwind's spacing scale (0, 4px increments):

```astro
<!-- Common spacing -->
<div class="p-4 md:p-6">        <!-- Padding: 16px → 24px -->
  <h2 class="mb-4">Title</h2>   <!-- Margin-bottom: 16px -->
  <p class="mt-2 mb-6">Content</p>
</div>

<div class="gap-4">             <!-- Gap between flex/grid items -->
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Responsive Spacing

Increase spacing on larger screens:

```astro
<section class="px-4 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16">
  <!-- Responsive horizontal and vertical padding -->
</section>
```

---

## Layout Patterns

### Centered Container

```astro
<!-- Max-width container, centered -->
<div class="max-w-2xl mx-auto px-4">
  <!-- Content stays centered with padding on mobile -->
</div>
```

### Flex Column with Gap

```astro
<!-- Vertical stack with consistent spacing -->
<div class="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Grid with Responsive Columns

```astro
<!-- Auto-responding grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => <Card key={item.id}>{item}</Card>)}
</div>
```

### Flex Between

```astro
<!-- Space-between alignment -->
<header class="flex items-center justify-between gap-4">
  <div>Logo</div>
  <nav class="flex gap-6">Navigation</nav>
</header>
```

---

## Shadows & Depth

### Shadow Progression

```astro
<!-- No shadow (default) -->
<div class="bg-white border">Card</div>

<!-- Subtle shadow (hover state) -->
<div class="shadow-sm hover:shadow-md transition-shadow">
  Elevate on hover
</div>

<!-- Medium shadow (floating elements) -->
<dialog class="shadow-lg rounded-lg">Modal</dialog>

<!-- Large shadow (prominent elements) -->
<div class="shadow-xl">Featured card</div>
```

---

## Borders & Rounded Corners

### Border Styling

```astro
<!-- Thin border -->
<div class="border border-border">
  Standard border
</div>

<!-- No border (for optional removal) -->
<div class="border-0">
  No border
</div>

<!-- Specific sides -->
<div class="border-t border-t-primary">
  Top border only
</div>
```

### Rounded Corners

```astro
<div class="rounded-md">         <!-- 6px radius -->
<div class="rounded-lg">         <!-- 8px radius -->
<div class="rounded-xl">         <!-- 12px radius -->
<div class="rounded-full">       <!-- 9999px (perfect circle/pill) -->
```

---

## Transitions & Animations

### Transition Properties

```astro
<!-- Smooth color/shadow transitions -->
<button class="transition-colors hover:bg-primary/90">
  Hover smoothly
</button>

<div class="transition-all hover:shadow-lg hover:scale-105">
  Multiple properties
</div>

<div class="transition-none">
  No animation (useful for certain interactions)
</div>
```

### Duration

Default is 150ms. Override if needed:

```astro
<div class="transition-all duration-200 hover:opacity-50">
  Slower transition
</div>

<div class="transition-all duration-75 hover:opacity-50">
  Faster transition
</div>
```

---

## Dark Mode

### Dark Mode Syntax

Use `dark:` prefix:

```astro
<div class="bg-white dark:bg-slate-950 text-black dark:text-white">
  Automatically inverts in dark mode
</div>
```

### Strategy

Only use `dark:` when the default color doesn't work:

```astro
<!-- Good: Default is light, dark mode overrides -->
<div class="bg-white text-black dark:bg-slate-950 dark:text-white">
  Text contrast works in both modes
</div>

<!-- Bad: Redundant dark: for already dark colors -->
<div class="bg-primary dark:bg-primary">
  Unnecessary
</div>
```

### Testing Dark Mode

```bash
# In browser DevTools, toggle dark mode in CSS media
# Or add `dark` class to <html> in inspector
<html class="dark">
```

---

## Common Anti-Patterns

### ❌ Don't: Arbitrary Colors

```astro
<!-- Bad: Hardcoded color, not in tokens -->
<div class="bg-[#1a1a1a] text-[#4db8ff]">
  These won't update with theme changes
</div>
```

**Fix:**
```astro
<!-- Good: Uses semantic tokens -->
<div class="bg-foreground text-primary">
  Updates automatically with theme
</div>
```

---

### ❌ Don't: Inline Long Class Lists

```astro
<!-- Hard to read and maintain -->
<div class="flex items-center justify-between p-4 rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-all gap-4 md:gap-6 md:p-6">
```

**Fix:**
```astro
<!-- Use class:list for clarity -->
<div class:list={[
  'flex items-center justify-between',
  'p-4 md:p-6',
  'rounded-lg border border-border bg-card',
  'shadow-sm hover:shadow-md transition-all',
  'gap-4 md:gap-6',
]}>
```

---

### ❌ Don't: Magic Numbers

```astro
<!-- Where does 42px come from? -->
<div class="p-[42px]">
```

**Fix:**
```astro
<!-- Use standard spacing scale -->
<div class="p-10"> <!-- 40px, closest standard -->
```

---

## Performance Notes

- **No custom CSS needed** - Tailwind handles everything
- **CSS is auto-purged** - Unused classes removed at build time
- **Utilities are small** - No performance penalty for classes
- **Dark mode is free** - No extra CSS bytes (uses CSS media queries)

---

## Debugging Styles

### Finding Which Class Applies

```bash
# In browser DevTools
# 1. Inspect element
# 2. Hover over class in Styles panel
# 3. See which file/line the class originates from
```

### Checking for Specificity Issues

```astro
<!-- Use !important sparingly if needed -->
<div class="!bg-primary">
  Force this style (use only as last resort)
</div>
```

---

## Next Steps

1. Review existing component styling in `src/components/`
2. Check [COMPONENTS.md](COMPONENTS.md) for component patterns
3. Use these patterns in new components
4. Run `npm run build` to verify no unused styles
