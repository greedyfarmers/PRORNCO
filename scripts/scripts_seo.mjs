// 페이지별 정적 SEO 데이터. 빌드 때 각 HTML의 <head>/<body>에 심는다.
// DC 페이지는 브라우저 JS로 그려지므로 크롤러가 받는 첫 응답에 제목·헤딩·핵심 본문이 없다.
// 여기 값이 그 첫 응답을 채운다. 화면 렌더링에는 영향이 없다.

export const SITE = 'https://www.prornco.com';

const enc = (name) => encodeURI(name);

/** noindex 처리 (부품 파일·중복 경로) */
export const NOINDEX = new Set([
  'ReviewStrip.dc.html',
]);

/** 같은 내용을 서비스하는 중복 경로 → 정본 경로 */
export const CANONICAL_ALIAS = {
  'prorco-home.dc.html': '/',
  'index.html': '/',
  'PRORCO 홈페이지.dc.html': '/',
};

export const PAGES = {
  'index.html': {
    title: '프로어앤코 | 우물천장·간접조명·실링팬 정찰제 시공',
    description: '우물천장 조명, 간접조명, 실링팬 시공을 정찰제로 진행합니다. 셀프견적으로 예상 금액을 미리 확인하고 카카오톡으로 상담받으세요.',
    h1: '우리 집에 맞는 시공 패키지 찾기',
    body: [
      '프로어앤코는 우물천장 조명, 커튼박스 간접조명, 다운라이트, 욕실·현관 센서등, 실링팬 시공을 정찰제로 진행합니다. 상담 전에 셀프견적으로 예상 금액을 직접 확인하실 수 있습니다.',
      '패키지는 네 가지입니다. 간접조명 패키지 51만원(정가 63만원), 우물천장 패키지 85만원(정가 105만원), 우물천장 + 실링팬 패키지 123만원(정가 143만원), 실링팬 패키지 88만원(정가 99만원). 모두 부가세 포함 금액이며 실측 후 최종 확정됩니다.',
      '상담부터 시공까지 네 단계입니다. 카톡·전화 상담, 계약·일정 확정, 방문·시공, 완료 확인·결제. 시공 후 1년 무상 A/S가 제공됩니다.',
      '대표번호 010-9850-2293',
    ],
    links: [
      ['시공패키지', '시공패키지.dc.html'],
      ['셀프견적', '상세견적.dc.html'],
      ['개별항목 가격', '개별항목.dc.html'],
      ['색상안내', '색상안내.dc.html'],
      ['시공사례', '시공사례.dc.html'],
      ['시공후기', '시공후기.dc.html'],
      ['고객센터', '고객센터.dc.html'],
    ],
  },

  '시공패키지.dc.html': {
    title: '시공패키지 가격구성 | 프로어앤코',
    description: '간접조명·우물천장·우물천장+실링팬·실링팬 패키지의 구성과 가격을 한눈에 비교하세요. 정찰제, 부가세 포함.',
    h1: '시공 패키지 가격구성',
    body: [
      '네 가지 패키지의 포함 항목과 가격을 비교할 수 있습니다. 모두 정찰제이며 부가세 포함 금액입니다.',
      '간접조명 패키지 51만원 — 다운라이트 8개, 커튼박스 무드등 1곳, 욕실 히든센서 조명 2곳, 현관 하부장 센서조명 1곳, 4구 무선스위치.',
      '우물천장 패키지 85만원 — 한방PVC 또는 무몰딩 직각 우물조명, 다운라이트 8개, 욕실 조명 2곳, 4구 무선스위치.',
      '우물천장 + 실링팬 패키지 123만원 — 실링팬 설치 및 보강, 단독배선, 우물조명, 다운라이트 8개, 욕실조명 2곳, 4구 무선스위치.',
      '실링팬 패키지 88만원 — 실링팬 설치 및 보강, 단독배선, 3인치 다운라이트 8개, 우물천장 안쪽 실크도배.',
    ],
  },

  '간접조명패키지.dc.html': {
    title: '간접조명 패키지 51만원 | 프로어앤코',
    description: '거실 커튼박스, 욕실 히든센서조명, 신발장 하부 센서조명, 다운라이트 8개, 4구 무선스위치. 도배 없이 하루 안에 끝나는 조명 시공.',
    h1: '간접조명 패키지',
    body: [
      '정가 63만원에서 51만원. 거실 커튼박스 무드등, 욕실 히든 센서조명, 신발장 하부 센서조명, 다운라이트 8개, 4구 무선스위치로 구성됩니다.',
      '도배 없이 조명만으로 집 분위기를 바꾸고 싶은 분, 합리적인 비용으로 집의 가치를 올리고 싶은 분, 입주 후에도 하루 안에 조명 시공이 필요한 분께 맞습니다.',
      '추가 옵션: 2인치 다운라이트 변경 개당 5,000원부터, 신발장 무선 히든센서 추가 15,000원부터, 커튼박스 ㄱ자 5만원, 커튼박스 5m/10m 초과 시 5만원/10만원, 6구 무선스위치 변경 3만원, 3채널 스위치 추가 6만원.',
      '실측 후 구조에 따라 금액이 소폭 조정될 수 있습니다. 부가세 별도.',
    ],
  },

  '우물천장패키지.dc.html': {
    title: '우물천장 패키지 85만원 | 한방PVC·무몰딩 | 프로어앤코',
    description: '한방 우물천장 85만원부터, 무몰딩 우물천장 110만원부터. 다운라이트 8개, 욕실 상부장 히든센서 조명, 4구 무선스위치 포함.',
    h1: '우물천장 패키지',
    body: [
      '두 가지 방식 중에 고르실 수 있습니다.',
      '타입 1 한방우물천장 패키지 85만원부터 — 한방우물천장, 다운라이트 8개, 욕실 상부장 히든센서 조명 2곳, 4구 무선 스위치. 입주 후에도 시공이 가능하고 도배를 최소한으로 하고 싶은 분께 맞습니다.',
      '타입 2 무몰딩 우물천장 패키지 110만원부터 — 무몰딩 우물천장(직각), 다운라이트 8개, 욕실 상부장 히든센서 조명 2곳, 4구 무선 스위치. 미니멀한 분위기와 고급스러움을 추구하는 분께 맞으며 천장 전체 도배가 필수입니다.',
      '추가 옵션: 우물조명 1줄 추가 20만원, 무몰딩 라운드 변경 10만원, 우물천장 한쪽면 3.8m/5.6m 초과 시 10만원/20만원, 2인치 다운라이트 변경 개당 5,000원부터, 6구 스위치 변경 3만원, 실크도배 별도문의.',
    ],
  },

  '우물천장실링팬패키지.dc.html': {
    title: '우물천장 + 실링팬 패키지 123만원 | 프로어앤코',
    description: '한방 우물천장 123만원부터, 무몰딩 우물천장 148만원부터. 실링팬 설치·천장보강·단독배선, 다운라이트 8개, 욕실 히든센서조명 포함.',
    h1: '우물천장 + 실링팬 패키지',
    body: [
      '타입 1 실링팬 + 한방우물천장 123만원부터 — 기존 우물천장에 중간 이음새 없는 프리미엄 한방우물천장과 실링팬, 실크도배, 조명 패키지로 구성했습니다. 한방우물천장, 실링팬, 실링팬 보강·설치 및 단독배선, 욕실 상부장 히든센서조명 2곳, 다운라이트 8개, 4구 무선스위치.',
      '타입 2 실링팬 + 무몰딩 우물천장 148만원부터 — 기존 우물천장 몰딩을 철거하고 목공으로 등박스를 만들어 미니멀하고 고급스러운 무드를 완성합니다. 천장 전체 도배가 필요합니다.',
      '실링팬을 함께 하면 공기순환으로 에어컨과 보일러 사용량을 줄여 에너지 효율이 올라갑니다.',
      '추가 옵션: 우물 조명 1줄 추가 20만원, 무몰딩 모서리 라운드 변경 10만원, 우물천장 한쪽면 3.8m/5.6m 초과 시 10만원/20만원, 2인치 다운라이트 변경 개당 5,000원부터, 6구 스위치 변경 3만원, 실크도배 별도문의.',
    ],
  },

  '실링팬패키지.dc.html': {
    title: '실링팬 패키지 88만원 | 천장보강·단독배선 포함 | 프로어앤코',
    description: '실링팬 설치, 천장 보강, 단독배선, 다운라이트 8개, 우물천장 실크도배까지 포함한 88만원 패키지. 입주 후에도 시공 가능합니다.',
    h1: '실링팬 패키지',
    body: [
      '88만원. 베이직하게 많이 하는 군더더기 없는 구성으로 입주 후에도 시공할 수 있습니다.',
      '포함 항목: 실링팬(조명 겸용 또는 팬 단독 모델 중 선택), 실링팬 보강·설치 및 단독배선, 다운라이트 8개(주광·주백·전구 3가지 색 중 선택), 우물천장 실크도배.',
      '다운라이트는 팬 주변 밝기를 채우는 3인치 매입 조명입니다. 설치 후 전문 도배기술사가 우물천장 도배까지 마무리합니다.',
      '시공 전 확인: 매립등은 콘크리트 천장에 시공이 불가합니다. 우리집 천장이 석고보드인지 콘크리트인지 확인해주세요.',
      '추가 옵션: 2인치 다운라이트 변경 개당 5,000원부터, 커튼박스 추가 10만원부터, 커튼박스 ㄱ자 5만원, 커튼박스 5m/10m 초과 시 5만원/10만원, 4구 터치 스위치 10만원.',
    ],
  },

  '개별항목.dc.html': {
    title: '개별항목 단품 가격 | 우물천장·커튼조명·다운라이트·센서등·실링팬',
    description: '우물천장조명 55만원부터, 커튼박스 곳당 10만원, 다운라이트 개당 3만원, 욕실 센서등 8만원, 실링팬 설치 15만원. 항목별 정찰제 가격.',
    h1: '개별항목 · 필요한 것만 골라서',
    body: [
      '패키지 없이 필요한 항목만 골라 시공하실 수 있습니다. 모두 정찰제입니다.',
      '우물천장조명 55만원부터 — 무몰딩 직각 75만원, 무몰딩 라운드 85만원. 한쪽면 3.8m 초과 시 10만원, 5.6m 초과 시 20만원 추가. 우물조명 1줄 추가 20만원.',
      '커튼박스 무드등 곳당 10만원.',
      '다운라이트 — 확산형 3인치·2인치 개당 3만 5천원, COB 3인치·2인치 개당 3만 5천원, 호른 COB 3인치·2인치 개당 3만 5천원.',
      '센서등 — 욕실 센서등 곳당 8만원, 현관 신발장 센서 무드등 곳당 10만원.',
      '실링팬 — 시공비 포함 15만원(실링팬 설치 9만원, 천장 보강작업 6만원). 단독배선 5만원부터, 5m까지 5만원 이후 1m당 2만원.',
      '스위치 — 3채널 7만원, 4채널 10만원, 6채널 13만원.',
      '결제 금액 50만원 미만인 개별시공은 기본 출장비 5만원이 발생합니다.',
    ],
  },

  '색상안내.dc.html': {
    title: '조명 색온도 안내 | 전구색·전주백·주백색·주광색 | 프로어앤코',
    description: '전구색 3000K, 전주백색 3500K, 주백색 4000K, 주광색 6500K. 거실·주방·방·욕실별로 실제 시공 사진을 비교하며 빛의 색을 고르세요.',
    h1: '색상안내 · 빛의 색부터 정하세요',
    body: [
      '색온도가 낮을수록 노랗고 따뜻한 빛을, 높을수록 하얗고 시원한 빛을 냅니다. 간접 T5 조명은 빛의 색에 따라 공간 분위기가 크게 달라집니다.',
      '전구색 3000K — 아늑하고 분위기 있는 따뜻한 빛.',
      '전주백색 3500K — 노란색이 살짝 빠진 부드러운 빛.',
      '주백색 4000K — 밝으면서도 자연스러운 아이보리빛. 어디에나 무난해 가장 많이 선택합니다.',
      '주광색 6500K — 선명하고 깨끗해 집중하기 좋은 흰빛.',
      '우물 2줄 시공 시 각 라인의 색상을 서로 다르게 선택할 수 있습니다. 한 줄씩 켰을 때는 선택한 색 그대로, 두 줄을 함께 켰을 때는 두 빛이 자연스럽게 어우러집니다.',
      '거실, 주방, 방·복도, 욕실·현관별로 실제 시공 사진을 색온도별로 비교하실 수 있습니다.',
    ],
  },

  '상세견적.dc.html': {
    title: '셀프견적 | 수량·색상 선택하면 실시간 합산 | 프로어앤코',
    description: '수량과 색상을 직접 선택하면 정찰제 기준으로 시공 금액이 실시간 합산됩니다. 시공금액 50만원 이상이면 출장비가 발생하지 않습니다.',
    h1: '셀프견적',
    body: [
      '수량과 색상을 직접 선택하시면 정찰제 기준으로 시공 금액이 실시간 합산됩니다.',
      '개별 시공보다 패키지로 진행하실 경우 더욱 합리적인 금액으로 이용하실 수 있습니다. 또한 시공금액 50만원 이상 진행 시 기본 출장비 5만원은 별도로 발생하지 않습니다.',
      '선택 가능 항목: 우물천장조명, 무몰딩 직각·라운드 우물천장, 우물천장조명 1줄 추가, 커튼박스, COB 다운라이트, 확산 다운라이트, 욕실 센서등, 신발장 센서등, 실링팬 설치 및 단독배선, 3·4·6채널 스위치, 도배.',
      '조명 색상은 전구색 3000K, 전주백색 3500K, 주백색 4000K, 주광색 6500K 중에 고르실 수 있습니다.',
      '셀프견적은 참고용이며 정확한 최종 금액은 실측 후 상담을 통해 확정됩니다.',
    ],
  },

  '시공사례.dc.html': {
    title: '시공사례 | 프로어앤코 조명 시공 포트폴리오',
    description: '우물천장, 간접조명, 커튼박스, 실링팬 실제 시공 사례를 지역·시공 항목별로 보실 수 있습니다.',
    h1: '시공사례',
    body: [
      '실제로 시공한 현장 사진을 항목별로 정리했습니다. 우물천장, 커튼조명, COB 간접등, 다운라이트, 실링팬, 센서등 시공 사례를 확인하실 수 있습니다.',
      '서울, 인천, 경기, 대구, 부산, 천안 등 전국에서 시공하고 있습니다.',
    ],
  },

  '시공후기.dc.html': {
    title: '시공후기 | 실제 고객 후기 127건 | 프로어앤코',
    description: '프로어앤코에서 조명 시공을 하신 고객님들이 직접 남긴 후기와 시공 사진입니다.',
    h1: '시공후기',
    body: [
      '실제 시공 고객님들이 남겨주신 후기입니다. 견적 투명성, 색온도 사전 비교, 시공 속도, 상담 응대에 대한 평가를 확인하실 수 있습니다.',
      '우물천장, 실링팬, COB 간접등, 커튼조명, 다운라이트, 센서등 등 항목별로 후기를 나눠 보실 수 있습니다.',
    ],
  },

  '고객센터.dc.html': {
    title: '고객센터 | 상담·A/S 문의 | 프로어앤코',
    description: '전화 010-9850-2293 또는 카카오톡으로 상담하세요. 시공 범위, 소요 시간, A/S, 결제 방법에 대한 자주 묻는 질문을 정리했습니다.',
    h1: '고객센터',
    body: [
      '전화 상담 010-9850-2293. 카카오톡 채널로도 문의하실 수 있습니다.',
      '자주 묻는 질문으로 시공 가능 지역, 소요 시간, 도배 필요 여부, 천장 구조 확인, A/S 범위, 결제 방법을 정리했습니다.',
      '시공 후 1년 무상 A/S가 제공됩니다.',
    ],
  },
};

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: '프로어앤코',
  alternateName: 'PROR.CO',
  url: SITE,
  telephone: '+82-10-9850-2293',
  description: '우물천장 조명, 간접조명, 실링팬 정찰제 시공',
  areaServed: 'KR',
};

