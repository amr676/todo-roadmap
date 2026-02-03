# To-Do App Backend Guide 📚

An interactive, step-by-step guide for building a To-Do app backend with Node.js, Express, and PostgreSQL.

## Features

✨ **Interactive Learning**
- 7 comprehensive steps from setup to deployment
- 20+ code examples with detailed explanations
- RTL (Arabic/Right-to-Left) layout support
- Accessible UI with keyboard navigation

🎨 **Tech Stack**
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## Local Development

### Prerequisites
- Node.js 16+ and npm
- A code editor (VS Code recommended)

### Installation & Run

```bash
# 1. Clone or download the repository
cd todo-app-guide

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The app will open at `http://localhost:5173`

**Keyboard Navigation:**
- **Arrow Up/Down**: Navigate between steps
- **Arrow Right**: Focus on first file
- **Enter**: Focus on step button

## Building for Production

```bash
# Build the project
npm run build

# Preview the build locally
npm run preview
```

This creates an optimized `dist/` folder ready for deployment.

## GitHub Pages Deployment

### Setup Steps

1. **Update the base path in `vite.config.js`**

   If your repo is `https://github.com/username/my-todo-guide`:

   ```javascript
   // vite.config.js
   base: '/my-todo-guide/',
   ```

   For user/org pages (`https://username.github.io`), use:
   ```javascript
   base: '/',
   ```

2. **Install gh-pages** (already in package.json)

   ```bash
   npm install --save-dev gh-pages
   ```

3. **Deploy to GitHub Pages**

   ```bash
   npm run deploy
   ```

   This command:
   - Runs `npm run build`
   - Publishes the `dist/` folder to the `gh-pages` branch
   - Makes your site live at `https://username.github.io/my-todo-guide/`

4. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Settings → Pages
   - Verify source is set to `gh-pages` branch

### Important Notes

- The `base` path must match your repository URL
- Always update `base` BEFORE running `npm run deploy`
- The gh-pages branch is auto-generated; don't edit it manually
- Allow 1-2 minutes for the site to go live after deployment

## Project Structure

