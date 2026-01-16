# Page Patterns

Consistent page structure guidelines for this Astro project.

> **See Also:** [STYLEGUIDE.md](./STYLEGUIDE.md) for overall development philosophy, [COMPONENTS.md](./COMPONENTS.md) for component patterns, and [STYLING.md](./STYLING.md) for CSS/Tailwind conventions.

## Standard Page Structure

All pages in `src/pages/` should follow this structure:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro'
import PageLayout from '../components/PageLayout.astro'
---

<BaseLayout title="Page Title" description="Page description">
	<PageLayout title="Page Title" description="Optional description text">
		<div class="max-w-2xl mb-12">
			<!-- Page content here -->
		</div>
	</PageLayout>
</BaseLayout>
```

## Key Rules

1. **Always use `PageLayout`** - It provides consistent hero spacing, title/description rendering, and content containers
2. **Never duplicate layout wrappers** - Do NOT add `<main id="main-content" class="app-container ...">` inside the PageLayout slot - PageLayout handles this
3. **Wrap content in a `max-w-*` container** - Use `max-w-2xl` for text-heavy pages, `max-w-3xl` for pages with moderate content
4. **No wrapper for card/grid pages** - Pages with card grids (blog, projects, freebies, reading-list) should NOT use a max-w wrapper - let them span full width
5. **Always add `mb-12`** - The wrapper div needs bottom margin for consistent spacing from PageLayout's content padding

## Width Guidelines

| Width       | Use Case                                    |
| ----------- | ------------------------------------------- |
| `max-w-2xl` | Text-heavy pages, forms, simple content     |
| `max-w-3xl` | Cards, grids, prose content, moderate media |
| No wrapper  | Dense grid layouts (freebies, reading list) |

## Common Mistakes to Avoid

### Wrong - Duplicating main/app-container:

```astro
<PageLayout title="...">
	<main id="main-content" class="app-container ...">
		<!-- BAD -->
		<div>...</div>
	</main>
</PageLayout>
```

### Correct - Let PageLayout handle containers:

```astro
<PageLayout title="...">
	<div class="max-w-2xl mb-12">
		<!-- GOOD -->
		...
	</div>
</PageLayout>
```

## PageLayout Props

```astro
<PageLayout
	title="Title"
	Hero
	title
	(h1)
	description="Text"
	Hero
	description
	(optional)
	titleClass="..."
	Override
	default:
	text-6xl
	pb-8
	font-bold
	descriptionClass="..."
	Override
	default:
	md:w-2
	3
	text-lg
	leading-[2rem]
	heroPadding="pt-36"
	Override
	hero
	padding
	contentPadding="py-12"
	Override
	content
	padding
/>
```

## Template

When creating new pages, copy this structure:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro'
import PageLayout from '../components/PageLayout.astro'

const title = 'Page Title'
const description = 'Page description for SEO'
---

<BaseLayout title={title} description={description}>
	<PageLayout title={title} description={description}>
		<div class="max-w-2xl mb-12">
			<!-- content -->
		</div>
	</PageLayout>
</BaseLayout>
```

## Next Steps

- **Need to create a component?** → Read [COMPONENTS.md](./COMPONENTS.md) for component patterns, props definitions, and accessibility
- **Need to add styling?** → Read [STYLING.md](./STYLING.md) for Tailwind usage, responsive patterns, and color tokens
- **Want the big picture?** → Read [STYLEGUIDE.md](./STYLEGUIDE.md) for philosophy, conventions, and decision trees
