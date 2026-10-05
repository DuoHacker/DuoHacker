/**
 * DuoHacker Chrome Extension — inject.js
 * Runs in page context (injected via content.js).
 * Provides full GM/GM4 shim then fetches + runs the userscript.
 */
(async () => {

  // ─── GM Storage shim (localStorage-backed) ───────────────────────────────

  const PREFIX   = 'usc:Duolingo_DuoHacker:';
  const listeners = new Map();
  let   listenerSeq = 0;

  function _read(name, fallback) {
    const raw = localStorage.getItem(PREFIX + name);
    if (raw === null) return fallback ?? undefined;
    try   { return JSON.parse(raw); }
    catch { return raw; }
  }

  function _write(name, value) {
    const oldValue = _read(name);
    localStorage.setItem(PREFIX + name, JSON.stringify(value));
    for (const listener of listeners.values()) {
      if (listener.name === name) {
        try { listener.callback(name, oldValue, value, false); }
        catch (e) { console.warn('[DuoHacker] value-listener error', e); }
      }
    }
  }

  // ─── GM_xmlhttpRequest shim ───────────────────────────────────────────────

  function GM_xmlhttpRequest(details) {
    const controller = new AbortController();

    const promise = fetch(details.url, {
      method:      details.method || 'GET',
      headers:     details.headers,
      body:        details.data,
      signal:      controller.signal,
      credentials: details.anonymous ? 'omit' : 'include',
    })
    .then(async response => {
      let body, responseText = '';

      if (details.responseType === 'blob') {
        body = await response.blob();
      } else if (details.responseType === 'arraybuffer') {
        body = await response.arrayBuffer();
      } else {
        responseText = await response.clone().text();
        body = details.responseType === 'json'
          ? JSON.parse(responseText || 'null')
          : responseText;
      }

      const xhr = {
        response:    body,
        responseText,
        status:      response.status,
        statusText:  response.statusText,
        finalUrl:    response.url,
      };

      details.onload?.(xhr);
      return xhr;
    })
    .catch(err => {
      details.onerror?.(err);
      throw err;
    });

    return {
      abort: () => controller.abort(),
      then:    promise.then.bind(promise),
      catch:   promise.catch.bind(promise),
      finally: promise.finally.bind(promise),
    };
  }

  // ─── GM_addStyle shim ─────────────────────────────────────────────────────

  function GM_addStyle(css) {
    const style = document.createElement('style');
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
    return style;
  }

  // ─── GM_info ──────────────────────────────────────────────────────────────

  const GM_info = {
    script: {
      name:        'Duolingo DuoHacker',
      description: 'The #1 Duolingo hack',
      version:     '2026.06.08',
    },
    scriptHandler: 'Chrome Extension Harness',
    version: '3.0',
  };

  // ─── GM4 object ───────────────────────────────────────────────────────────

  const GM = {
    info: GM_info,

    getValue:    (name, fallback) => Promise.resolve(_read(name, fallback)),
    setValue:    (name, value)    => Promise.resolve(_write(name, value)),
    deleteValue: (name)           => Promise.resolve(localStorage.removeItem(PREFIX + name)),

    listValues: () => Promise.resolve(
      Object.keys(localStorage)
        .filter(k => k.startsWith(PREFIX))
        .map(k => k.slice(PREFIX.length))
    ),

    addValueChangeListener: (name, callback) => {
      const id = ++listenerSeq;
      listeners.set(id, { name, callback });
      return id;
    },
    removeValueChangeListener: id => listeners.delete(id),

    addStyle:      GM_addStyle,
    xmlHttpRequest:  details => GM_xmlhttpRequest(details),
    xmlhttpRequest:  details => GM_xmlhttpRequest(details),

    registerMenuCommand: () => undefined,
    setClipboard: text => navigator.clipboard.writeText(String(text ?? '')),
  };

  // ─── Expose on window (Tampermonkey-compatible API surface) ──────────────

  Object.assign(window, {
    GM,
    GM_info,
    GM_getValue:                _read,
    GM_setValue:                _write,
    GM_deleteValue:             name => localStorage.removeItem(PREFIX + name),
    GM_listValues:              GM.listValues,
    GM_addValueChangeListener:  GM.addValueChangeListener,
    GM_removeValueChangeListener: GM.removeValueChangeListener,
    GM_addStyle,
    GM_xmlhttpRequest,
    GM_registerMenuCommand:     () => undefined,
    unsafeWindow:               window,
  });

  // ─── Script loader — fetch with localStorage cache ────────────────────────

  const SCRIPT_URL    = 'https://update.greasyfork.org/scripts/561041/Duolingo%20DuoHacker.user.js';
  const CACHE_KEY     = PREFIX + '__script_cache__';
  const CACHE_TS_KEY  = PREFIX + '__script_ts__';
  const CACHE_TTL_MS  = 6 * 60 * 60 * 1000; // 6 hours

  async function loadScript() {
    const now       = Date.now();
    const cachedTs  = parseInt(localStorage.getItem(CACHE_TS_KEY) || '0', 10);
    const cachedCode = localStorage.getItem(CACHE_KEY);

    // Use cache if fresh and non-empty
    if (cachedCode && (now - cachedTs) < CACHE_TTL_MS) {
      return cachedCode;
    }

    // Fetch fresh copy
    const res = await fetch(SCRIPT_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const code = await res.text();
    if (!code || code.length < 100) throw new Error('Empty script response');

    // Persist to cache
    try {
      localStorage.setItem(CACHE_KEY, code);
      localStorage.setItem(CACHE_TS_KEY, String(now));
    } catch (e) {
      // localStorage quota exceeded — run without caching
      console.warn('[DuoHacker] cache write failed:', e);
    }

    return code;
  }

  // ─── Run ──────────────────────────────────────────────────────────────────

  try {
    const code = await loadScript();

    // Use Function constructor instead of eval — avoids strict-mode issues
    // and keeps a clean call stack in DevTools
    const fn = new Function(code);
    fn();

    console.log('[DuoHacker] injected successfully');

    // Notify popup (if open) that the script is running
    window.dispatchEvent(new CustomEvent('duohacker:ready', {
      detail: { version: GM_info.script.version }
    }));

  } catch (err) {
    console.error('[DuoHacker] injection failed:', err);

    // Try running from cache as last resort
    const fallback = localStorage.getItem(CACHE_KEY);
    if (fallback) {
      try {
        new Function(fallback)();
        console.warn('[DuoHacker] running from stale cache');
      } catch (e2) {
        console.error('[DuoHacker] fallback also failed:', e2);
      }
    }
  }

})();