/** <head>에 넣을 정적 메타 */
function headBlock(file, page) {
  const rows = [];
  const alias = CANONICAL_ALIAS[file];
  const canonical = SITE + (alias ?? '/' + enc(file));

  if (page) {
    rows.push('<meta name="description" content="' + esc(page.description) + '">');
    rows.push('<meta property="og:type" content="website">');
    rows.push('<meta property="og:site_name" content="프로어앤코">');
    rows.push('<meta property="og:title" content="' + esc(page.title) + '">');
    rows.push('<meta property="og:description" content="' + esc(page.description) + '">');
    rows.push('<meta property="og:url" content="' + esc(canonical) + '">');
    rows.push('<meta property="og:locale" content="ko_KR">');
    rows.push('<meta name="twitter:card" content="summary_large_image">');
  }
  if (NOINDEX.has(file)) {
    rows.push('<meta name="robots" content="noindex,follow">');
  } else {
    rows.push('<meta name="robots" content="index,follow,max-image-preview:large">');
    rows.push('<link rel="canonical" href="' + esc(canonical) + '">');
  }
  if (file === 'index.html') {
    rows.push('<script type="application/ld+json">' + JSON.stringify(ORG_JSONLD).replace(/</g, '\\u003c') + '</script>');
  }
  return rows;
}

