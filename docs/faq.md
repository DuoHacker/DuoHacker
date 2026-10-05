# FAQ

### Can my account get banned?
Yes, it is possible. Automating your account goes against Duolingo's Terms of Service, and Duolingo can restrict or ban accounts. The script uses delays and rate limiting to look more natural, but nothing can guarantee safety. To lower the risk, avoid running it 24/7 and consider using a secondary account.

### Is it free?
Yes. There are no paywalls.

### Does it work on the Duolingo mobile app?
No. DuoHacker runs in the browser and only works on Duolingo Web, including on Android through a browser that supports extensions. See [Installation → Android](installation.md#android).

### Do the Max features work in the mobile app?
No. They work by modifying API responses inside the browser, so they only apply to the web client.

### The panel does not show up. What should I do?
1. Make sure Tampermonkey is enabled and the script is turned on in its dashboard.
2. On Chrome / Edge 138+, enable *Allow User Scripts* for Tampermonkey (see the [installation guide](installation.md#userscript)).
3. Hard-refresh Duolingo (`Ctrl + Shift + R`).
4. Disable other Duolingo userscripts or extensions that might conflict.
5. If it still fails, [open a bug report](https://github.com/DuoHacker/DuoHacker/issues/new/choose) and include the browser console output.

### I get "429 Too Many Requests" errors.
Duolingo is rate-limiting you. Stop farming for a while and try again later with a slower setting.

### Where should I ask for help?
See [SUPPORT.md](../.github/SUPPORT.md).
