# Chrome Web Store Listing

This document contains all information required to publish "Zoom Browser By Fine Step" to the Chrome Web Store.

---

## 1. Store listing

### 1.1 Product details (for all languages)

---

📝 **Description** (approx. 900 characters)

```
Zoom Browser By Fine Step lets you adjust Chrome's page zoom in small, precise increments (1–10%) instead of the browser's default larger jumps.

🔹 WHY USE IT?
- Standard Chrome zoom steps (25%) can be too coarse for comfortable reading.
- This extension gives you finer control, so you can set the perfect text size on any site.

🔹 HOW IT WORKS
1. Click the extension icon to open the popup.
2. Move the slider to choose your preferred zoom step (1% to 10%).
3. Press the keyboard shortcut to zoom in or out by that exact amount.

🔹 DEFAULT SHORTCUTS
- Zoom in: Ctrl+Shift+Up (Windows/Linux) or Control+Shift+Up (Mac)
- Zoom out: Ctrl+Shift+Down (Windows/Linux) or Control+Shift+Down (Mac)

You can customize these shortcuts from the popup link or by visiting chrome://extensions/shortcuts.

🔹 FEATURES
- Adjustable zoom step from 1% to 10%
- Settings sync across signed-in Chrome browsers
- Safe zoom range clamped between 30% and 500%
- No data collection — your preferences stay on your device

Open source: https://github.com/gakkunn/Ex-Chrome-fine-zoom
```

---

📂 **Category**

```
Tools
```

---

🌐 **Language**

```
English
```

---

## 2. Privacy

### 2.1 Single purpose

📝 **Single purpose description** (approx. 150 characters)

```
Adjust Chrome page zoom in fine-grained steps (1–10%) using customizable keyboard shortcuts, with your preferred increment saved via Chrome Sync.
```

---

## 3. Permission justification

### 3.1 Storage justification

📝 **storage justification** (approx. 200 characters)

```
The extension uses chrome.storage.sync to save the user's preferred zoom step (a single integer between 1 and 10). This allows the setting to persist and sync across devices. No personal data is stored.
```

---

### 3.2 Tabs justification

📝 **tabs justification** (approx. 250 characters)

```
The tabs permission is required to retrieve and modify the zoom level of the currently active tab. The extension calls chrome.tabs.getZoom() to read the current zoom and chrome.tabs.setZoom() to apply the new zoom level when the user presses a shortcut.
```

---

### 3.3 Host permission justification

📝 **Host permission justification** (approx. 200 characters)

```
This extension does not declare any host permissions in the manifest. The tabs permission is used solely to get and set the zoom level on the active tab. No content scripts are injected and no web requests are made.
```

---

### 3.4 Remote code

**Are you using remote code?**

```
No, I am not using remote code
```

📝 **Justification** (if "Yes" were selected — not applicable here)

```
(Not applicable. The extension does not load any external JavaScript or WebAssembly. All code is bundled at build time and included in the extension package.)
```

---

## 4. Data usage

**What user data do you plan to collect from users now or in the future?**

```
(None of the listed categories apply)
```

The extension stores only a single numeric preference (zoom step 1–10) in chrome.storage.sync. This does not fall under any of the data categories listed (personally identifiable information, health, financial, authentication, communications, location, web history, user activity, or website content).

---

### 4.1 Developer certifications

All three certifications should be checked:

- ✅ I do not sell or transfer user data to third parties, outside of the approved use cases.
- ✅ I do not use or transfer user data for purposes that are unrelated to my item's single purpose.
- ✅ I do not use or transfer user data to determine creditworthiness or for lending purposes.

---

## 5. Privacy policy

📝 **Privacy policy URL**

```
TODO: ここにホスティングされたプライバシーポリシーのURLを記入
```

Options:
- GitHub Pages: `https://gakkunn.github.io/Ex-Chrome-fine-zoom/PRIVACY_POLICY`
- Raw GitHub file: `https://github.com/gakkunn/Ex-Chrome-fine-zoom/blob/main/PRIVACY_POLICY.md`

---

## 6. Test instructions

### 6.1 Credentials

📝 **Username**

```
(Leave blank — no login required)
```

📝 **Password**

```
(Leave blank — no login required)
```

---

### 6.2 Additional instructions

📝 **Additional instructions** (approx. 300 characters)

```
1. Click the extension icon to open the popup.
2. Drag the slider to set a zoom step (e.g., 3%).
3. Press Ctrl+Shift+Up (or Ctrl+Shift+Down) to zoom in (or out) by that step.
4. Verify the page zoom changes in small increments. No login or external service is needed.
```

---

## Summary of permissions used

| Permission | Purpose |
|------------|---------|
| `tabs` | Read and set zoom level on the active tab via `chrome.tabs.getZoom()` and `chrome.tabs.setZoom()` |
| `storage` | Persist the user's preferred zoom step (1–10%) in `chrome.storage.sync` |
| `commands` | Listen for keyboard shortcuts to trigger zoom in/out actions |

---

## Notes for reviewer

- The extension does not inject content scripts into any page.
- The extension does not make network requests.
- The extension does not collect, transmit, or store any personal or browsing data.
- All source code is open source and available at the GitHub repository linked in the description.
