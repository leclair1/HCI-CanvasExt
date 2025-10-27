
# Canvas LMS Browser Extension

Canvas LMS Browser Extension is a Vite + React prototype that recreates the interaction patterns and visuals from the [Canvas LMS Browser Extension design on Figma](https://www.figma.com/design/CG44VgtI0KR4lCThQf6EPy/Canvas-LMS-Browser-Extension). 

## Prerequisites
To see the local host, need to run npm run dev
To run `npm run dev` you only need a recent Node.js toolchain. Everything else is installed automatically.

- **Node.js 18.0.0 or newer**  
  Vite 6 requires features that shipped with Node 18. If you already have Node installed, confirm with:
  ```powershell
  node -v
  ```
  - Windows: download the LTS installer from [nodejs.org](https://nodejs.org/), or run `winget install OpenJS.NodeJS.LTS`.
  - macOS: `brew install node` (Homebrew) or use `nvm install 20`.
  - Linux: install through your package manager or use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).
- **npm**  
  npm ships with Node. You can verify it with `npm -v`. If you prefer `pnpm` or `yarn`, they work too, but the provided scripts assume npm.
- **Git (optional but recommended)**  
  Install from [git-scm.com](https://git-scm.com/downloads) so you can clone the repository instead of downloading ZIP archives.

## Quick Start

1. Clone the project:
   ```powershell
   git clone https://github.com/<your-org>/HCI-CanvasExt.git
   cd HCI-CanvasExt
   ```
   > Alternatively, download the ZIP from your source control provider and extract it.
2. Install dependencies from `package.json`:
   ```powershell
   npm install
   ```
3. Start the Vite dev server:
   ```powershell
   npm run dev
   ```
4. Open the URL Vite prints in the terminal (defaults to `http://localhost:5173`). Hot module replacement is enabled, so UI changes appear immediately.

When you are ready to produce a static build, run `npm run build` to emit assets in the `dist` directory.

## Project Scripts

| Command        | Description                                                                 |
| -------------- | --------------------------------------------------------------------------- |
| `npm run dev`  | Starts Vite's development server with hot reloading.                        |
| `npm run build`| Generates a production build in `dist/` for packaging the extension assets. |

## Troubleshooting

- **"Unsupported engine" or syntax errors on start:** Upgrade Node to 18+ and reinstall dependencies with `npm install`.
- **Port already in use (5173):** Specify a port manually with `npm run dev -- --port 5174`.
- **Permissions errors on Windows:** Run the terminal as Administrator, or install Node using the `.msi` installer instead of the Windows Store version.

## Project Structure

- `src/` - React components, styles, and helper utilities that render the extension UI.
- `index.html` - Vite entry point that mounts the React app.
- `vite.config.ts` - Vite configuration tuned for the extension workflow.

See the `src/PROJECT_SUMMARY.md` and related documentation files for deep dives into the UX research and screen-by-screen implementation notes.

---

Need a TL;DR for new teammates? Point them to the **Prerequisites** and **Quick Start** sections above - install Node 18+, run `npm install`, then `npm run dev`.