/**
 * 크롤러가 받는 첫 응답에 들어가는 본문.
 * <noscript>에 담아 JS 없이도 제목·헤딩·핵심 내용을 읽을 수 있게 한다.
 */
function bodyBlock(file, page) {
  if (!page) return '';
  const parts = ['<h1>' + esc(page.h1) + '</h1>'];
  for (const p of page.body) parts.push('<p>' + esc(p) + '</p>');
  if (page.links) {
    parts.push('<nav><ul>' + page.links
      .map(([label, href]) => '<li><a href="/' + enc(href) + '">' + esc(label) + '</a></li>')
      .join('') + '</ul></nav>');
  }
  return '<noscript><div id="seo-static">' + parts.join('') + '</div></noscript>';
}

/**
 * 한 HTML 파일에 정적 SEO 마크업을 심는다. 이미 심어져 있으면 건너뛴다.
 * @returns {{html:string, changed:boolean}}
 */
export function injectSeo(html, file, verificationToken) {
  if (html.includes('data-seo-injected')) return { html, changed: false };

  const page = PAGES[file];
  const rows = ['<meta name="seo-static" content="1" data-seo-injected>'];
  if (verificationToken && !html.includes('aeolo-site-verification')) {
    rows.push('<meta name="aeolo-site-verification" content="' + esc(verificationToken) + '">');
  }
  rows.push(...headBlock(file, page));

  let out = html;

  // 제목: 기존 <title>이 없거나 비어 있으면 넣는다
  if (page) {
    if (/<title>\s*<\/title>/i.test(out)) {
      out = out.replace(/<title>\s*<\/title>/i, '<title>' + esc(page.title) + '</title>');
    } else if (!/<title>/i.test(out)) {
      rows.unshift('<title>' + esc(page.title) + '</title>');
    }
  }

  const headMatch = out.match(/<head[^>]*>/i);
  if (headMatch) {
    const at = headMatch.index + headMatch[0].length;
    out = out.slice(0, at) + '\n' + rows.join('\n') + out.slice(at);
  } else {
    out = rows.join('\n') + '\n' + out;
  }

  const body = bodyBlock(file, page);
  if (body) {
    const bodyMatch = out.match(/<body[^>]*>/i);
    if (bodyMatch) {
      const at = bodyMatch.index + bodyMatch[0].length;
      out = out.slice(0, at) + '\n' + body + out.slice(at);
    }
  }

  return { html: out, changed: true };
}

/** sitemap에 넣을 사이트 페이지 URL (noindex·중복 경로 제외) */
export function indexableUrls() {
  const urls = [SITE + '/'];
  for (const file of Object.keys(PAGES)) {
    if (file === 'index.html' || NOINDEX.has(file) || CANONICAL_ALIAS[file]) continue;
    urls.push(SITE + '/' + enc(file));
  }
  return urls;
}
