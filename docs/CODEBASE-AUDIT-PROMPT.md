# Codebase Audit Prompt

Use this prompt to have Claude Code audit the codebase for alignment with established styleguide, patterns, styling, and component conventions.

## Prompt Template

```
Conduct a comprehensive codebase audit to identify misalignments with our styleguide.

Before starting:
1. Read docs/guides/STYLEGUIDE.md - Development philosophy and conventions
2. Read docs/guides/COMPONENTS.md - Component patterns and props definitions
3. Read docs/guides/STYLING.md - Tailwind class organization and conventions
4. Read docs/guides/PATTERNS.md - Page structure patterns

Then perform the audit:
1. **Component Props Patterns** - Identify components with inconsistent prop definitions
   - Should use `interface Props extends HTMLAttributes<...>` for styled components
   - Should use `interface Props` for domain-specific components
   - Flag components that don't follow patterns

2. **Styling Conventions** - Check for non-standard class usage
   - Classes should follow order: layout → sizing → spacing → flex → typography → colors → borders → states → responsive
   - Identify inline tailwind that should use tailwind-variants
   - Check for hardcoded colors instead of semantic tokens
   - Verify focus-visible:ring-3 pattern on interactive elements

3. **Accessibility** - Verify ARIA and semantic HTML
   - Check interactive components have focus indicators
   - Verify ARIA attributes on buttons, links, dialogs
   - Check for aria-label on icon buttons
   - Verify semantic HTML (button, a, form instead of div)

4. **Component Composition** - Check component structure
   - Custom domain components should use Starwind as building blocks
   - No Starwind components should be edited directly
   - Components should not have prop drilling (3+ levels)

5. **Import Organization** - Verify import patterns
   - Should use path aliases (@/components/, @/consts)
   - Should follow order: Astro → Types → Components → Data
   - Should be alphabetically organized within groups

6. **File Naming & Organization**
   - Components should be PascalCase (BlogCard.astro, not blog-card.astro)
   - Verify components are in src/components/ (not src/components/starwind/)
   - Check for orphaned components or duplicate functionality

Produce a detailed report with:
- Category breakdown (props patterns, styling, accessibility, composition, imports, naming)
- Specific files and line numbers that don't align
- Severity (critical, high, medium, low)
- Suggested fix for each issue
- Estimated effort to fix each category

Prioritize:
1. Critical - Breaks functionality or violates strict rules (no any, no non-null assertions, ARIA on interactive elements)
2. High - Violates established conventions (props patterns, class organization, component structure)
3. Medium - Could be improved for consistency (import ordering, file naming)
4. Low - Nice to have improvements (code comments, organizational tweaks)

Format as a markdown report suitable for planning implementation work.
```

## What This Audit Finds

The audit will identify:

### Props Pattern Misalignments
- Components using `const { ... } = Astro.props` without interface
- Inconsistent interface vs. type usage
- Custom components not extending HTMLAttributes when they should
- Missing type annotations on props

### Styling Issues
- Classes not following established ordering
- Hardcoded colors instead of semantic tokens (e.g., `bg-[#1a1a1a]`)
- Missing focus-visible ring on interactive elements
- Classes that could use tailwind-variants
- Unnecessary !important flags

### Accessibility Gaps
- Interactive elements missing focus indicators
- Buttons/links missing ARIA attributes
- Icon buttons without aria-label
- Images without alt text
- Missing semantic HTML (using div instead of button, etc.)

### Composition Issues
- Prop drilling (passing through multiple levels)
- Direct modification of Starwind components
- Components that could be split or merged
- Overuse of one-off styling without proper abstraction

### Import Problems
- Not using path aliases (@/components/)
- Imports not grouped and organized
- Relative imports when aliases should be used
- Wrong import source (naming inconsistencies)

### Naming & Organization
- Components with kebab-case names (should be PascalCase)
- Components in wrong directories
- Duplicated functionality
- Unclear naming that doesn't match purpose

## Using the Report

After the audit completes, you can:

1. **Prioritize fixes** - Address critical issues first, then high, then medium
2. **Create issues** - Break audit findings into actionable tasks
3. **Plan implementation** - Use the suggested fixes as implementation guidance
4. **Batch related work** - Group similar fixes together (e.g., all props patterns)
5. **Track progress** - Update issues as fixes are completed

## Running the Audit

Simply provide the prompt above to Claude Code and it will:
1. Read all four guides
2. Scan the codebase systematically
3. Generate a comprehensive report
4. Provide specific fixes and effort estimates
5. Prioritize by severity

The audit typically takes 5-15 minutes depending on codebase size.

## Audit Frequency

Recommended schedule:
- **After major feature development** - Ensure new code follows conventions
- **Quarterly** - Catch drift as team members work independently
- **Before releases** - Verify consistency before deployment
- **When conventions change** - Re-audit with updated guidelines

## Example Report Structure

```markdown
# Codebase Audit Report
Date: 2025-01-16
Scope: All files in src/components/ and src/pages/

## Summary
- Total findings: 47
- Critical: 3
- High: 12
- Medium: 18
- Low: 14

## Critical Issues (Must Fix)

### No ARIA on Interactive Elements
Files: src/components/Navbar.astro (line 45), src/components/ThemeSelector.astro (line 12)
Fix: Add aria-label or proper role attributes

...

## High Priority Issues

### Props Pattern Inconsistency
...

## Medium Priority Issues
...

## Low Priority Issues
...

## Effort Estimate
- Critical: 2-3 hours
- High: 4-5 hours
- Medium: 3-4 hours
- Low: 2-3 hours
- Total: 11-15 hours
```

This gives you a structured, prioritized list of work to align the codebase with your styleguide system.
