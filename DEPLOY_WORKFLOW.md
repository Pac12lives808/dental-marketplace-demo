# Deployment Workflow — dental-marketplace-demo

## Overview

This repository deploys to **dentaldashpro.com** via Netlify.

## Source of Truth: `main` branch

- **GitHub default branch**: `main`
- **Netlify deploy branch**: `main`
- Both are aligned. Do NOT push production changes to any other branch.

## How to Update the Live Site

1. Make all edits on the `main` branch (directly or via PR).
2. Commit and push to `main`.
3. Netlify automatically detects the push and deploys within ~1-2 minutes.
4. Verify changes at https://dentaldashpro.com

## Branch Rules

| Branch | Purpose | Deploys to Live? |
|---|---|---|
| `main` | Production | YES — auto-deploys via Netlify |
| `office-applications` | Legacy / archived | NO |

> WARNING: The `office-applications` branch is no longer the deploy branch.
> Any changes made there will NOT appear on the live site.
> Always commit production updates to `main`.

## Netlify Configuration

- Project: rad-kashata-d5f8b6
- Deploy branch: `main`
- Site URL: https://dentaldashpro.com
- Build command: (none — static HTML)
- Publish directory: `/` (root)

## History Note

Prior to June 2025, the GitHub default branch was `office-applications` while Netlify
deployed from `main`. This caused confusion where commits to `office-applications`
did not update the live site. This was corrected by:
1. Updating `for-dentists.html` on `main` with conversion-optimized content.
2. Changing the GitHub default branch to `main` to match Netlify.
3. Creating this document to prevent future confusion.
