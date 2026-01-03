# Deployment Instructions

## Important: Repository Name for GitHub Pages

For your site to be available at **https://argon-docs.github.io/** (root URL), you have two options:

### Option 1: Rename Repository (Recommended for Root URL)

1. Go to your repository on GitHub: https://github.com/Argon-docs/Argon
2. Click "Settings" → Scroll to the bottom → Click "Change repository name"
3. Rename from `Argon` to `argon-docs.github.io`
4. The site will automatically be available at: **https://argon-docs.github.io/**

### Option 2: Keep Repository Name as "Argon"

If you keep the repository name as "Argon", the site will be available at:
**https://argon-docs.github.io/Argon/**

To use this option, you need to update `next.config.js`:
```javascript
basePath: '/Argon',
assetPrefix: '/Argon',
```

## Enable GitHub Pages

1. Go to repository Settings → Pages
2. Under "Source", select "GitHub Actions"
3. The GitHub Actions workflow will automatically deploy on every push to `main`

## Manual Deployment (Alternative)

If you prefer manual deployment:

1. Build the site:
   ```bash
   npm run build
   ```

2. The output will be in the `out/` directory

3. Push the `out/` directory contents to a `gh-pages` branch (if using manual deployment)

## Current Configuration

Currently configured for root URL deployment (no basePath). If you keep the repo name as "Argon", update the configuration as shown in Option 2 above.

