# 지시서: 프로어앤코(PRORNCO) 사이트에 Aeolo Content Feed 연결

> 이 문서는 코딩 에이전트(Claude Code 등)가 `greedyfarmers/PRORNCO` 레포 안에서 실행하기 위한 작업 지시서입니다.
> 사람(운영자)이 해야 하는 단계는 **[사람]** 으로 표시했습니다. 에이전트는 그 지점에서 멈추고 결과를 기다립니다.

## 사용법

레포를 연 Claude Code 세션에 다음을 붙여넣으세요:

```
이 레포의 AGENT-INSTRUCTIONS.md를 읽고 순서대로 실행해. 
[사람] 표시가 있는 단계에서는 멈추고 나에게 해야 할 일과 확인 방법을 알려준 뒤, 
내가 "완료"라고 하면 다음 단계로 넘어가. 비밀 키는 절대 파일이나 출력에 쓰지 마.
```

---

## 배경과 목적

- **목적**: Aeolo가 생성한 글을 `https://www.prornco.com/blog/<slug>`에서 사이트 자체 디자인으로 서버 렌더링(빌드 타임 생성)해 GEO 효과가 프로어앤코 도메인에 쌓이게 한다.
- **현 상태**: 레포는 디자인 핸드오프 번들(`.dc.html` + `support.js` 런타임)을 Vercel에 그대로 정적 배포 중. 빌드 단계, 블로그, sitemap, robots 없음. 기존 페이지는 클라이언트 렌더링이며 **이번 작업 범위 밖** — 수정하지 않는다.
- **접근**: 빌드 스크립트 하나를 추가해 배포 시 사이트를 `dist/`로 복사 → Aeolo 피드로 `/blog` 정적 페이지·sitemap·robots 생성 → 모든 HTML에 검증 메타 삽입. Vercel Output Directory를 `dist`로 설정.
- **참조 스펙**: https://aeolo.io/integrate/content-feed.md (피드 계약, 로케일, 캐시, 검증 규칙). 이 지시서와 충돌하면 스펙을 우선하되 이유를 보고할 것.

## 불변 조건 (모든 단계에서 지킬 것)

1. 기존 `.dc.html`, `index.html`, `support.js`, `assets/` 등 **기존 파일은 수정·삭제하지 않는다.** 검증 태그도 빌드 산출물(`dist/`)에만 삽입한다.
2. 피드 키(`atok_...`)는 Vercel 환경변수 `AEOLO_KEY`에만 존재한다. 파일, 커밋, 로그, 채팅 출력에 쓰지 않는다. 사용자가 채팅에 붙여넣으려 하면 Vercel에 직접 넣도록 안내한다.
3. 검증 토큰(`aeo-...`)은 비밀이 아닌 상수지만, 마찬가지로 환경변수 `AEOLO_VERIFICATION`으로 관리한다.
4. `dist/`는 커밋하지 않는다 (`.gitignore`에 추가).
5. 블로그 URL은 `/blog`. 바꾸려면 사용자 확인 후 `BLOG_PATH` 환경변수와 Aeolo 사이트 주소를 함께 바꾼다.

---

## 1단계. 파일 추가 및 로컬 검증

함께 제공된 `aeolo-integration/` 폴더의 파일을 레포 루트에 같은 경로로 배치한다:

```
package.json
scripts/build-blog.mjs
scripts/fixture.json
.github/workflows/daily-rebuild.yml
```

`.gitignore`가 없으면 생성하고 `dist/`, `node_modules/`를 추가한다.

fixture로 빌드해 동작을 확인한다:

```bash
AEOLO_FIXTURE=scripts/fixture.json AEOLO_VERIFICATION=aeo-TEST npm run build
```

**기대 결과 (모두 충족해야 다음 단계):**
- 로그에 `피드 아이템 5개 → 사이트에 게시 3개 (언어: ko)` 와 `검증 태그 삽입: N개 파일`
- `dist/blog/index.html`, `dist/blog/우물천장-조명-고르는-법/index.html`, `dist/sitemap.xml`, `dist/robots.txt` 존재
- `dist/index.html`과 `dist/시공후기.dc.html`에 `aeolo-site-verification` 1회
- `grep -c '&lt;p&gt;' dist/blog/우물천장-조명-고르는-법/index.html` → `0`
- `grep 'rel="canonical"' dist/blog/우물천장-조명-고르는-법/index.html` → `https://www.prornco.com/blog/우물천장-조명-고르는-법`
- hreflang은 `ko`만 (en 에디션은 사이트가 서빙하지 않으므로 제외)

