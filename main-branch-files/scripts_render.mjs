// 순수 함수만 둡니다 (node API·네트워크 없음). build-blog.mjs가 이 모듈을 불러 씁니다.
// 테스트 가능하도록 파일시스템 접근을 분리했습니다.

export const SITE = 'https://www.prornco.com';
export const BLOG_PATH = '/blog';
export const SERVED_LOCALES = ['ko'];
export const DEFAULT_LOCALE = 'ko';

const BRAND = {
  ink: '#0F1420',
  navy: '#1B2A66',
  soft: '#5A6070',
  line: '#E8E6E0',
  bg: '#FBFAF7',
  accent: '#2F6FED',
  dark: '#0E1526',
};

export const lang = (item) => String(item?._geo?.language ?? DEFAULT_LOCALE).split('-')[0].toLowerCase();

export const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

// 스펙: image는 빈 문자열로 오는 경우가 더 흔하다. 존재 여부가 아니라 참/거짓으로 판단한다.
export const imageOf = (item) => (typeof item?.image === 'string' ? item.image.trim() : '') || null;

// 스펙: content_html이 없을 수 있다 (content_text만 있는 에디션).
export const bodyOf = (item) => {
  const html = item?.content_html;
  if (typeof html === 'string' && html.trim()) return html;
  const text = item?.content_text;
  if (typeof text === 'string' && text.trim()) return '<p>' + esc(text) + '</p>';
  return '';
};

export const dateLabel = (iso) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.getFullYear() + '.' + String(d.getMonth() + 1).padStart(2, '0') + '.' + String(d.getDate()).padStart(2, '0');
};

/** 가족(family_id)별로 묶는다. 번역본은 각각 별개 아이템이다. */
export function groupFamilies(items) {
  const families = new Map();
  for (const item of items) {
    const key = item?._geo?.family_id ?? item?.id;
    if (!key) continue;
    families.set(key, [...(families.get(key) ?? []), item]);
  }
  return families;
}

const newest = (xs) => [...xs].sort((a, b) => Date.parse(b.date_published) - Date.parse(a.date_published))[0];

const isPublished = (item) => {
  const status = item?._geo?.status;
  return status === undefined || status === 'published';
};

/**
 * 서빙할 로케일의 아이템만 가족당 1건씩 고른다.
 * 같은 언어가 여러 건이면 최신을 쓴다. 해당 언어가 없으면 감춘다(기본 로케일도 없으면 제외).
 */
export function selectForLocale(items, locale = DEFAULT_LOCALE) {
  const families = groupFamilies(items.filter(isPublished));
  const picked = [];
  for (const group of families.values()) {
    const exact = group.filter((i) => lang(i) === locale);
    if (exact.length) { picked.push(newest(exact)); continue; }
    const fallback = group.filter((i) => lang(i) === DEFAULT_LOCALE);
    if (fallback.length) picked.push(newest(fallback));
  }
  return picked.sort((a, b) => Date.parse(b.date_published) - Date.parse(a.date_published));
}

/** hreflang: _geo.alternates 값을 그대로 쓴다. URL을 직접 만들지 않는다. 서빙하는 언어만 남긴다. */
export function alternatesOf(item) {
  const alts = item?._geo?.alternates;
  if (!alts || typeof alts !== 'object') return [];
  return Object.entries(alts)
    .filter(([locale, href]) => SERVED_LOCALES.includes(String(locale).split('-')[0].toLowerCase()) && typeof href === 'string' && href.trim())
    .map(([locale, href]) => ({ hreflang: locale, href }));
}

export const slugOf = (item) => item?._geo?.slug;
export const canonicalOf = (item) => item?._geo?.canonical || (SITE + BLOG_PATH + '/' + slugOf(item));

function head({ title, description, canonical, locale, alternates, jsonld, image }) {
  const rows = [
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    '<title>' + esc(title) + '</title>',
  ];
  if (description) rows.push('<meta name="description" content="' + esc(description) + '">');
  rows.push('<link rel="canonical" href="' + esc(canonical) + '">');
  for (const a of alternates || []) {
    rows.push('<link rel="alternate" hreflang="' + esc(a.hreflang) + '" href="' + esc(a.href) + '">');
  }
  rows.push('<meta property="og:type" content="article">');
  rows.push('<meta property="og:title" content="' + esc(title) + '">');
  rows.push('<meta property="og:url" content="' + esc(canonical) + '">');
  if (image) rows.push('<meta property="og:image" content="' + esc(image) + '">');
  rows.push('<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css">');
  if (jsonld) {
    rows.push('<script type="application/ld+json">' + JSON.stringify(jsonld).replace(/</g, '\\u003c') + '</script>');
  }
  return '<!DOCTYPE html>\n<html lang="' + esc(locale) + '">\n<head>\n' + rows.join('\n') + '\n</head>\n';
}

const FONT = "'Pretendard','Apple SD Gothic Neo',-apple-system,BlinkMacSystemFont,sans-serif";

