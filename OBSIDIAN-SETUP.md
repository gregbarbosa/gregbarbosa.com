# Obsidian Git Setup Guide

This document helps you configure the Obsidian plugins needed for the publishing workflow.

---

## 1. Templater Configuration

1. Install **Templater** from Community Plugins
2. Open Settings → Templater
3. Set **Templates folder location**: `templates`
4. Enable **Trigger Templater on new file creation**

## 2. Obsidian Git Configuration

1. Install **Obsidian Git** from Community Plugins
2. Open Settings → Obsidian Git
3. Configure:

### Required Settings

| Setting                    | Value                                                              |
| -------------------------- | ------------------------------------------------------------------ |
| **Vault repo directory**   | `/Users/greg/Developer/Active/Web/gregbarbosa.com` (auto-detected) |
| **Author name**            | `Greg Barbosa`                                                     |
| **Author email**           | `your-email@gregbarbosa.com`                                       |
| **Initial commit message** | `docs: initialize Obsidian vault`                                  |

### Optional Settings

| Setting                  | Recommendation                                            |
| ------------------------ | --------------------------------------------------------- |
| **Auto commit**          | `true` (commits on file change)                           |
| **Auto push**            | `false` (review before pushing)                           |
| **Auto pull on startup** | `true`                                                    |
| **Commit message**       | `vault: update <% tp.file.creation_date('YYYY-MM-DD') %>` |

## 3. Obsidian Attachment Settings

1. Open Settings → Files & Links
2. Set **Attachment folder path**: `src/assets/blogimages`
3. This ensures images save to the correct location for Astro

## 4. Daily Workflow

### Desktop

1. Create new note from template: `Cmd+P` → "Templater: Create new note from template"
2. Select `blog-post.md`
3. Write your content
4. Add images via Obsidian's insert image command
5. Commit & Push: `Cmd+P` → "Obsidian Git: Commit all changes and push"

### Mobile (iOS)

1. Write note in Obsidian mobile
2. Tap the Obsidian Git icon (ribbon)
3. Review changes
4. Tap commit (with message)
5. Tap push

## 5. Troubleshooting

### "Failed to push" on mobile

- Make sure you have network connectivity
- Check that your GitHub credentials are configured in Obsidian Git settings

### Images not appearing

- Verify attachment path is `src/assets/blogimages`
- Check images are in the correct subfolder matching your post slug

### Templater not auto-filling

- Make sure "Trigger Templater on new file creation" is enabled
- Check templates folder path matches exactly
