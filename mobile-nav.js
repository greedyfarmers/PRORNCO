(function () {
  if (window.customElements.get('mobile-nav')) return;

  const MENU = [
    { label: '시공패키지', href: './시공패키지.dc.html', children: [
      { label: '간접조명 패키지', href: './간접조명패키지.dc.html' },
      { label: '우물천장 패키지', href: './우물천장패키지.dc.html' },
      { label: '우물천장 + 실링팬 패키지', href: './우물천장실링팬패키지.dc.html' },
      { label: '실링팬 패키지', href: './실링팬패키지.dc.html' }
    ]},
    { label: '개별항목', href: './개별항목.dc.html', children: [
      { label: '우물천장조명', href: './개별항목.dc.html#umul' },
      { label: '커튼조명', href: './개별항목.dc.html#curtain' },
      { label: '다운라이트 · COB', href: './개별항목.dc.html#cob' },
      { label: '욕실·현관 센서등', href: './개별항목.dc.html#sensor' },
      { label: '실링팬', href: './개별항목.dc.html#fan' }
    ]},
    { label: '색상안내', href: './색상안내.dc.html' },
    { label: '셀프견적', href: './상세견적.dc.html' },
    { label: '시공사례', href: './시공사례.dc.html' },
    { label: '시공후기', href: './시공후기.dc.html' },
    { label: '고객센터', href: './고객센터.dc.html' }
  ];

  const CSS = `
    :host{display:none;}
    @media (max-width: 720px){ :host{display:block;} }
    *{box-sizing:border-box;}
    button{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer;}
    .burger{width:2.75rem;height:2.75rem;display:flex;flex-direction:column;
      align-items:center;justify-content:center;gap:0.3rem;border-radius:0.5rem;}
    .burger span{display:block;width:1.375rem;height:2px;background:currentColor;border-radius:2px;
      transition:transform .22s ease, opacity .22s ease;}
    :host([open]) .burger span:nth-child(1){transform:translateY(0.5rem) rotate(45deg);}
    :host([open]) .burger span:nth-child(2){opacity:0;}
    :host([open]) .burger span:nth-child(3){transform:translateY(-0.5rem) rotate(-45deg);}
    .sheet{position:fixed;top:0;left:0;width:100vw;height:100vh;height:100dvh;z-index:999;background:#fff;
      display:flex;flex-direction:column;overflow:hidden;
      opacity:0;visibility:hidden;transform:translateX(6%);
      transition:opacity .22s ease, transform .28s ease, visibility .22s;}
    :host([open]) .sheet{opacity:1;visibility:visible;transform:translateX(0);}
    .top{display:flex;align-items:center;justify-content:space-between;
      padding:1.125rem 1.25rem;border-bottom:1px solid #E9E9E9;flex:0 0 auto;}
    .mark{font-size:1.3125rem;font-weight:900;letter-spacing:-0.5px;
      font-family:'ArchivoExpandedBlack','Archivo',sans-serif;color:#111;text-decoration:none;}
    .close{width:2.5rem;height:2.5rem;font-size:1.5rem;line-height:1;color:#111;}
    nav{flex:1 1 auto;overflow-y:auto;padding:0.5rem 0 1.5rem;}
    .row{display:block;padding:1.0625rem 1.25rem;font-size:1.0625rem;font-weight:700;
      color:#111;text-decoration:none;border-bottom:1px solid #F1F1F1;}
    .row[data-current]{color:#2F6FED;}
    .subs{display:flex;flex-direction:column;background:#FAFBFD;
      border-bottom:1px solid #F1F1F1;}
    .sub{display:block;padding:0.8125rem 1.25rem 0.8125rem 2rem;font-size:0.9375rem;
      font-weight:500;color:#6B6B6B;text-decoration:none;}
    .cta{flex:0 0 auto;display:flex;gap:0.625rem;padding:1rem 1.25rem;
      border-top:1px solid #E9E9E9;background:#fff;}
    .cta a{flex:1 1 0;min-height:3.25rem;display:flex;align-items:center;justify-content:center;
      border-radius:0.625rem;font-size:0.9375rem;font-weight:800;text-decoration:none;}
    .tel{background:#2445E8;color:#fff;}
    .kakao{background:#FFE94A;color:#2C2200;}
  `;

  class MobileNav extends HTMLElement {
    connectedCallback() {
      if (this._built) return;
      this._built = true;
      const cur = this.getAttribute('current') || '';
      const root = this.attachShadow({ mode: 'open' });
      const rows = MENU.map(m => {
        const isCur = m.label === cur;
        const head = `<a class="row" href="${m.href}"${isCur ? ' data-current' : ''}>${m.label}</a>`;
        const subs = m.children
          ? `<div class="subs">${m.children.map(c => `<a class="sub" href="${c.href}">${c.label}</a>`).join('')}</div>`
          : '';
        return head + subs;
      }).join('');

      root.innerHTML = `<style>${CSS}</style>
        <button class="burger" aria-label="메뉴 열기">
          <span></span><span></span><span></span>
        </button>
        <div class="sheet" role="dialog" aria-modal="true">
          <div class="top">
            <a class="mark" href="./PRORCO 홈페이지.dc.html">PROR.CO</a>
            <button class="close" aria-label="메뉴 닫기">✕</button>
          </div>
          <nav>${rows}</nav>
          <div class="cta">
            <a class="tel" href="tel:010-9850-2293">전화상담</a>
            <a class="kakao" href="http://pf.kakao.com/_xdBVxaX/chat" target="_blank" rel="noopener">카톡상담</a>
          </div>
        </div>`;

      const HIDE_ID = '__mobile-nav-hide-fab';
      const toggle = (on) => {
        if (on) this.setAttribute('open', '');
        else this.removeAttribute('open');
        document.documentElement.style.overflow = on ? 'hidden' : '';
        let st = document.getElementById(HIDE_ID);
        if (on) {
          if (!st) {
            st = document.createElement('style');
            st.id = HIDE_ID;
            st.textContent = '[data-fabwrap],[data-r="float"],[data-r="bar"]{display:none !important;}';
            document.head.appendChild(st);
          }
        } else if (st) {
          st.remove();
        }
      };
      root.querySelector('.burger').addEventListener('click', () => toggle(!this.hasAttribute('open')));
      root.querySelector('.close').addEventListener('click', () => toggle(false));
      root.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => toggle(false)));
      window.addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });
    }
    disconnectedCallback() {
      document.documentElement.style.overflow = '';
      const st = document.getElementById('__mobile-nav-hide-fab');
      if (st) st.remove();
    }
  }
  window.customElements.define('mobile-nav', MobileNav);
})();
