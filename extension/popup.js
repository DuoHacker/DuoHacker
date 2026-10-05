/**
 * DuoHacker — popup.js
 * Runs in the extension popup context (NOT page context).
 */

const PREFIX       = 'usc:Duolingo_DuoHacker:';
const CACHE_KEY    = PREFIX + '__script_cache__';
const CACHE_TS_KEY = PREFIX + '__script_ts__';
const SCRIPT_URL   = 'https://update.greasyfork.org/scripts/561041/Duolingo%20DuoHacker.user.js';
const DUO_URL      = 'https://www.duolingo.com/learn';

// ── DOM refs ──────────────────────────────────────────────────────────────
const statusBar    = document.getElementById('statusBar');
const statusLabel  = document.getElementById('statusLabel');
const statusTab    = document.getElementById('statusTab');
const infoPage     = document.getElementById('infoPage');
const infoScript   = document.getElementById('infoScript');
const infoCache    = document.getElementById('infoCache');
const infoCacheAge = document.getElementById('infoCacheAge');
const btnOpen      = document.getElementById('btnOpen');
const btnRefresh   = document.getElementById('btnRefresh');
const btnClear     = document.getElementById('btnClear');

// ── Helpers ───────────────────────────────────────────────────────────────

function setStatus(state, label, tab = '') {
  statusBar.className = `status-bar ${state}`;
  statusLabel.textContent = label;
  statusTab.textContent = tab;
}

function fmtAge(ms) {
  if (ms < 60_000)        return `${Math.round(ms / 1000)}s ago`;
  if (ms < 3_600_000)     return `${Math.round(ms / 60_000)}m ago`;
  if (ms < 86_400_000)    return `${Math.round(ms / 3_600_000)}h ago`;
  return `${Math.round(ms / 86_400_000)}d ago`;
}

// ── Query the active Duolingo tab via scripting API ───────────────────────

async function getDuoTab() {
  const tabs = await chrome.tabs.query({
    url: ['https://*.duolingo.com/*', 'https://*.duolingo.cn/*']
  });
  return tabs[0] ?? null;
}

async function execInTab(tabId, func) {
  const results = await chrome.scripting.executeScript({
    target: { tabId },
    func,
    world: 'MAIN',   // run in page context where GM globals live
  });
  return results?.[0]?.result;
}

// ── Read cache info from the active tab's localStorage ───────────────────

async function getCacheInfo(tabId) {
  return execInTab(tabId, () => {
    const PREFIX       = 'usc:Duolingo_DuoHacker:';
    const CACHE_KEY    = PREFIX + '__script_cache__';
    const CACHE_TS_KEY = PREFIX + '__script_ts__';
    const code = localStorage.getItem(CACHE_KEY);
    const ts   = parseInt(localStorage.getItem(CACHE_TS_KEY) || '0', 10);
    return { hasCache: !!code, cacheSize: code ? code.length : 0, ts };
  });
}

// ── Check if DuoHacker is running in the tab ─────────────────────────────

async function getScriptStatus(tabId) {
  return execInTab(tabId, () => {
    // DuoHacker sets window.GM with its info after boot
    try {
      return !!(window.GM && window.GM.info &&
        window.GM.info.script.name === 'Duolingo DuoHacker');
    } catch { return false; }
  });
}

// ── Refresh UI ────────────────────────────────────────────────────────────

async function refresh() {
  setStatus('loading', 'Checking...');
  infoPage.textContent     = '—';
  infoScript.textContent   = '—';
  infoCache.textContent    = '—';
  infoCacheAge.textContent = '—';

  const tab = await getDuoTab();

  if (!tab) {
    setStatus('error', 'No Duolingo tab open', '');
    infoPage.textContent   = 'None';
    infoScript.textContent = '—';
    btnRefresh.disabled    = true;
    btnClear.disabled      = true;

    // Still show cache age from extension storage if we have it
    return;
  }

  btnRefresh.disabled = false;
  btnClear.disabled   = false;

  // Short URL for display
  const url = tab.url ?? '';
  const path = url.replace(/^https:\/\/[^/]+/, '') || '/';
  infoPage.textContent = path.length > 28 ? path.slice(0, 27) + '…' : path;

  // Script running?
  try {
    const running = await getScriptStatus(tab.id);
    infoScript.className = `value ${running ? 'ok' : 'err'}`;
    infoScript.textContent = running ? 'Active ✓' : 'Not loaded';
    setStatus(
      running ? 'active' : 'error',
      running ? 'DuoHacker is running' : 'Script not detected',
      tab.title?.slice(0, 20) ?? ''
    );
  } catch {
    infoScript.textContent = 'Unknown';
    setStatus('error', 'Could not inspect tab');
  }

  // Cache info
  try {
    const ci = await getCacheInfo(tab.id);
    if (ci.hasCache) {
      const kb  = Math.round(ci.cacheSize / 1024);
      const age = ci.ts ? Date.now() - ci.ts : null;
      infoCache.className     = 'value ok';
      infoCache.textContent   = `${kb} KB`;
      infoCacheAge.textContent = age !== null ? fmtAge(age) : '—';
    } else {
      infoCache.className   = 'value err';
      infoCache.textContent = 'Empty';
      infoCacheAge.textContent = '—';
    }
  } catch {
    infoCache.textContent = '—';
  }
}

// ── Button handlers ───────────────────────────────────────────────────────

btnOpen.addEventListener('click', async () => {
  const tab = await getDuoTab();
  if (tab) {
    await chrome.tabs.update(tab.id, { active: true });
    await chrome.windows.update(tab.windowId, { focused: true });
  } else {
    await chrome.tabs.create({ url: DUO_URL });
  }
  window.close();
});

btnRefresh.addEventListener('click', async () => {
  btnRefresh.disabled = true;
  btnRefresh.textContent = 'Refreshing…';

  const tab = await getDuoTab();
  if (!tab) { await refresh(); return; }

  // Clear cache in page localStorage then reload
  await execInTab(tab.id, () => {
    const PREFIX       = 'usc:Duolingo_DuoHacker:';
    localStorage.removeItem(PREFIX + '__script_cache__');
    localStorage.removeItem(PREFIX + '__script_ts__');
  });

  await chrome.tabs.reload(tab.id);

  // Wait a moment for page to start loading, then re-check
  setTimeout(() => refresh(), 1500);
});

btnClear.addEventListener('click', async () => {
  btnClear.disabled = true;
  const tab = await getDuoTab();
  if (tab) {
    await execInTab(tab.id, () => {
      const PREFIX = 'usc:Duolingo_DuoHacker:';
      localStorage.removeItem(PREFIX + '__script_cache__');
      localStorage.removeItem(PREFIX + '__script_ts__');
    });
  }
  await refresh();
  btnClear.disabled = false;
});

// ── Init ──────────────────────────────────────────────────────────────────
refresh();