키 없이도 실패하지 않는지 확인한다: `npm run build` → `AEOLO_KEY 없음 — 블로그 없이 사이트만 빌드합니다` 출력 후 정상 종료.

커밋·푸시:

```bash
git add package.json scripts .github .gitignore
git commit -m "Add Aeolo content feed build step (static /blog, sitemap, verification tag)"
git push
```

---

## 2단계. [사람] Aeolo에 사이트 추가 → 검증 토큰 획득

사용자에게 안내:

1. Aeolo 대시보드 → **Sites** → 브랜드 선택 → **Add custom site**
2. 주소에 정확히 **`https://www.prornco.com/blog`** 입력
3. 표시되는 verification tag의 `content="aeo-..."` 값을 복사
4. **Verify는 아직 누르지 않는다** (태그가 배포된 뒤 4단계에서 누름)

에이전트는 사용자로부터 `aeo-...` 값을 받는다 (이 값은 채팅에 있어도 된다).

---

## 3단계. [사람] Vercel 설정 + 1차 배포 (검증 태그)

사용자에게 안내 (Vercel 대시보드 → PRORNCO 프로젝트 → Settings):

**Build & Development Settings**

| 항목 | 값 |
|---|---|
| Framework Preset | Other |
| Build Command | `npm run build` (Override ON) |
| Output Directory | `dist` (Override ON) |
| Node.js Version | 20.x 이상 (Settings → General) |

**Environment Variables** → Add:

| Key | Value | Environments |
|---|---|---|
| `AEOLO_VERIFICATION` | 2단계의 `aeo-...` | Production, Preview |

**배포**: Deployments → 최신 배포 → ⋯ → **Redeploy** (환경변수 저장 **후**에 실행해야 함).

사용자가 "완료"라고 하면 에이전트가 검증:

```bash
for p in / /blog/ "/시공패키지.dc.html"; do printf '%s ' "$p"; curl -sL "https://www.prornco.com$p" | grep -c aeolo-site-verification; done
curl -sL -o /dev/null -w '%{http_code}\n' "https://www.prornco.com/시공패키지.dc.html"
curl -s https://www.prornco.com/robots.txt
```

**기대 결과**: `1 1 1`, `200`, robots에 `Sitemap: https://www.prornco.com/sitemap.xml`.
- 검증 태그가 `0`이면: 환경변수 저장 후 Redeploy 했는지 재확인.
- 기존 페이지가 404면: Output Directory 설정 오류. 빌드 로그에서 `dist/` 생성 여부 확인.
- 한글 경로 404면: Vercel의 유니코드 경로 처리 문제 → 에이전트가 `build-blog.mjs`의 슬러그 폴더명을 percent-encoding으로 바꾸고 재검증 (사용자에게 변경 내용 보고).

---

## 4단계. [사람] Verify → 키 발급 → 2차 배포

사용자에게 안내:

1. Aeolo → Sites → prornco.com → **Verify**
2. 성공 시 표시되는 **Feed Key(`atok_...`)를 즉시 복사** — 한 번만 표시됨
3. Vercel → Settings → Environment Variables → Add: `AEOLO_KEY` = 그 값, Production + Preview
4. Vercel → Deployments → **Redeploy**
5. Vercel 빌드 로그(Building 섹션)에서 `[aeolo] 피드 아이템 N개 → 사이트에 게시 M개` 줄을 찾아 N, M을 에이전트에게 알려줌 (키는 알려주지 않음)

- M = 0이면: Aeolo에 이 채널로 **published** 상태인 글이 없다는 뜻. 사용자에게 글 하나를 발행하도록 안내 후 Redeploy.
- Verify 실패(`no_tag`)이면: 3단계 검증으로 돌아감. Aeolo는 JS 없이 한 URL만 GET하므로 `curl`로 보이는 것이 기준.

---

