# Code Style & Conventions

## ESLint Rules

- No console statements (`no-console: error`)
- Strict TypeScript (no `any`, no non-null assertions)
- JSX accessibility rules enforced
- Astro-specific linting enabled

## Formatting

- Prettier with astro plugin
- All files must pass `prettier --check .`

## Component Patterns

- Starwind UI components in `src/components/starwind/`
- Custom components in `src/components/`
- Layouts in `src/layouts/`

## Starwind UI Installation

- **ALWAYS use CLI**: `npx starwind@latest add <component>`
- Never manually create Starwind components
- CLI is interactive - run in terminal directly

## Path Aliases

- `@/*` → `src/*`
- `@blogimages/*` → `src/assets/blogimages/*`
