(() => {
  const homeUrl = new URL('../index.html', document.baseURI).href;
  const gameUrl = location.href;
  let leavingGame = false;

  const homeButton = document.createElement('button');
  homeButton.type = 'button';
  homeButton.textContent = '\u2190 MiniGames-v1';
  homeButton.setAttribute('aria-label', 'Return to MiniGames-v1');
  homeButton.style.cssText = [
    'position:fixed',
    'top:calc(env(safe-area-inset-top, 0px) + 12px)',
    'left:12px',
    'z-index:1000',
    'padding:10px 14px',
    'border:1px solid rgba(255,255,255,.35)',
    'border-radius:10px',
    'background:rgba(15, 15, 25, .88)',
    'color:#fff',
    'font:600 14px system-ui, sans-serif',
    'cursor:pointer',
    'touch-action:manipulation'
  ].join(';');

  function confirmExit() {
    return window.confirm('Return to MiniGames-v1? Your game progress may be lost.');
  }

  homeButton.addEventListener('click', () => {
    if (!confirmExit()) return;
    leavingGame = true;
    window.location.href = homeUrl;
  });
  document.body.appendChild(homeButton);

  history.pushState({ miniGamesExitGuard: true }, '', gameUrl);
  window.addEventListener('popstate', () => {
    if (confirmExit()) {
      leavingGame = true;
      window.location.replace(homeUrl);
      return;
    }
    history.pushState({ miniGamesExitGuard: true }, '', gameUrl);
  });

  window.addEventListener('beforeunload', event => {
    if (leavingGame) return;
    event.preventDefault();
    event.returnValue = '';
  });
})();
