// 우클릭 · 이미지 드래그 · 텍스트 선택 억제 (일반 방문자 대상, 완전한 보호는 아님)
(function () {
  if (window.__prorcoProtect) return;
  window.__prorcoProtect = true;

  const isInput = (el) => el && (el.closest('input, textarea, [contenteditable="true"]'));

  document.addEventListener('contextmenu', (e) => {
    if (isInput(e.target)) return;
    e.preventDefault();
  });

  document.addEventListener('dragstart', (e) => {
    if (e.target && e.target.tagName === 'IMG') e.preventDefault();
  });

  document.addEventListener('keydown', (e) => {
    if (isInput(e.target)) return;
    const k = (e.key || '').toLowerCase();
    // 저장 · 소스보기 · 인쇄 · 개발자도구
    if ((e.ctrlKey || e.metaKey) && ['s', 'u', 'p'].includes(k)) e.preventDefault();
    if (k === 'f12') e.preventDefault();
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'j', 'c'].includes(k)) e.preventDefault();
  });

  const style = document.createElement('style');
  style.textContent =
    'img{-webkit-user-drag:none;user-drag:none;-webkit-touch-callout:none;}' +
    'body{-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-touch-callout:none;}' +
    'input,textarea,[contenteditable="true"]{-webkit-user-select:text;user-select:text;}';
  (document.head || document.documentElement).appendChild(style);
})();