function siteHeader() {
  return '<header style="border-bottom:1px solid ' + BRAND.line + '; background:rgba(251,250,247,0.92);">'
    + '<div style="max-width:1160px; margin:0 auto; padding:18px 24px; display:flex; align-items:center; justify-content:space-between; gap:16px;">'
    + '<a href="/" style="font-size:20px; font-weight:900; letter-spacing:-0.5px; color:' + BRAND.ink + '; text-decoration:none;">PROR.CO</a>'
    + '<nav style="display:flex; gap:18px; font-size:14px;">'
    + '<a href="/" style="color:' + BRAND.soft + '; text-decoration:none;">홈</a>'
    + '<a href="' + BLOG_PATH + '/" style="color:' + BRAND.accent + '; font-weight:700; text-decoration:none;">조명 가이드</a>'
    + '<a href="/상세견적.dc.html" style="color:' + BRAND.soft + '; text-decoration:none;">셀프견적</a>'
    + '</nav>'
    + '<span style="font-size:13px; color:' + BRAND.soft + ';">전화상담 <b style="color:' + BRAND.ink + ';">010-9850-2293</b></span>'
    + '</div></header>';
}

function siteFooter() {
  return '<footer style="background:' + BRAND.dark + '; color:#B8BECC; padding:40px 0; margin-top:56px;">'
    + '<div style="max-width:1160px; margin:0 auto; padding:0 24px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:16px; font-size:13px;">'
    + '<a href="/" style="color:#fff; font-weight:900; font-size:16px; text-decoration:none;">PROR.CO</a>'
    + '<span>대표번호 <b style="color:#fff;">010-9850-2293</b></span>'
    + '</div></footer>';
}

function ctaBlock() {
  return '<div style="max-width:760px; margin:48px auto 0; padding:32px 28px; background:#fff; border:1px solid ' + BRAND.line + '; border-radius:18px; text-align:center;">'
    + '<div style="font-size:20px; font-weight:800; letter-spacing:-0.04em; color:' + BRAND.ink + '; margin-bottom:10px;">우리 집 견적이 궁금하신가요?</div>'
    + '<div style="font-size:14px; color:' + BRAND.soft + '; line-height:1.8; margin-bottom:22px;">셀프견적으로 예상 금액을 먼저 확인하시거나,<br>카카오톡으로 편하게 상담받으실 수 있습니다.</div>'
    + '<div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">'
    + '<a href="/상세견적.dc.html" style="display:inline-flex; align-items:center; min-height:48px; padding:0 22px; border-radius:999px; background:' + BRAND.accent + '; color:#fff; font-size:14px; font-weight:800; text-decoration:none;">셀프견적 시작하기</a>'
    + '<a href="http://pf.kakao.com/_xdBVxaX/chat" style="display:inline-flex; align-items:center; min-height:48px; padding:0 22px; border-radius:999px; background:' + BRAND.dark + '; color:#fff; font-size:14px; font-weight:800; text-decoration:none;">카카오로 상담하기</a>'
    + '</div></div>';
}

/** 글 목록 페이지 */
export function listPage(items, opts = {}) {
  const locale = opts.locale || DEFAULT_LOCALE;
  const canonical = SITE + BLOG_PATH + '/';
  const cards = items.map((item) => {
    const img = imageOf(item);
    const href = BLOG_PATH + '/' + slugOf(item) + '/';
    const tag = Array.isArray(item.tags) && item.tags.length ? item.tags[0] : null;
    return '<a href="' + esc(href) + '" style="display:flex; flex-direction:column; border:1px solid ' + BRAND.line + '; border-radius:16px; overflow:hidden; background:#fff; color:' + BRAND.ink + '; text-decoration:none;">'
      + (img ? '<img src="' + esc(img) + '" alt="" style="width:100%; aspect-ratio:16/10; object-fit:cover; display:block;">' : '')
      + '<div style="padding:20px; display:flex; flex-direction:column; gap:9px; flex:1;">'
      + (tag ? '<span style="align-self:flex-start; font-size:11px; font-weight:800; letter-spacing:0.04em; color:' + BRAND.accent + '; background:rgba(47,111,237,0.08); padding:5px 11px; border-radius:999px;">' + esc(tag) + '</span>' : '')
      + '<h2 style="margin:0; font-size:18px; font-weight:800; letter-spacing:-0.03em; line-height:1.45; color:' + BRAND.navy + ';">' + esc(item.title) + '</h2>'
      + (item.summary ? '<p style="margin:0; font-size:13.5px; color:' + BRAND.soft + '; line-height:1.7;">' + esc(item.summary) + '</p>' : '')
      + '<span style="margin-top:auto; padding-top:10px; font-size:12px; color:' + BRAND.soft + ';">' + esc(dateLabel(item.date_published)) + '</span>'
      + '</div></a>';
  }).join('\n');

  const body = '<body style="margin:0; background:' + BRAND.bg + '; color:' + BRAND.ink + '; font-family:' + FONT + '; -webkit-font-smoothing:antialiased;">'
    + siteHeader()
    + '<main style="max-width:1160px; margin:0 auto; padding:56px 24px 0;">'
    + '<div style="font-size:11.5px; font-weight:700; letter-spacing:0.12em; color:' + BRAND.accent + '; margin-bottom:12px;">LIGHTING GUIDE</div>'
    + '<h1 style="margin:0 0 12px; font-size:32px; font-weight:800; letter-spacing:-0.045em; line-height:1.25; color:' + BRAND.navy + ';">조명 시공, 알고 하면 다릅니다</h1>'
    + '<p style="margin:0 0 36px; font-size:15px; color:' + BRAND.soft + '; line-height:1.8;">우물천장·간접조명·실링팬 시공을 준비하며 알아두면 좋은 내용을 정리합니다.</p>'
    + (items.length
      ? '<div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px;">' + cards + '</div>'
      : '<p style="font-size:15px; color:' + BRAND.soft + ';">준비 중입니다.</p>')
    + ctaBlock()
    + '</main>'
    + siteFooter()
    + '</body>\n</html>\n';

  return head({
    title: '조명 가이드 | PROR.CO',
    description: '우물천장·간접조명·실링팬 시공 가이드',
    canonical,
    locale,
    alternates: [],
    jsonld: null,
    image: null,
  }) + body;
}

