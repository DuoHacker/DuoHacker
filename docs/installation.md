# Installation Guide

- [Userscript](#userscript) (recommended)
- [Browser extension](#browser-extension)
- [Desktop app](#desktop-app)
- [Android](#android)
- [Updating](#updating)
- [Uninstalling](#uninstalling)

## Userscript

1. Install [Tampermonkey](https://www.tampermonkey.net/) for your browser.
2. Install DuoHacker from one of these sources:
   - [GreasyFork](https://greasyfork.org/en/scripts/561041-duolingo-duohacker) (recommended)
   - [GitHub raw file](https://github.com/DuoHacker/DuoHacker/raw/main/userscript/duohacker.user.js)
3. Confirm the install in the Tampermonkey tab that opens.
4. Go to [duolingo.com](https://www.duolingo.com) and sign in. The panel loads automatically.

> **Chrome / Edge 138+:** enable *Allow User Scripts* for Tampermonkey in `chrome://extensions` → Tampermonkey → Details, otherwise userscripts will not run.

## Browser Extension

For Chromium browsers (Chrome, Edge, Brave, Opera).

1. Download or clone this repository.
2. Open `chrome://extensions` and turn on **Developer mode**.
3. Click **Load unpacked** and select the [`extension/`](../extension) folder.

A prebuilt archive is available in [`extension/release/`](../extension/release). Unzip it and load the folder in the same way.

## Desktop App

Windows only. Download the installer from [desktop/README.md](../desktop/README.md), or build it from source:

```bash
cd desktop
npm install
npm run build
```

## Android

iOS is not supported.

1. Install [Kiwi Browser](https://kiwibrowser.com/) or Yandex Browser.
2. Install Tampermonkey from the Chrome Web Store inside that browser.
3. Follow the [userscript](#userscript) steps.

## Updating

- **GreasyFork install:** Tampermonkey checks for updates automatically. To force a check, open the Tampermonkey dashboard → *Utilities* → *Check for userscript updates*.
- **Extension / desktop app:** download the latest version again and replace the old one.

## Uninstalling

- **Userscript:** Tampermonkey dashboard → find *Duolingo DuoHacker* → delete.
- **Extension:** `chrome://extensions` → DuoHacker → *Remove*.
- **Desktop app:** Windows Settings → *Apps* → DuoHacker → *Uninstall*.
