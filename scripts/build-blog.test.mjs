import assert from 'node:assert/strict';
import { cp, mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const scripts = path.dirname(fileURLToPath(import.meta.url));

async function workspace(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'prornco-build-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, 'scripts'));
  for (const name of ['build-blog.mjs', 'render.mjs', 'seo.mjs', 'fixture.json']) {
    await cp(path.join(scripts, name), path.join(root, 'scripts', name));
  }
  await writeFile(path.join(root, 'index.html'), '<html><head></head><body>Home</body></html>');
  await mkdir(path.join(root, 'dist/blog'), { recursive: true });
  await writeFile(path.join(root, 'dist/blog/index.html'), 'previous build');
  return root;
}

async function build(root, { key = '', fixture = '', mock } = {}) {
  const args = [];
  if (mock) {
    await writeFile(path.join(root, 'scripts/mock-fetch.mjs'), mock);
    args.push('--import', path.join(root, 'scripts/mock-fetch.mjs'));
  }
  args.push('scripts/build-blog.mjs');
  // Do not inherit real credentials or NODE_OPTIONS from the developer's shell.
  return spawnSync(process.execPath, args, {
    cwd: root,
    env: { PATH: process.env.PATH, AEOLO_KEY: key, AEOLO_FIXTURE: fixture },
    encoding: 'utf8',
    timeout: 10000,
  });
}

for (const [name, options, message] of [
  ['missing key', {}, /AEOLO_KEY/],
  ['HTTP 401', { key: 'test-only', mock: 'globalThis.fetch = async () => ({ok:false,status:401,statusText:"Unauthorized"});' }, /401/],
  ['network failure', { key: 'test-only', mock: 'globalThis.fetch = async () => { throw new Error("test network failure"); };' }, /test network failure/],
  ['invalid JSON', { key: 'test-only', mock: 'globalThis.fetch = async () => ({ok:true,json:async () => {throw new Error("test invalid JSON");}});' }, /test invalid JSON/],
  ['later-page failure', { key: 'test-only', mock: 'let n=0; globalThis.fetch = async () => ++n === 1 ? {ok:true,json:async () => ({items:[],next_url:"https://api.aeolo.io/v1/connector/feed.json?page=2"})} : {ok:false,status:503,statusText:"Unavailable"};' }, /503/],
]) {
  test(`${name} fails the build and preserves previous output`, async (t) => {
    const root = await workspace(t);
    const result = await build(root, options);
    assert.equal(result.status, 1, result.stdout + result.stderr);
    assert.match(result.stderr, message);
    assert.equal(await readFile(path.join(root, 'dist/blog/index.html'), 'utf8'), 'previous build');
    assert.doesNotMatch(result.stdout, /빌드 완료/);
  });
}

test('a successful empty feed still creates the blog index', async (t) => {
  const root = await workspace(t);
  const result = await build(root, {
    key: 'test-only',
    mock: 'globalThis.fetch = async () => ({ok:true,json:async () => ({items:[]})});',
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(await readFile(path.join(root, 'dist/blog/index.html'), 'utf8'), /준비 중입니다/);
  assert.match(await readFile(path.join(root, 'dist/sitemap.xml'), 'utf8'), /https:\/\/www.prornco.com\/blog\//);
});

test('fixture builds need no key and produce Korean articles and sitemap entries', async (t) => {
  const root = await workspace(t);
  const result = await build(root, { fixture: 'scripts/fixture.json' });
  assert.equal(result.status, 0, result.stderr);
  const slug = '우물천장-조명-고르는-법';
  const html = await readFile(path.join(root, 'dist/blog', slug, 'index.html'), 'utf8');
  assert.match(html, /<html lang="ko"/);
  assert.ok(html.includes(`<link rel="canonical" href="https://www.prornco.com/blog/${slug}"`));
  assert.match(html, /<h2>천장 구조부터 확인합니다<\/h2>/);
  const sitemap = await readFile(path.join(root, 'dist/sitemap.xml'), 'utf8');
  assert.ok(decodeURI(sitemap).includes(slug));
});
