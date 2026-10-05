# Security Policy

## Supported Versions

Only the latest release of the userscript receives fixes.

| Component | Supported |
|---|---|
| Userscript V2, latest release (`userscript/duohacker.user.js`) | ✅ |
| Userscript V2, older releases | ❌ (please update) |
| Userscript V1 (`userscript/legacy/`) | ❌ |
| Browser extension and desktop app | Best effort |

## Reporting a Vulnerability

**Do not open a public issue for security problems.**

Report privately through [GitHub Security Advisories](https://github.com/DuoHacker/DuoHacker/security/advisories/new). If that is not available, send a direct message to a maintainer on [Discord](https://duohacker.io.vn/discord).

Please include:

- What the problem is and what an attacker could do with it
- Steps to reproduce, or a proof of concept
- Affected component and version
- Any suggested fix

## What to Expect

- Acknowledgement within 7 days.
- A fix or decision as quickly as possible, depending on severity.
- Credit in the changelog when the fix ships, unless you prefer to stay anonymous.

## Scope

In scope: code in this repository, for example script injection, leaking a user's Duolingo token or account data, or loading remote code unsafely.

Out of scope: vulnerabilities in Duolingo's own services. Report those to Duolingo directly.