## 5단계. [사람] 재배포 자동화

정적 사이트는 배포 시점에만 글을 가져오므로 두 겹으로 트리거를 건다.

**5-1. 즉시 반영 — Deploy Hook을 Aeolo webhook으로**
1. Vercel → Settings → Git → **Deploy Hooks** → 이름 `aeolo`, 브랜치 `main` → Create → URL 복사
2. Aeolo → Sites → prornco.com 연결 설정의 webhook/revalidate URL 칸에 붙여넣기
   (정확한 메뉴명 미확인. 해당 칸이 없으면 5-2만으로 운영 — 반영 지연 최대 24시간)

**5-2. 안전망 — 일일 재배포**
1. GitHub → PRORNCO → Settings → Secrets and variables → Actions → New repository secret
2. Name `VERCEL_DEPLOY_HOOK`, Secret = 5-1의 URL
3. Actions 탭 → `daily-rebuild` → Run workflow → 초록 체크 확인, Vercel에 새 배포 생성 확인

에이전트는 워크플로 파일이 `main`에 있는지, cron이 `0 18 * * *`(03:00 KST)인지 확인한다.

---

## 6단계. 발행된 글 최종 검증 (에이전트 실행)

사용자에게 발행된 글 하나의 URL을 요청한 뒤 실행. `SLUG`는 URL의 마지막 경로 (한글 그대로).

```bash
SLUG="<사용자가 준 슬러그>"
URL="https://www.prornco.com/blog/$SLUG"
curl -sL "$URL" | grep -c "<h1"                                    # ≥1: 본문 서버 렌더링
curl -sL "$URL" | grep -c "&lt;p&gt;"                              # 0: escaped HTML 없음
curl -sL "$URL" | grep -o 'rel="canonical"[^>]*'                   # 우리 도메인, 파라미터 없음
curl -sL "$URL" | grep -o '<html[^>]*lang="[^"]*"'                 # lang="ko"
curl -sL "$URL" | grep -oE 'hreflang="[^"]+" href="[^"]+"'         # 각 href를 curl -L로 열어 200 확인
curl -sL "$URL" | grep -c 'application/ld+json'                    # 1
curl -s https://www.prornco.com/sitemap.xml | grep -c "$SLUG"      # ≥1
curl -s https://www.prornco.com/sitemap.xml | grep -o '<lastmod>[^<]*' | head -3   # 날짜 존재
curl -s https://www.prornco.com/blog/ | grep -o 'href="/blog/[^"]*"' | sort | uniq -d   # 빈 출력: 중복 없음
```

이어서 브라우저 확인을 사용자에게 요청: `/blog/`에서 카드가 사이트 톤(네이비 제목, 파란 배지, Pretendard)으로 보이고, 글 하단에 셀프견적/카톡 버튼이 있는지.

**남은 단계 보고서** 작성: 위 항목 중 실패한 것, 사용자 확인이 필요한 것, 그리고 다음을 반드시 포함:
- Google Search Console에 `https://www.prornco.com/sitemap.xml` 제출 (권장)
- 검색 노출은 며칠~몇 주 소요되며 통합 불량이 아님
- 헤더 네비게이션에 블로그 링크를 노출할지는 기존 페이지 수정이 필요하므로 별도 결정 사항

---

## 알려진 가정 (실제 환경에서 확인될 때까지 단정하지 말 것)

1. Vercel Framework "Other" + Output Directory `dist` 조합으로 기존 페이지가 그대로 서빙된다.
2. Vercel이 한글 폴더명 경로를 디코딩된 요청과 매칭한다 (3단계에서 확인, 실패 시 대응 절차 명시됨).
3. Aeolo 대시보드의 webhook 등록 위치.
4. 피드 필드 구조는 스펙 문서 기준이며 fixture로만 테스트됨. 실제 글 렌더링이 이상하면 빌드 로그의 `[aeolo]` 줄과 해당 아이템의 `_geo` 필드를 확인.
5. 스크립트의 목록 페이지 문구("조명 시공, 알고 하면 다릅니다" 등)와 헤더 메뉴명("조명 가이드")은 임의 초안이다. 사용자에게 확인받고 필요 시 `listPage`/`head` 함수에서 수정.
