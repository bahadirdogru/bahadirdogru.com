// Tema düğmesi, kod kopyalama ve liste süzgeci. Alt sitelerdeki davranışla aynı.
(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-btn');
  if (btn) btn.addEventListener('click', function () {
    var dark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  });

  document.querySelectorAll('.prose pre').forEach(function (pre) {
    if (!navigator.clipboard) return;
    var b = document.createElement('button');
    b.className = 'copy-btn'; b.type = 'button'; b.textContent = 'Kopyala';
    b.addEventListener('click', function () {
      navigator.clipboard.writeText((pre.querySelector('code') || pre).innerText.trimEnd()).then(function () {
        b.textContent = 'Kopyalandı'; setTimeout(function () { b.textContent = 'Kopyala'; }, 1500);
      });
    });
    pre.appendChild(b);
  });

  document.querySelectorAll('input[data-filter]').forEach(function (input) {
    var items = document.querySelectorAll(input.dataset.filter);
    var norm = function (s) { return s.toLocaleLowerCase('tr'); };
    input.addEventListener('input', function () {
      var q = norm(input.value.trim());
      items.forEach(function (li) { li.hidden = q && norm(li.textContent).indexOf(q) < 0; });
    });
  });
})();
