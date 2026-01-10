# Open Source Theme Strategy

**Goal**: Publish theme as open source on GitHub while keeping personal content (blog posts, projects, etc.) in a private repository. Theme updates should flow into the private site.

## Research Findings

### How Existing Astro Themes Work

**Astro Cactus** ([chrismwilliams/astro-theme-cactus](https://github.com/chrismwilliams/astro-theme-cactus)):
- **Pattern**: Fork/Template approach
- **Setup**: Users create new repo from template or use `npm create astro@latest`
- **Content Separation**: Uses Content Collections (src/content/) for user content
- **Updates**: Users manually sync fork or add template as remote and pull changes
- **Limitation**: Manual merge process, risk of conflicts

**Key Insight**: Most popular Astro themes use the "fork and customize" model, not npm packages.

## Four Approaches Analyzed

### Option A: Git Subtree ⭐ **RECOMMENDED**

**How It Works**:
- Public repo: Contains ONLY theme code (components, layouts, styles, configs)
- Private repo: Contains content + pulls theme via git subtree
- Command: `git subtree pull --prefix=theme theme-repo main --squash`

**Pros**:
- ✅ Clean separation without metadata files (.gitmodules)
- ✅ Theme code copied into your repo (no network dependency)
- ✅ Can modify theme locally and push back to public repo
- ✅ Standard git, no special tooling
- ✅ Collaborators don't need subtree knowledge

**Cons**:
- ❌ Subtree merge conflicts can be tricky
- ❌ Commands are verbose (use aliases)
- ❌ History can get messy without `--squash`

**Best For**: Your use case - sharing a theme while keeping content private with occasional theme updates

### Option B: Git Submodule

**How It Works**:
- Public repo: Theme as separate repository
- Private repo: Points to public repo at specific commit via .gitmodules
- Command: `git submodule update --remote`

**Pros**:
- ✅ Explicit separation
- ✅ Easy to see what version of theme you're using
- ✅ Good for independent projects

**Cons**:
- ❌ Adds .gitmodules metadata file
- ❌ Collaborators must run `git submodule init/update`
- ❌ Easy to forget to commit submodule changes
- ❌ More complex for contributors

**Best For**: Large teams with multiple independent repos

### Option C: Astro Theme Package (npm)

**How It Works**:
- Publish theme as npm package
- Private site imports via astro.config.mjs
- Update: `npm install @gregbarbosa/theme@latest`

**Astro Theme Provider**: Simplifies creating theme integrations ([astro-theme-provider](https://www.npmjs.com/package/astro-theme-provider))

**Pros**:
- ✅ Professional, standard workflow
- ✅ Semantic versioning
- ✅ Easy to discover on npm registry
- ✅ Can use in multiple projects

**Cons**:
- ❌ More complex initial setup
- ❌ Requires npm account and publishing workflow
- ❌ Harder to customize theme locally
- ❌ Build/publish step for every change

**Best For**: Polished themes meant for wide distribution

### Option D: Fork Pattern (GitHub Template)

**How It Works**:
- Public repo: Bare-bones starter template
- Your private repo: Fork with personal content added
- Updates: Sync from upstream or add as remote

**Pros**:
- ✅ Simple, GitHub-native
- ✅ Familiar workflow for open source

**Cons**:
- ❌ Mixing theme and content in same repo
- ❌ Harder to separate what's "theme" vs "personal"
- ❌ Updates require manual merge of entire repo
- ❌ Defeats purpose of keeping content private

**Best For**: Public personal sites (like Cassidy's blahg)

## Recommendation: Git Subtree

**Why Subtree Wins**:
1. Clean separation - public theme repo, private content repo
2. Simple for collaborators - no special git knowledge needed
3. Can customize theme locally and push improvements back
4. No extra metadata or tooling required
5. Well-documented workflow

## Implementation Plan

### Phase 1: Extract Theme to Public Repo

1. **Create Public Theme Repo**:
   ```bash
   mkdir ~/gregbarbosa-theme
   cd ~/gregbarbosa-theme
   git init
   ```

2. **Identify Theme Files** (what goes in public repo):
   - `src/components/` (except content-specific components)
   - `src/layouts/`
   - `src/styles/`
   - `src/components/starwind/` (UI library)
   - `astro.config.mjs` (base config)
   - `tailwind.config.js`
   - `tsconfig.json`
   - `package.json` (dependencies only)
   - `README.md` (theme documentation)

3. **Identify Content Files** (stays in private repo):
   - `src/content/blog/`
   - `src/content/projects/`
   - `src/content/reading-list/`
   - `src/assets/blogimages/`
   - `src/pages/` (some pages are content-specific)
   - `CLAUDE.md`, `AGENTS.md` (personal instructions)

4. **Copy Theme Files to Public Repo**:
   ```bash
   cd ~/gregbarbosa-theme
   cp -r ../gregbarbosa.com/src/components .
   cp -r ../gregbarbosa.com/src/layouts .
   # ... copy other theme files
   git add .
   git commit -m "Initial theme extraction"
   ```

5. **Publish to GitHub**:
   ```bash
   gh repo create gregbarbosa/astro-theme --public --source=. --remote=origin
   git push -u origin main
   ```

### Phase 2: Configure Private Repo to Use Subtree

1. **Add Theme as Subtree in Private Repo**:
   ```bash
   cd ~/gregbarbosa.com
   git subtree add --prefix=theme https://github.com/gregbarbosa/astro-theme.git main --squash
   ```

2. **Update Import Paths** in private repo:
   - Change `@/components/Navbar` to `@/theme/components/Navbar`
   - Update `astro.config.mjs` to extend from `./theme/astro.config.mjs`
   - Update `tailwind.config.js` to extend from `./theme/tailwind.config.js`

3. **Create Path Alias** in `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/theme/*": ["theme/*"],
         "@/*": ["src/*"]
       }
     }
   }
   ```

### Phase 3: Update Workflow

**Pulling Theme Updates**:
```bash
# In private repo
git subtree pull --prefix=theme https://github.com/gregbarbosa/astro-theme.git main --squash
```

**Pushing Theme Changes**:
```bash
# Make changes in private repo's theme/ folder
git add theme/
git commit -m "feat: add new component"

# Push to public theme repo
git subtree push --prefix=theme https://github.com/gregbarbosa/astro-theme.git main
```

**Create Git Aliases** (add to `~/.gitconfig`):
```ini
[alias]
  theme-pull = subtree pull --prefix=theme https://github.com/gregbarbosa/astro-theme.git main --squash
  theme-push = subtree push --prefix=theme https://github.com/gregbarbosa/astro-theme.git main
```

Then use:
```bash
git theme-pull
git theme-push
```

### Phase 4: Documentation

**Public Theme README** should include:
- Installation instructions
- Content structure expectations
- Customization guide
- Component documentation
- Contributing guidelines

**Private Repo Documentation** should include:
- How to pull theme updates
- How to push theme improvements
- What belongs in theme vs content
- Emergency rollback procedure

## Alternative: Gradual Migration

If immediate extraction feels risky:

1. **Month 1**: Identify and document what's theme vs content
2. **Month 2**: Create public repo, copy theme files, set up subtree
3. **Month 3**: Test workflow with small theme changes
4. **Month 4**: Full cutover, announce theme publicly

## Maintenance Scripts

Create `scripts/sync-theme.sh`:
```bash
#!/bin/bash
# Pull latest theme updates
git subtree pull --prefix=theme https://github.com/gregbarbosa/astro-theme.git main --squash
```

Create `scripts/publish-theme-changes.sh`:
```bash
#!/bin/bash
# Push theme changes to public repo
git subtree push --prefix=theme https://github.com/gregbarbosa/astro-theme.git main
```

## Success Criteria

- ✅ Public theme repo on GitHub
- ✅ Private content repo uses theme via subtree
- ✅ Can pull theme updates in < 2 commands
- ✅ Can push theme improvements back
- ✅ Clear documentation of what goes where
- ✅ No secrets or personal content in public repo

## Resources

### Git Subtree
- [Git Subtree: Alternative to Git Submodule | Atlassian](https://www.atlassian.com/git/tutorials/git-subtree)
- [Managing Git Projects: Git Subtree vs. Submodule | GitProtect.io](https://gitprotect.io/blog/managing-git-projects-git-subtree-vs-submodule/)
- [Mastering Git subtrees](https://medium.com/@porteneuve/mastering-git-subtrees-943d29a798ec)
- [Handling Dependencies with Submodules and Subtrees - GitHub Cheatsheets](https://training.github.com/downloads/submodule-vs-subtree-cheat-sheet/)

### Astro Themes
- [Astro Theme Cactus](https://github.com/chrismwilliams/astro-theme-cactus)
- [Astro Theme Provider](https://github.com/astrolicious/astro-theme-provider)
- [Publish to npm - Astro Docs](https://docs.astro.build/en/reference/publish-to-npm/)
- [astro-themes - GitHub Topics](https://github.com/topics/astro-themes)

---

**Decision**: Use **Git Subtree** for clean separation, easy updates, and professional workflow.

**Next Steps**: Review this plan, then execute Phase 1 (extract theme to public repo).
