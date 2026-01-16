# Custom Domain Deployment Guide (gregbarbosa.com)

This guide covers the specific configuration needed to host your Astro site at your own domain `gregbarbosa.com` using GitHub Pages.

## User Actions Required: DNS Records

Before the site will work on your domain, you must update your DNS settings at your domain registrar (e.g., Namecheap, Google Domains).

### 1. Apex Domain (gregbarbosa.com)

Set up **A Records** pointing to GitHub's IP addresses:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

### 2. WWW Subdomain (www.gregbarbosa.com)

Set up a **CNAME Record**:

- **Host**: `www`
- **Value**: `gregbarbosa.github.io`

---

## Technical Changes

### [MODIFY] [astro.config.mjs](file:///Users/greg/Developer/Active/Web/gregbarbosa.com/astro.config.mjs)

We need to update the configuration to reflect the custom domain.

- `site: 'https://gregbarbosa.com'`
- `base: '/'` (Since it's the root of the domain)

### [NEW] [CNAME](file:///Users/greg/Developer/Active/Web/gregbarbosa.com/public/CNAME)

Create a file named `CNAME` in the `public/` directory containing exactly one line:

```text
gregbarbosa.com
```

_This tells GitHub Pages which domain to associate with this repository._

---

## Final Launch Steps (On GitHub)

1. **GitHub Pages Settings**:
   - Go to your repo on GitHub: **Settings > Pages**.
   - Under **Custom domain**, enter `gregbarbosa.com` and click **Save**.
   - Check **Enforce HTTPS** (this may take a few minutes to become available while the certificate issues).

2. **Merge and Push**:
   - `git checkout main`
   - `git merge dev`
   - `git push origin main`

## Verification Plan

1. Visit `https://gregbarbosa.com`.
2. Verify that the browser shows a secure lock icon (HTTPS).
3. Ensure all links and images load correctly (verifying the `base: '/'` setting).