/** 글 상세 페이지 */
export function postPage(item) {
  const locale = lang(item);
  const canonical = canonicalOf(item);
  const img = imageOf(item);
  const tag = Array.isArray(item.tags) && item.tags.length ? item.tags[0] : null;

  const body = '<body style="margin:0; background:' + BRAND.bg + '; color:' + BRAND.ink + '; font-family:' + FONT + '; -webkit-font-smoothing:antialiased;">'
    + siteHeader()
    + '<main style="max-width:760px; margin:0 auto; padding:56px 24px 0;">'
    + '<nav style="font-size:12.5px; color:' + BRAND.soft + '; margin-bottom:18px;">'
    + '<a href="/" style="color:inherit; text-decoration:none;">홈</a> · '
    + '<a href="' + BLOG_PATH + '/" style="color:inherit; text-decoration:none;">조명 가이드</a>'
    + '</nav>'
    + (tag ? '<span style="display:inline-block; font-size:11px; font-weight:800; letter-spacing:0.04em; color:' + BRAND.accent + '; background:rgba(47,111,237,0.08); padding:5px 11px; border-radius:999px; margin-bottom:14px;">' + esc(tag) + '</span>' : '')
    + '<h1 style="margin:0 0 14px; font-size:30px; font-weight:800; letter-spacing:-0.045em; line-height:1.3; color:' + BRAND.navy + ';">' + esc(item.title) + '</h1>'
    + '<div style="font-size:13px; color:' + BRAND.soft + '; margin-bottom:28px;">' + esc(dateLabel(item.date_published)) + '</div>'
    + (img ? '<img src="' + esc(img) + '" alt="" style="width:100%; aspect-ratio:16/9; object-fit:cover; border-radius:16px; display:block; margin-bottom:32px;">' : '')
    + '<article style="font-size:16px; line-height:1.9; color:#2B3040;">' + bodyOf(item) + '</article>'
    + ctaBlock()
    + '</main>'
    + siteFooter()
    + '</body>\n</html>\n';

  return head({
    title: item.title + ' | PROR.CO',
    description: item.summary || '',
    canonical,
    locale,
    alternates: alternatesOf(item),
    jsonld: item?._geo?.schema_jsonld || null,
    image: img,
  }) + body;
}

/** sitemap.xml — 로케일 에디션마다 자기 canonical로 등재, lastmod는 date_modified 우선 */
export function sitemapXml(items, extraUrls = []) {
  const rows = [];
  for (const url of extraUrls) {
    rows.push('  <url><loc>' + esc(url) + '</loc></url>');
  }
  for (const item of items) {
    const alts = alternatesOf(item)
      .map((a) => '\n    <xhtml:link rel="alternate" hreflang="' + esc(a.hreflang) + '" href="' + esc(a.href) + '"/>')
      .join('');
    const lastmod = item.date_modified || item.date_published;
    rows.push('  <url>\n    <loc>' + esc(canonicalOf(item)) + '</loc>'
      + (lastmod ? '\n    <lastmod>' + esc(lastmod) + '</lastmod>' : '')
      + alts + '\n  </url>');
  }
  return '<?xml version="1.0" encoding="UTF-8"?>\n'
    + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
    + rows.join('\n') + '\n</urlset>\n';
}

export function robotsTxt() {
  return 'User-agent: *\nAllow: /\n\nSitemap: ' + SITE + '/sitemap.xml\n';
}

/** 모든 HTML에 검증 메타를 1회만 삽입 */
export function injectVerification(html, token) {
  if (!token) return { html, changed: false };
  if (html.includes('aeolo-site-verification')) return { html, changed: false };
  const tag = '<meta name="aeolo-site-verification" content="' + esc(token) + '">';
  const m = html.match(/<head[^>]*>/i);
  if (m) {
    const at = m.index + m[0].length;
    return { html: html.slice(0, at) + '\n' + tag + html.slice(at), changed: true };
  }
  // <head>가 없는 문서: 문서 맨 앞에 넣는다 (브라우저가 head로 흡수한다)
  return { html: tag + '\n' + html, changed: true };
}
