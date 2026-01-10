# Task Completion Checklist

When completing any code task:

1. **Format Check**: `npm run format:check`
2. **Lint**: `npm run lint`
3. **Type Check**: `npm run astro check`
4. **Build**: `npm run build`

## Git Workflow

- Create feature branches for new work
- Main branch: `main`
- Use squash & merge for PRs
- Auto-PR workflow for content-only changes

## Session Completion ("Landing the Plane")

1. File issues for remaining work
2. Run quality gates (above 4 commands)
3. Update issue status
4. **MANDATORY**: Push to remote
   ```bash
   git pull --rebase
   bd sync
   git push
   git status  # verify "up to date with origin"
   ```
5. Clean up stashes/branches
6. Verify all changes pushed
7. Provide handoff context
