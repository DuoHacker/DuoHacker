(() => {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('inject.js');
  script.onerror = () => {
    console.error('[DuoHacker] failed to load inject.js');
  };
  script.onload = () => script.remove();
  (document.head || document.documentElement).appendChild(script);
})();