# Contributing to DuoHacker

Thanks for taking the time to contribute! This guide explains how to report problems, suggest features and submit code.

By participating you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Table of Contents

- [Ways to Contribute](#ways-to-contribute)
- [Project Layout](#project-layout)
- [Development Setup](#development-setup)
- [Branches and Commits](#branches-and-commits)
- [Pull Requests](#pull-requests)
- [Code Style](#code-style)
- [Testing](#testing)
- [Releases](#releases)

## Ways to Contribute

- **Report a bug:** open a [bug report](https://github.com/DuoHacker/DuoHacker/issues/new?template=bug_report.yml). Search existing issues first.
- **Suggest a feature:** open a [feature request](https://github.com/DuoHacker/DuoHacker/issues/new?template=feature_request.yml).
- **Fix or improve something:** pick an open issue, comment that you are working on it, then open a pull request.
- **Improve docs or translations:** README, [docs/](../docs), and the multilingual `@name` / `@description` metadata in the userscript.

Security problems must **not** be reported in public issues. See the [Security Policy](SECURITY.md).

## Project Layout

| Path | What it is |
|---|---|
| `userscript/duohacker.user.js` | Main Tampermonkey userscript (V2). Most changes land here. |
| `userscript/legacy/` | Original V1 script. Kept for reference; only critical fixes. |
| `extension/` | Chromium Manifest V3 extension (`manifest.json` at the folder root). |
| `desktop/` | Electron app that loads Duolingo with the script injected. |
| `tools/generator/` | Account generator (Python CLI, Python and Node.js bots). |
| `docs/` | User documentation. |
| `images/` | Logos and screenshots. These are loaded by raw URL from published scripts, so **do not rename or move them**. |

## Development Setup

1. Fork the repository and clone your fork:
   ```bash
   git clone https://github.com/<your-username>/DuoHacker.git
   cd DuoHacker
   ```
2. Work on the part you are changing:
   - **Userscript:** in the Tampermonkey dashboard, create a new script and paste `userscript/duohacker.user.js`, or enable *Allow access to file URLs* for Tampermonkey and install the local file. Disable the GreasyFork copy while testing so both do not run.
   - **Extension:** `chrome://extensions` → Developer mode → *Load unpacked* → select `extension/`. Click reload after each change.
   - **Desktop:** `cd desktop && npm install && npm start`.
   - **Generator (Python):** `cd tools/generator/cli-python && pip install tls_client pytz && python app.py`.

## Branches and Commits

Create a branch from `main`:

```bash
git checkout -b feat/short-description   # new feature
git checkout -b fix/short-description    # bug fix
```

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use for |
|---|---|
| `feat:` | A new feature |
| `fix:` | A bug fix |
| `docs:` | Documentation only |
| `refactor:` | Code change that neither fixes a bug nor adds a feature |
| `perf:` | Performance improvement |
| `style:` | Formatting, no logic change |
| `chore:` | Tooling, metadata, repository housekeeping |

Example: `fix: retry XP request after 429 response`

## Pull Requests

- Keep each PR focused on one change.
- Fill in the [pull request template](PULL_REQUEST_TEMPLATE.md), including how you tested it.
- Update docs and [CHANGELOG.md](../CHANGELOG.md) (under *Unreleased*) when behavior changes.
- Do not bump `@version` in the userscript; maintainers do that when releasing.
- Avoid breaking changes to settings stored in users' browsers. If unavoidable, migrate old values.
- Resolve all review conversations before asking for a merge.

## Code Style

The repository has an [`.editorconfig`](../.editorconfig); most editors pick it up automatically.

- Match the indentation of the file you are editing: 4 spaces in the userscript and Python tools, 2 spaces in `extension/`, `desktop/`, JSON, YAML and Markdown.
- Use clear names; keep functions small.
- Comment *why*, not *what*, especially around Duolingo API calls.
- Handle network errors and rate limits (`429`) gracefully, with backoff instead of tight retry loops.
- Remove debug `console.log` calls before submitting.
- No obfuscated or minified code, and no code that sends user data anywhere the user did not ask for.

## Testing

There is no automated test suite yet, so manual testing is required. Before opening a PR:

- [ ] Script loads on duolingo.com with no errors in the browser console
- [ ] The feature you changed works end to end
- [ ] Features near your change still work
- [ ] Tested in at least one Chromium browser; Firefox too if you touched browser-specific code
- [ ] Rate-limit and error paths behave sensibly (slow network, `429` responses)
- [ ] `node --check userscript/duohacker.user.js` passes

## Releases

Maintainers handle releases:

1. Bump `@version` in `userscript/duohacker.user.js` using the `YYYY.MM.DD` format.
2. Move *Unreleased* entries in [CHANGELOG.md](../CHANGELOG.md) under the new version.
3. Update the version badge in the README.
4. Publish the update on GreasyFork.

## Questions

Ask in [Discord](https://duohacker.io.vn/discord) or open a [discussion issue](https://github.com/DuoHacker/DuoHacker/issues/new/choose).
