<p align="center">
  <img src="https://raw.githubusercontent.com/DuoHacker/DuoHacker/refs/heads/main/images/DuoHacker_Logo_NoBG_PNG.png" width="150" height="150" alt="DuoHacker logo">
</p>

<h1 align="center">DuoHacker</h1>

<p align="center">
  Automation toolkit for Duolingo Web: XP, gems, streaks, quests and more.
</p>

<p align="center">
  <a href="https://greasyfork.org/en/scripts/561041-duolingo-duohacker"><img src="https://img.shields.io/badge/Install-GreasyFork-670000?style=for-the-badge&logo=greasyfork&logoColor=white" alt="Install from GreasyFork"></a>
  <a href="https://github.com/DuoHacker/DuoHacker/raw/main/userscript/duohacker.user.js"><img src="https://img.shields.io/badge/Install-GitHub-181717?style=for-the-badge&logo=tampermonkey" alt="Install from GitHub"></a>
  <a href="CHANGELOG.md"><img src="https://img.shields.io/badge/Version-2026.08.28-green?style=for-the-badge" alt="Version 2026.08.28"></a>
  <a href="https://duohacker.io.vn/discord"><img src="https://img.shields.io/badge/Discord-Join-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey?style=for-the-badge" alt="License: CC BY-NC-ND 4.0"></a>
</p>

---

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Other Ways to Install](#other-ways-to-install)
- [Repository Structure](#repository-structure)
- [Screenshots](#screenshots)
- [Disclaimer](#disclaimer)
- [Contributing](#contributing)
- [Community & Support](#community--support)
- [License](#license)

## Features

| Feature | Description |
|---|---|
| ⚡ **XP Farming** | Accumulates XP using several methods, with rate-limit handling |
| 💎 **Gem Farming** | Collects gems to spend in the in-app shop |
| 🔥 **Streak Tools** | Restores missed days or extends the current streak |
| 👑 **Max Features** | Unlocks Duolingo Max features on the web client |
| 📋 **Quest Automation** | Completes daily, weekly, monthly and friends quests |
| 🛒 **Item Shop** | Claims streak freezes, XP boosts, hearts and outfits |
| 🏆 **League Auto** | Farms the XP needed to reach a target leaderboard position |

## Quick Start

1. Install the [Tampermonkey](https://www.tampermonkey.net/) browser extension.
2. Install the script from [GreasyFork](https://greasyfork.org/en/scripts/561041-duolingo-duohacker) (recommended, auto-updates) or [directly from GitHub](https://github.com/DuoHacker/DuoHacker/raw/main/userscript/duohacker.user.js).
3. Open [duolingo.com](https://www.duolingo.com) and sign in.
4. The DuoHacker panel appears automatically. Pick a mode and start.

## Other Ways to Install

| Method | Platform | Guide |
|---|---|---|
| Userscript | Any desktop browser with Tampermonkey | [docs/installation.md](docs/installation.md#userscript) |
| Browser extension | Chrome, Edge, Brave and other Chromium browsers | [extension/README.md](extension/README.md) |
| Desktop app | Windows | [desktop/README.md](desktop/README.md) |
| Mobile | Android (Kiwi / Yandex Browser) | [docs/installation.md](docs/installation.md#android) |

Common questions are answered in the [FAQ](docs/faq.md).

## Repository Structure

```
.
├── userscript/            # Tampermonkey userscript (main product)
│   ├── duohacker.user.js  #   current version (V2)
│   └── legacy/            #   original V1 script
├── extension/             # Chromium Manifest V3 extension
│   └── release/           #   packaged .zip build
├── desktop/               # Electron desktop app
├── tools/generator/       # Account generator (CLI + bots)
├── docs/                  # Installation guide and FAQ
├── images/                # Logos and screenshots (served via raw URLs, do not move)
└── .github/               # Community health files, issue and PR templates
```

## Screenshots

<table>
  <tr>
    <td align="center"><strong>Item Shop</strong></td>
    <td align="center"><strong>Duolingo Max</strong></td>
  </tr>
  <tr>
    <td align="center"><img src="https://assets.twisk.fun/images/TN1_TypePNG.png" alt="Item Shop"></td>
    <td align="center"><img src="https://assets.twisk.fun/images/TN4_TypePNG.png" alt="Duolingo Max"></td>
  </tr>
  <tr>
    <td align="center"><strong>Auto League</strong></td>
    <td align="center"><strong>Auto Solver</strong></td>
  </tr>
  <tr>
    <td align="center"><img src="https://assets.twisk.fun/images/TN2_TypePNG.png" alt="Auto League"></td>
    <td align="center"><img src="https://assets.twisk.fun/images/TN3_TypePNG.png" alt="Auto Solver"></td>
  </tr>
</table>

## Disclaimer

DuoHacker is an unofficial project and is **not affiliated with, endorsed by, or sponsored by Duolingo, Inc.** "Duolingo" is a trademark of its respective owner.

Automating your account goes against Duolingo's Terms of Service. Duolingo can restrict, reset or ban accounts at any time. You use this software at your own risk; the maintainers accept no liability for any loss or damage. See [LICENSE](LICENSE).

## Contributing

Contributions are welcome. Please read the [Contributing Guide](.github/CONTRIBUTING.md) and the [Code of Conduct](.github/CODE_OF_CONDUCT.md) before opening an issue or pull request. To report a security problem, follow the [Security Policy](.github/SECURITY.md) instead of opening a public issue.

## Community & Support

- 💬 [Discord](https://duohacker.io.vn/discord): help, news and announcements
- 📺 [YouTube](https://www.youtube.com/@duohacker-hack-cheat): setup guides and walkthroughs
- ⭐ [GreasyFork](https://greasyfork.org/en/scripts/561041-duolingo-duohacker): install and leave a review
- 🌐 [duohacker.io.vn](https://duohacker.io.vn): project website

See [SUPPORT.md](.github/SUPPORT.md) for where to ask what.

## License

Licensed under [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International](LICENSE) (CC BY-NC-ND 4.0).
