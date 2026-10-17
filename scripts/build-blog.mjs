#!/usr/bin/env node
// PRORNCO 빌드: 기존 정적 사이트를 dist/로 복사하고, Aeolo 피드로 /blog·sitemap·robots를 생성한다.
// 기존 파일은 읽기만 한다. 검증 태그도 dist/ 산출물에만 삽입한다.
//
//   npm run build                                   유효한 AEOLO_KEY 필수
//   AEOLO_FIXTURE=scripts/fixture.json npm run build  로컬 fixture로 검증
//
// 환경변수: AEOLO_KEY(비밀), AEOLO_VERIFICATION, AEOLO_FIXTURE, BLOG_PATH

import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SITE, BLOG_PATH, DEFAULT_LOCALE,
  selectForLocale, slugOf, listPage, postPage, sitemapXml, robotsTxt,
} from './render.mjs';
import { injectSeo, indexableUrls } from './seo.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const FEED = 'https://api.aeolo.io/v1/connector/feed.json';

// dist/로 복사하지 않을 항목
const SKIP = new Set([
  'dist', 'node_modules', 'scripts', '.git', '.github', '.vercel',
  'package.json', 'package-lock.json', '.gitignore',
  'AGENT-INSTRUCTION.md', 'github.md', 'uploads',
]);

const log = (...a) => console.log('[aeolo]', ...a);

async function copySite() {
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });
  const entries = await readdir(ROOT, { withFileTypes: true });
  for (const e of entries) {
    if (SKIP.has(e.name) || e.name.startsWith('.')) continue;
    await cp(path.join(ROOT, e.name), path.join(DIST, e.name), { recursive: true });
  }
}

async function fetchAllItems() {
  const fixture = process.env.AEOLO_FIXTURE;
  if (fixture) {
    const raw = await readFile(path.resolve(ROOT, fixture), 'utf8');
    const feed = JSON.parse(raw);
    log('fixture 사용:', fixture);
    return feed.items ?? [];
  }

  const key = process.env.AEOLO_KEY;
  if (!key?.trim()) {
    throw new Error('AEOLO_KEY가 없습니다. Vercel 프로젝트의 배포 환경에 사이트 연동 키를 설정한 뒤 다시 빌드하세요. 로컬 확인은 AEOLO_FIXTURE=scripts/fixture.json을 사용하세요.');
  }

  const base = SITE + BLOG_PATH;
  let url = FEED + '?base=' + encodeURIComponent(base);
  const items = [];
  let page = 0;
  // 한 응답은 최대 50건. next_url이 없어질 때까지 따라간다.
  while (url && page < 200) {
    const res = await fetch(url, { headers: { Authorization: 'Bearer ' + key } });
    if (!res.ok) {
      throw new Error('피드 응답 ' + res.status + ' ' + res.statusText + ' (키가 채널에 바인딩됐는지 확인하세요)');
    }
    const feed = await res.json();
    items.push(...(feed.items ?? []));
    url = feed.next_url || '';
    page++;
  }
  log('피드 페이지', page + '개 수신');
  return items;
}

async function walkHtml(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walkHtml(p, out);
    else if (/\.html?$/i.test(e.name)) out.push(p);
  }
  return out;
}

async function injectAll(token) {
  if (!token) log('AEOLO_VERIFICATION 없음 — 검증 태그는 넣지 않습니다');
  const files = await walkHtml(DIST);
  let n = 0;
  for (const f of files) {
    const rel = path.relative(DIST, f).split(path.sep).join('/');
    // 검색엔진 소유확인 파일(naverXXXX.html, googleXXXX.html)은 내용이 그대로여야 한다
    if (/^(naver|google)[0-9a-f]+.html$/.test(rel)) continue;
    // /blog 아래 산출물은 이미 정적 HTML이다 — 검증 태그만 필요하며 render.mjs가 메타를 짜다.
    const html = await readFile(f, 'utf8');
    const { html: next, changed } = injectSeo(html, rel, token);
    if (changed) { await writeFile(f, next, 'utf8'); n++; }
  }
  log('정적 SEO 마크업 삽입: ' + n + '/' + files.length + '개 파일');
  return n;
}

async function writeBlog(items) {
  const posts = selectForLocale(items, DEFAULT_LOCALE);
  log('피드 아이템 ' + items.length + '개 → 사이트에 게시 ' + posts.length + '개 (언어: ' + DEFAULT_LOCALE + ')');

  const blogDir = path.join(DIST, BLOG_PATH.replace(/^\//, ''));
  await mkdir(blogDir, { recursive: true });
  await writeFile(path.join(blogDir, 'index.html'), listPage(posts), 'utf8');

  const written = [];
  for (const item of posts) {
    // 한 건이 잘못돼도 나머지는 살린다.
    try {
      const slug = slugOf(item);
      if (!slug) throw new Error('_geo.slug 없음');
      const dir = path.join(blogDir, slug);
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, 'index.html'), postPage(item), 'utf8');
      written.push(item);
    } catch (err) {
      console.warn('[aeolo] 항목 건너뜀:', item?.id, err?.message ?? err);
    }
  }

  const sitePages = await listSitePages();
  await writeFile(path.join(DIST, 'sitemap.xml'), sitemapXml(written, sitePages), 'utf8');
  await writeFile(path.join(DIST, 'robots.txt'), robotsTxt(), 'utf8');
  log('sitemap 등재: ' + (written.length + sitePages.length) + '개 URL');
  return written.length;
}

async function listSitePages() {
  // noindex 파일과 중복 경로는 제외하고 정본 URL만 든다.
  return [...indexableUrls(), SITE + BLOG_PATH + '/'];
}

async function main() {
  const t0 = Date.now();
  // 피드를 모두 받은 뒤 산출물을 교체한다. 키/피드 오류는 최상위 catch에서
  // 빌드를 실패시켜 블로그가 빠진 배포가 기존 사이트를 덮지 못하게 한다.
  const items = await fetchAllItems();
  await copySite();
  log('사이트 파일 복사 완료 → dist/');
  await writeBlog(items);

  await injectAll(process.env.AEOLO_VERIFICATION);
  log('빌드 완료 (' + ((Date.now() - t0) / 1000).toFixed(1) + 's)');
}

main().catch((err) => {
  console.error('[aeolo] 빌드 실패:', err);
  process.exit(1);
});
