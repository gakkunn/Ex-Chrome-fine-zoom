# Zoom Browser By Fine Step

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

## Overview

A Chrome extension that provides fine-grained zoom control for web pages using customizable keyboard shortcuts. Adjust your browser's zoom level in precise increments (1-10%) for better control than standard zoom commands.

This is an open-source extension implemented based on Chrome Extension Manifest v3.

---

## Features

- **Fine-grained zoom control**: Adjust zoom in small increments (1-10%) instead of the default larger steps
- **Keyboard shortcuts**: Quick access via customizable shortcuts (default: Ctrl+Shift+Up/Down)
- **Persistent settings**: Your zoom step preference is saved using Chrome Storage and synced across devices
- **User-friendly popup UI**: Easily configure your preferred zoom step increment
- **Direct shortcut customization**: Quick access to Chrome's shortcut settings page

---

## Screenshots

Screenshots will be added in a future update.

---

## Installation

> ℹ️ **Not yet published to the Chrome Web Store.**
> You can use it via "Local Installation (Developer Mode)" below.

### 1. Clone the repository

```bash
git clone https://github.com/gakkunn/Ex-Chrome-fine-zoom.git
cd Ex-Chrome-fine-zoom
```

### 2. Install dependencies & Build

```bash
npm install
npm run build
```

### 3. Install to Chrome (Developer Mode)

1. Open Chrome
2. Go to `chrome://extensions/`
3. Toggle **"Developer mode"** on in the top right corner
4. Click **"Load unpacked"**
5. Select the `dist/` folder of this project

---

## Usage

1. After installing the extension, pin the icon from the Chrome toolbar.
2. Click the icon to open the popup and adjust your preferred zoom step (1-10%).
3. Use keyboard shortcuts to zoom in/out:
   - **Zoom In**: `Ctrl+Shift+Up` (Mac: `MacCtrl+Shift+Up`)
   - **Zoom Out**: `Ctrl+Shift+Down` (Mac: `MacCtrl+Shift+Down`)
4. Customize shortcuts by clicking "Shortcut Settings" in the popup or navigate to `chrome://extensions/shortcuts`

---

## Development

### Prerequisites

- Node.js: >= 16.0.0
- npm

### Setup

```bash
git clone https://github.com/gakkunn/Ex-Chrome-fine-zoom.git
cd Ex-Chrome-fine-zoom

npm install
npm run build   # Production build
# or
npm run watch   # Development build with auto-rebuild
```

### Available Scripts

- `npm run build` - Build the extension for production
- `npm run watch` - Build with auto-rebuild on file changes
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run check` - Run both linter and format check
- `npm run typecheck` - Run TypeScript type checking

---

## Project Structure

```text
Ex-Chrome-fine-zoom/
  src/                      # Extension source code
    background/
      background.ts         # Background service worker
    popup/
      popup.ts              # Popup UI logic
    utils/
      common.ts             # Common utilities
      zoomStep.ts           # Zoom step configuration
      zoomStepManager.ts    # Zoom step management
    types/
      global.d.ts           # TypeScript type definitions
  public/                   # Static assets
    manifest.json           # Chrome Extension Manifest
    popup.html              # Popup HTML
    styles/
      popup.css             # Popup styles
    icons/                  # Extension icons
  dist/                     # Build artifacts (generated)
  scripts/
    copy-public.mjs         # Build script to copy public assets
  package.json
  tsconfig.json
  eslint.config.cjs
  .prettierrc
  .gitignore
```

---

## Contributing

Bug reports, feature suggestions, and pull requests are welcome!

Please refer to [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

Quick steps:

1. Check Issues; create a new one if it doesn't exist
2. Fork the repository
3. Create a branch (e.g., `feat/xxx`, `fix/yyy`)
4. Commit changes and push
5. Create a Pull Request

---

## License

This project is released under the [MIT License](./LICENSE).
