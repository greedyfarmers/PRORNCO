# Handoff: 프로어앤코(PROR.CO) 조명 시공 홈페이지

## Overview
정찰제 조명 시공 업체 **프로어앤코**의 전체 웹사이트 디자인입니다. 핵심 컨셉은
**"눈으로 직접 확인하고, 스스로 견적까지 내보는 정찰제 시공 사이트"** — 상담원 설명 없이도
`셀프 체험 → 셀프 견적 → 카톡/전화 상담`으로 이어지는 구조입니다.

총 12개 화면(메인 + 11개 서브페이지)으로 구성되어 있습니다.

## About the Design Files
이 번들에 포함된 `.dc.html` 파일들은 **HTML로 만든 디자인 레퍼런스**입니다.
의도한 화면과 동작을 보여주는 프로토타입이며, 그대로 배포할 프로덕션 코드가 아닙니다.

작업 목표는 이 HTML 디자인을 **대상 코드베이스의 기존 환경에서 다시 구현**하는 것입니다
(React/Next.js, Vue, 기타 — 기존 패턴과 라이브러리를 따를 것).
아직 코드베이스가 없다면, 프로젝트에 가장 적합한 프레임워크를 선택해 구현하십시오.
사용자는 **Next.js + Node.js 컨테이너 호스팅(가비아)** 배포를 검토했습니다 —
Next.js App Router를 기본 권장안으로 삼으십시오.

파일 형식 주의: 각 `.dc.html`은 `<x-dc>` 템플릿 + `<script type="text/x-dc">` 로직 클래스로
이루어진 커스텀 런타임 포맷입니다. 마크업/스타일/데이터를 읽는 참조용으로만 쓰고,
런타임(`support.js`)은 이식하지 마십시오. 템플릿의 `{{ }}` 홀과 `<sc-for>` / `<sc-if>`는
각각 JSX 표현식과 `.map()` / 조건 렌더링으로 옮기면 1:1 대응됩니다.

## Fidelity
**High-fidelity (hifi)** — 최종 색상, 타이포그래피, 여백, 인터랙션이 모두 확정된 상태입니다.
UI를 픽셀 단위로 충실히 재현하되, 스타일링은 대상 코드베이스의 방식(Tailwind, CSS Modules,
styled-components 등)으로 옮기십시오. 모든 스타일은 현재 인라인으로 작성되어 있습니다.

사진은 모두 **드롭 플레이스홀더**(`<image-slot>`)입니다 — 실제 시공 사진으로 교체해야 합니다.
유일한 실제 이미지 자산은 메인 히어로의 조명 ON/OFF 합성 사진 4종입니다.

---

## Design Tokens

### Colors
| 토큰 | 값 | 용도 |
|---|---|---|
| `--bg` | `#FBFAF7` | 메인 페이지 배경 (웜 오프화이트) |
| `--bg` (서브) | `#FFFFFF` | 서브페이지 배경 |
| `--ink` | `#0F1420` (메인) / `#111111` (서브) | 본문 텍스트 |
| `--ink-soft` | `#6A7385` (메인) / `#6B6B6B` (서브) | 보조 텍스트 |
| `--line` | `#E8E6E0` (메인) / `#E9E9E9` (서브) | 보더 |
| `--card` | `#FFFFFF` | 카드 배경 |
| `--accent` | `#2F6FED` | 브랜드 블루 (링크, 배지, 강조) |
| CTA 블루 | `#2445E8` | 주요 버튼 배경 |
| 헤드라인 네이비 | `#1B2A66` | 대형 섹션 제목 |
| `--surface-dark` | `#0A0F1F` | 다크 패널·푸터·히어로 배경 |
| `--surface-dark-2` | `#141824` | 다크 패널 2단계 |
| 카카오 옐로우 | `#FFE94A` (하이라이트 `#FFF4A0`) | 카톡 상담 버튼 |
| 별점 골드 | `#F5B32E` | 후기 별점 |
| 회색 카드 | `#F4F6FA` | 비활성 가격 카드 |
| 연블루 배경 | `#F1F4FB` / `#EBF0FF` | 노트 박스, 활성 배지 |
| 사진 자리 | `#F2F4F7` | image-slot 배경 |

### Typography
- **본문/한글**: `Pretendard` (CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css`)
- **숫자/영문**: `Archivo` (Google Fonts, weights 400–900)
- **로고 워드마크**: `Archivo Expanded Black` — 로컬 파일 `assets/fonts/Archivo_Expanded-Black.ttf`, `@font-face` 이름 `ArchivoExpandedBlack`, weight 900
- font stack: `'Archivo','Pretendard',-apple-system,BlinkMacSystemFont,sans-serif`
- `-webkit-font-smoothing: antialiased`

| 역할 | 크기 / weight / letter-spacing |
|---|---|
| 히어로 H1 | 44px / 800 / -2px / line-height 1.15 |
| 섹션 대제목 | 30–32px / 800 / -1.2~-1.4px |
| 서브페이지 H1 | 30px / 800 / line-height 1.3 |
| 서브 섹션 H2 | 26px / 800 / line-height 1.35 |
| 카드 제목 | 17–22px / 800 / -0.4~-0.6px |
| 가격 (대) | 30–34px / 800 / -1.4~-1.6px |
| 본문 | 14–15px / 500 / line-height 1.75–1.85 |
| 보조 텍스트 | 12.5–13.5px / line-height 1.7 |
| 아이라벨 | 11–11.5px / 700 / letter-spacing 1–1.5px / `--accent` |
| 버튼 | 13.5–15px / 700–800 |

### Spacing & Radius
- 컨테이너: `max-width: 1160px` (서브) / `1240px` (메인), 좌우 padding 24–32px
- 섹션 상하 간격: 48–80px
- 메인 페이지: radius 20–28px (카드 20px, 패널·히어로 28px), pill `999px`
- 서브페이지: **radius 0 (직각)** — 1px 보더 기반. 예외: 플로팅 버튼, pill 배지
- 카드 내부 padding: 22–36px

### Shadows
- 카드: `0 2px 10px rgba(15,20,32,0.04)`
- 강조 카드: `0 10px 28px rgba(47,111,237,0.14)`
- 패널·히어로: `0 18px 44px rgba(15,20,32,0.10~0.14)`
- 플로팅 버튼: `0 14px 30px rgba(15,20,32,0.20)` → hover `0 20px 40px rgba(15,20,32,0.26)`
- 하단 상담바: `0 18px 44px rgba(15,20,32,0.16), 0 2px 6px rgba(15,20,32,0.06)`
- CTA 버튼: `0 12px 28px rgba(36,69,232,0.28)`

---

## Global Components (모든 페이지 공통)

### 1. Header (sticky, z-index 20–60)
- 높이: padding `18px 32px`, `border-bottom: 1px solid var(--line)`
- 배경: 메인 `rgba(251,250,247,0.85)` + `backdrop-filter: blur(14px)` / 서브 `#fff`
- 좌: **PROR.CO** 워드마크 21px / 900 / ArchivoExpandedBlack / -0.5px → 메인 홈 링크
- 중앙 GNB (gap 22px, 14px):
  - `시공패키지` (호버 드롭다운: 간접조명 / 우물천장 / 우물천장+실링팬 / 실링팬 패키지)
  - `개별항목` (호버 드롭다운: 우물천장조명 / 커튼조명 / 다운라이트·COB / 욕실·현관 센서등 / 실링팬)
  - `색상안내`, `셀프견적`, `시공사례`, `시공후기`, `고객센터`
  - 현재 페이지: `--accent` + weight 700
- 우: `전화상담 010-9850-2293`
- **드롭다운 스펙**: `position:absolute; top:28px; left:50%; translateX(-50%)`, min-width 190px,
  padding `12px 0`, radius 14px, 1px 보더, shadow `0 18px 40px rgba(15,20,32,0.12)`,
  `opacity/visibility` transition 0.18s, 항목 padding `9px 20px` / 13px, hover `--accent` + `rgba(47,111,237,0.06)`

### 2. Floating consult buttons (fixed, right 26px / bottom 110–130px, z-index 55)
세로 스택, gap 12px, 가운데 정렬.
- **전화상담**: 66px 원형, `radial-gradient(circle at 34% 26%, #2a3a63, #0E1526 72%)`, 흰 텍스트,
  1px `rgba(255,255,255,0.14)` 보더, 아이콘 📞 17px + 라벨 11.5px/800 2줄 구성
  → `<a href="tel:010-9850-2293">`
  - 링 펄스: `inset:-1px` 원형, `2px solid currentColor`, `ringPulse 2.4s ease-out infinite`
    (`0%: scale(1) opacity .55 → 70%: scale(1.5) opacity 0`)
- **카톡상담**: 동일 66px 원형, `radial-gradient(circle at 34% 26%, #FFF4A0, #FFE94A 70%)`,
  텍스트 `#2C2200`, 아이콘 💬
  → `<a href="http://pf.kakao.com/_xdBVxaX/chat" target="_blank" rel="noopener">`
- **맨 위로**: 44px 원형, 흰 배경 `rgba(255,255,255,0.92)`, 1px 보더, `↑`
- **부상 애니메이션 (두 버튼 동일 위상, 딜레이 없음)**:
  `floatY 3.4s ease-in-out infinite` — `0%,100%: translateY(0)` / `50%: translateY(-9px)`
- hover: `translateY(-4px) scale(1.05)`, transition 0.18s
- 720px 이하: 56px / 10.5px, right 12px, 링 펄스 숨김

### 3. Footer
- 배경 `--surface-dark`, 텍스트 `#B8B8B8`, padding `30px 0`
- 좌: PROR.CO 15px/900 ArchivoExpandedBlack (흰색) → 메인 홈 링크
- 우: `상호 프로어앤코 · 대표 김동준 · 사업자등록번호 241-10-02476`
- 메인 페이지 푸터에는 사업자 정보 줄 없음 (대표번호 블록만)

---

## Screens / Views

### 1. `PRORCO 홈페이지.dc.html` — 메인
목적: 조명 체험 → 정찰제 가격 확인 → 셀프견적 → 상담 전환

**섹션 순서**
1. **장식 코멧 오브** — `position:absolute; top:18px; right:60px`, 120px 원형
   radial-gradient + 220px 꼬리선(rotate 8deg), pointer-events none
2. **Header**
3. **히어로 — 조명 ON/OFF 체험** (핵심 차별 기능)
   - `aspect-ratio: 3501/1560`, margin `0 24px`, radius 28px, 배경 `#0A0F1F`
   - 이미지 4장 레이어(모두 `object-fit: cover; object-position: center 18%`, opacity 크로스페이드 0.5s):
     - `assets/hero-photo7.jpg` — 전체 ON (기본)
     - `assets/hero-cob-off.jpg` — COB OFF 상태
     - `assets/hero-curtain-only.jpg` — 커튼조명만 ON
     - 전체 OFF는 다크 마스크 오버레이로 처리
   - **스위치 패널**: `position:absolute; left:50%; bottom:104px; translateX(-50%)`,
     흰 반투명 `rgba(255,255,255,0.94)` + `blur(16px)`, radius 22px, padding 10px,
     shadow `0 18px 44px rgba(10,15,31,0.26)`
   - 스위치 항목: `우물조명 / 커튼조명 / COB조명 / 실링팬` + `일괄`
     - 행: `padding 14px 22px`, 15.5px/600, **배경 없음(transparent)**,
       ON 시 텍스트 `--ink`, OFF 시 `#8A93A6`
     - 토글: 40×24px pill, OFF `#DADADA` / ON `--accent`,
       노브 18px 흰 원 `translateX(0 → 16px)`, transition 0.2s
   - ⚠️ 하나의 style 문자열에 같은 CSS 속성이 두 번 나오면 안 됨 (기존 버그 이력)
4. **실시간 예약현황 티커** — 높이 68px, 배경 `--surface-dark`, radius 14px, margin `20px 24px 0`
   - 좌측 라벨: 8px 파란 점(`pulse 1.4s`) + `실시간 예약 현황` 14.5px/700, 우측 1px 구분선
   - 마퀴: `scrollLeft 30s linear infinite`, gap 48px, 항목 15px
     — `지역 / 항목 · 상태(파란색 700)` 형식, 데이터 2배 복제로 무한 루프
5. **정찰제 패키지 섹션**
   - 제목 44px/800/-2px `#1B2A66` "우리 집에 맞는 시공 패키지 찾기"
     + 서브 17px "10명 중 7명이 우물천장 패키지를 선택합니다"
   - **결제 방식 세그먼트 토글**: `일시불 결제` / `카드 할부 결제`,
     `#E6EAF3` 트랙 radius 18px padding 6px, 활성 흰 캡슐 radius 14px + shadow
     — 할부 선택 시 가격이 `총액 ÷ 12` 월 청구액으로 전환, 서브라인은 일시불 총액
   - 흰 컨테이너 radius 28px, padding `30px 30px 34px` 안에 4열 카드 그리드 gap 16px
   - **카드**: 기본 `#F4F6FA` + 투명 2px 보더 / **hover** 흰 배경 + `2px solid #2F6FED`
     + shadow `0 10px 28px rgba(47,111,237,0.14)`, radius 20px, padding 26px, `box-sizing:border-box`
     - 상단: 구성 배지(pill 10.5px) + 우측 할인율 배지(`정가 대비 %` + `OFF` 2줄)
     - 이름 19px/800/-0.6px
     - 불릿 리스트 12.8px `#4A5364` (`•` 마커) + 추천 문구(핑크 `#E0447C` 또는 블루)
     - 구분선 → 우측 정렬 가격 24px/800 + 취소선 정가 12px `#B3B9C6`
     - 하단 풀폭 CTA `background:#2445E8`, radius 14px, padding 16px, 14.5px/800
   - 하단 각주 12.8px, margin-top 44px
   - 패키지 4종: 간접조명(50→ 원) / 우물천장 / 우물천장+실링팬 / 실링팬
     — 각 카드는 해당 상세 페이지로 링크
6. **셀프견적 + 실시간 신청현황** (`1fr 1.15fr` 그리드)
   - 좌: 셀프견적 카드 — 3D 견적서 아이콘(`assets/icon-estimate-3d.jpg`, 100px,
     `mix-blend-mode: multiply`) + `SELF ESTIMATE` 아이라벨 + 설명 + pill CTA → 상세견적
   - 우: 다크 패널 — `실시간 신청현황` 19px + `(오늘 38건 신청중…)`,
     6행 롤링 리스트 `112px 1fr 62px 84px 68px` 그리드
     (항목 배지 / 지역·평형 / 마스킹 이름 / 날짜 / 접수완료)
   - **"이런 상황에도" 블루 패널**: 배경 `#1B3EF5`, radius 20px, padding `34px 32px`
     - pill 라벨(흰 반투명 보더) + 제목 26px/800/-0.5px + 서브
     - 좌측 무한 롤링 카드 3종 — `flex:0 0 300px`, `rgba(255,255,255,0.07)` 배경,
       `1px solid rgba(255,255,255,0.28)`, radius 14px, padding 24px
       (별점 ★★★★★ `#FFD84A` → 지역·고객명 → 질문형 제목 17px/800 → 후기 답변)
7. **조명 색상/디밍 데모** — 다크 패널, 전구색/전주백/주백색 탭 + 디밍 슬라이더,
   좌측 사진(높이 400px) / 우측 컨트롤, `0.9fr 1.1fr` 그리드 gap 70px
8. **실제 시공 고객님들의 솔직한 후기** — 3열 마퀴 컬럼(위/아래 교차 스크롤),
   `max-height 560px`, 상단 8칸 사진 그리드와 좌우 폭 정렬
9. **상담 4단계 프로세스** — `0.9fr 1.1fr`, 각 스텝 번호를 3D 글로시 구체로 표현:
   34px 원형 `radial-gradient(circle at 32% 28%, #a9c2ff, var(--accent) 55%, #1b3ea8 100%)`
   + `box-shadow: 0 0 16px rgba(47,111,237,0.55)`
10. **면허·보증 신뢰 섹션**
11. **Footer** (사업자 정보 줄 없음)
12. **하단 고정 상담바** (fixed, `bottom:22px`, 좌우 24px, z-index 60)
    - 캡슐형: 흰 배경, `border-radius: 999px`, padding `12px 16px 12px 24px`,
      `max-width:1180px`, 중앙 정렬, 깊은 shadow → 공중에 뜬 느낌
    - 구성: 좌측 카피 → spacer → 전화번호 21px/800 → 연락처 input(회색 pill)
      → 전송 버튼 → 즐겨찾기(회색 pill) → **카톡 상담 →** (`#2445E8`)
    - body에 `padding-bottom: 80px`로 푸터 가림 방지
    - 1180px 이하: 안내 문구·즐겨찾기 숨김 / 720px 이하: 2줄 wrap, radius 24px

**스크롤 리빌**: `[data-reveal]` 요소에 IntersectionObserver —
`opacity:0; transform:translateY(28px)` → 진입 시 `opacity:1; translateY(0)`, transition 0.7s ease

---

### 2. `시공패키지.dc.html` — 시공패키지 가격구성
- 헤더 아래 바로 가격구성 섹션 (히어로·퀵점프 없음)
- 제목 44px/800/-2px `#1B2A66` "시공패키지 가격구성" + 서브 17px
- 흰 컨테이너 radius 28px padding `30px 30px 34px` → 4열 카드 gap 16px
- **카드 구조** (radius 20px, `overflow:hidden`, 기본 `#F4F6FA` / hover 흰+파란 2px 보더):
  - 상단 블록 padding `24px 22px 22px`: 구성 배지 pill → 패키지명 15.5px/800(min-height 44px)
    → 가격 30px/800/-1.4px + 범위 12.5px → `자세히 보기` 버튼(hover 시 `#2445E8` 흰 글씨)
  - 구분선 아래 padding `20px 22px 24px`: 구성 항목 체크(`✓` `--accent`) 리스트
    + 추가상품(점선 구분선, 12.2px `#7A8497`)
- 하단 각주 margin-top 44px
- 카드 4장은 각각 간접조명 / 우물천장 / 우물천장+실링팬 / 실링팬 패키지 페이지로 연결

### 3–6. 패키지 상세 4종
`간접조명패키지` / `우물천장패키지` / `우물천장실링팬패키지` / `실링팬패키지`

공통 구조 (배경 `#F5F8FF`, `--ink:#0E1526`, `--line:#E3E9F7`):
- 브레드크럼 `홈 / 시공패키지 / <패키지명>` 12.5px
- **히어로**: `--surface-dark` radius 24px padding 56px, `1.1fr 0.9fr` 그리드 gap 48px
  - `PACKAGE` pill 라벨 → H1 30px/800 → 설명 14.5px/1.8 → 가격 34px/800
    → CTA 2개(pill: `--accent` / `rgba(255,255,255,0.08)`)
  - 우측 사진 자리 280px radius 16px
- **TYPE 카드 2종** (해당 시): 사진 210px + 배지/이름/설명/가격/구성 항목, radius 18px
- **ADD-ON 표**: 항목명 + 설명 + 우측 금액(`--accent` 800), 1px 보더 행 구분
- **GALLERY**: 4열 정사각 사진 자리 gap 14px radius 12px
- **추천/이점/체크 카드 3열**
- CTA 섹션 + Footer

가격 데이터:
| 패키지 | 가격 | 비고 |
|---|---|---|
| 간접조명 | 500,000원~ | 50패키지 등 |
| 우물천장 | 820,000 ~ 1,310,000원 | 한방 82~96만 / 목공 107~131만 |
| 우물천장+실링팬 | 1,240,000 ~ 1,690,000원 | +한방 124~138만 / +목공 145~169만 |
| 실링팬 | 880,000원 | 실링팬 35만 + 보강 8만 + 다운라이트 20만 + 도배 25만 |

### 7. `개별항목.dc.html` — 개별 시공 항목
탭 5종으로 항목 전환: `우물천장조명` / `커튼조명` / `다운라이트 · COB` / `욕실·현관 센서등` / `실링팬`
- 각 탭: 아이라벨 + H2 + 인트로 → variant 카드(사진 + 배지/이름/태그라인/설명/가격/스펙 4행)
  → 단품 가격표(항목 / 설명 / 금액 3열 그리드)
- **다운라이트 · COB 데이터** (실제 단가):
  - 확산형: 3인치 25,000원 / 2인치 30,000원 (주광·주백·전구), 2인치는 3인치 대비 1.5~1.7배 개수 필요
  - COB: 3인치 25,000원 / 2인치 30,000원
  - COB 호른: 3인치 30,000원 / 2인치 35,000원
  - 3채널 스위치 +70,000원 / 4구 터치 스위치 +90,000원
  - 개별시공 출장비 50,000원 (결제 50만원 미만)
- 사진 자리 배경은 `#F2F4F7` (문구 가독성 확보)

### 8. `색상안내.dc.html` — 조명 색상 안내
개별항목과 **동일한 디자인 체계**(흰 배경, 직각 카드, 1px 보더, 아이라벨+26px 제목).

섹션 순서 (DR조명과 다른 자체 흐름):
1. 인트로 + 앵커 탭 바 (고르는 법 / 3색변환 / 거실 / 주방 / 방·복도 / 욕실·현관 / 체크포인트 / FAQ)
2. **01 · COLOR TEMPERATURE — "색은 세 가지면 충분합니다"**
   - 색온도 그라데이션 바 8px: `linear-gradient(90deg, #E9A23B 0%, #F0D9A8 50%, #EEF1F6 100%)`
     + 3000K / 3500K / 4000K 라벨
   - "같은 조명, 세 가지 색" 3컷 비교 사진(4:3)
   - 색상 카드 3장: 스와치 원(전구색 `#F0A23C` / 전주백 `#F3DDAE` / 주백색 `#E8ECF2`)
     + 라벨 + 톤 설명 + 설명 + 추천 공간
   - "프로어앤코가 드리는 기준" 노트 박스 (`#F7F8FA` 배경)
3. **02 · DUAL LINE — "색을 하나만 고를 필요 없습니다"** (3색변환, 자체 차별점)
   - 인터랙티브 데모: `전구색` / `주광색` 두 스위치 → 4가지 상태 이미지 크로스페이드
     (둘 다 ON = 주백색 / 한 줄만 = 각 색 / 둘 다 OFF = 소등),
     사진 위 상태 라벨 배지 `rgba(10,10,10,0.78)`
   - 스펙 카드: 구성(한방 몰딩 +100,000 + 두 줄 시공 +100,000) / 한 줄 점등 / 두 줄 점등 /
     색상 조합 자유 → **+200,000원 / 우물 1곳**, CTA 2개
4. **03–06 공간별** (거실 / 주방 / 방·복도 / 욕실·현관)
   - 섹션 상단 색온도 탭 3개 → 섹션 내 모든 사진이 동시에 전환 (opacity 0.4s)
   - 항목별 `1.15fr 1fr` 사진 + 설명 레이아웃, 사진 위 활성 색온도 배지
5. **SAFETY NET — "지금 못 정해도 괜찮습니다"** 가격표
   (3색변환·디밍 COB 낱개 +50,000원 / 우물천장 두 줄 시공 +200,000원)
6. **CHECKPOINT 3장** (용도로 고르기 / 인테리어 톤 / 같은 공간 통일)
7. **FAQ 아코디언 5문항** (`+`/`−` 토글)
8. CTA + Footer

### 9. `상세견적.dc.html` — 셀프견적 (주문결제형)
- `1fr 320px` 2단 레이아웃
- **좌측**: 섹션 박스 패널들 (헤더 `#FAFBFD` 배경 + 15px/800 제목)
  - `조명 색상 선택` — 색온도 3택
  - 항목 그룹별 행: 120×84px 사진 자리(플레이스홀더 문구 "사진") + 항목명/단가
    + 수량 스테퍼(`−` / 숫자 / `＋`, 30px 원형 버튼) + 소계
    — 수량 ≥1이면 행 보더 `--accent`
  - `추가 시공 옵션` — 몰딩·도배·타일 등 별도 상담 항목 토글
- **우측 스티키 요약** (`top:90px`):
  - `최종 견적 금액` 패널 — 선택 항목 × 수량 + 금액 내역(max-height 240px 스크롤),
    조명 색상 행, `총 예상 금액` 26px/800 `--accent` (상단 `2px solid var(--ink)` 구분선)
  - 큰 CTA `카카오로 견적 상담`(`--accent`, padding 17px) + `전화로 상담하기`(보더)
  - 참고용 견적 안내 문구 박스
- 720px 이하에서 스티키 해제
- ⚠️ 이 페이지는 상담 CTA가 이미 있어 플로팅 버튼 위치 충돌 주의 (현재는 전화·카톡만 노출)

### 10. `시공사례.dc.html` — 포트폴리오
- 3단 필터: **평형별**(20/30/40/50평 이상) / **시공패키지**(4종) / **공간별**(거실·방·주방·식탁·욕실·기타)
  - 칩 스타일: padding `8px 16px`, 12.8px/600, 활성 `--accent` 배경 + 흰 글씨
- 결과 헤더: `전체 N건` + 표시 범위 `1–12 / 125` + `필터 초기화`
- **사례 카드 3열 그리드** gap 20px: 4:3 사진 자리 → 태그 칩(평형/패키지/공간,
  `rgba(47,111,237,0.08)` 배경 `--accent` 텍스트) → 제목 15.5px/800 → 설명 12.8px
  - **금액 표시 없음**
- **총 125건** 데이터 (지역 15종 × 평형 × 패키지 variant 조합으로 생성)
- **페이지네이션**: 12건/페이지, `‹ 이전` + 번호 버튼(최대 7개 윈도우) + `다음 ›`
  - 버튼: min-width 40px / height 40px, 활성 `--accent` 배경, 비활성 끝단 `#C7C7C7`
  - 필터 변경 시 1페이지로 리셋

### 11. `시공후기.dc.html` — 시공후기
- 평점 요약(평균 별점 + 건수 분포) → **후기 남기기 배너**(`#F5F7FB` 배경, 우측 CTA)
  → 필터 → 후기 카드 목록
- 후기 카드: 별점 + 지역·마스킹 이름 + 패키지 태그 + 본문 + 사진 자리

### 12. `고객센터.dc.html` — 고객센터
- **상담 채널 3열**: 전화상담(primary, `--accent` 버튼) / 카카오톡 상담 / 셀프견적
  - 전화 영업시간: **평일 09:00–17:30 (점심 12:30–13:30), 주말·공휴일 휴무**
- **상담~시공 4단계** 4열 카드 (STEP 01–04)
- **공지사항·이벤트** 목록 5건 — `80px 1fr 100px` 그리드
  (배지 `이벤트`=블루 톤 / `공지`=회색 + 제목 + 날짜)
- **FAQ**: 카테고리 탭(전체/견적/시공/A·S/결제) + 아코디언 9문항
- **사업자 정보** 2열 (`#F5F7FB` 배경) — 상호/대표/사업자등록번호/대표번호/영업시간
  (A/S 보증 항목은 제거됨)
- 쇼룸 안내 항목 없음

---

## Interactions & Behavior

| 인터랙션 | 스펙 |
|---|---|
| 히어로 조명 스위치 | 개별 토글 + 일괄 ON/OFF, 이미지 opacity 크로스페이드 0.5s ease |
| 티커 마퀴 | `scrollLeft 30s linear infinite`, 데이터 2배 복제 |
| 후기 마퀴 | 3열 상/하 교차 스크롤 |
| "이런 상황에도" 롤링 | 좌측 방향 무한 스크롤 |
| 결제 방식 토글 | 일시불 ↔ 카드 할부(총액÷12, 10원 단위 반올림), 각주 문구도 전환 |
| 가격 카드 hover | 배경 흰색 + 2px 파란 보더 + shadow, transition 0.2s |
| GNB 드롭다운 | hover 시 `opacity/visibility` 0.18s |
| 색온도 탭 | 섹션 내 모든 사진 동시 전환, opacity 0.4s ease |
| 3색변환 데모 | 두 스위치 조합 → 4상태 이미지 전환 |
| 디밍 슬라이더 | overlay opacity 실시간 조절 |
| 견적 스테퍼 | 수량 변경 → 소계·총액·요약 패널 실시간 갱신 |
| 사례 필터/페이징 | 필터 변경 시 page=1 리셋, 12건 단위 슬라이스 |
| FAQ 아코디언 | 단일 개방, `+` ↔ `−` |
| 스크롤 리빌 | IntersectionObserver, `translateY(28px)` → 0, 0.7s ease |
| 플로팅 버튼 | `floatY 3.4s` 부상(두 버튼 동일 위상) + 전화 버튼 `ringPulse 2.4s` |

## State Management
| 상태 | 위치 | 설명 |
|---|---|---|
| `switches` | 메인 | `{umul, curtain, cob, fan}` boolean — 히어로 조명 |
| `payMode` | 메인 | `'once' \| 'split'` — 정찰제 결제 방식 |
| `hoverPkg` / `hoverCat` | 메인 / 시공패키지 | 가격 카드 hover 인덱스 |
| `openGnb` | 전 페이지 | GNB 드롭다운 (CSS hover로 대체 가능) |
| `activeTab` | 개별항목 | 항목 탭 |
| `colorBySection` | 색상안내 | 섹션별 색온도 (`{living, kitchen, room, bath}`) |
| `dualWarm` / `dualCool` | 색상안내 | 3색변환 두 줄 ON/OFF |
| `openFaq` | 색상안내 / 고객센터 | 열린 FAQ 인덱스 (null 가능) |
| `quantities` / `color` / `addOns` | 상세견적 | 항목 수량, 색온도, 추가 옵션 |
| `size` / `pkg` / `space` / `page` | 시공사례 | 3단 필터 + 페이지 번호 |
| `faqTab` | 고객센터 | FAQ 카테고리 |

데이터 페칭 요구사항 (프로덕션):
- **실시간 예약현황 / 신청현황** — 운영진 수기 등록 전제(어드민 CMS 또는 구글시트 연동).
  현재는 목업 배열. 개인정보 마스킹 필수 (`인천 OO님` 수준)
- **시공사례 125건 / 후기 / 공지사항** — CMS 연동 대상
- **셀프견적** — 참고용 견적 + 최종은 상담 확정 방식 (자동 견적 확정 아님)

## Assets
`assets/` 폴더:
| 파일 | 용도 |
|---|---|
| `hero-photo7.jpg` | 히어로 전체 ON 사진 |
| `hero-cob-off.jpg` | COB 조명 OFF 상태 |
| `hero-curtain-only.jpg` | 커튼조명만 ON |
| `hero-blueprint.jpg` | 도면 이미지 (약 180KB로 압축됨) |
| `fan-crop3.png` | 실링팬 크롭 |
| `icon-estimate-3d.jpg` | 셀프견적 3D 아이콘 (`mix-blend-mode: multiply`로 배경 제거) |
| `fonts/Archivo_Expanded-Black.ttf` | PROR.CO 워드마크 전용 폰트 |

**사진 플레이스홀더**: 나머지 모든 이미지 영역은 `<image-slot>` 커스텀 엘리먼트(드래그&드롭 자리)입니다.
프로덕션에서는 `next/image` 등으로 교체하고, 각 슬롯의 `placeholder` 텍스트가
그 자리에 들어갈 사진 설명입니다 (예: "거실 우물조명 — 전주백 3500K").

색온도 비교 갤러리는 **같은 컷을 3가지 색온도로 미리 촬영**해 준비해야 합니다 —
이 기능의 완성도는 사진 퀄리티에 달려 있습니다.

## Responsive
- **1180px 이하**: 하단 상담바의 안내 문구·즐겨찾기 숨김
- **1024px 이하**: 4열 → 2열, 3열 → 2열, GNB gap·폰트 축소
- **720px 이하**: 모든 그리드 1열, 헤더/내비 wrap, 히어로 축소,
  스위치 패널 가로 배치 전환, 플로팅 버튼 56px + right 12px, 링 펄스 숨김,
  하단 상담바 2줄 wrap + radius 24px, H1 22px / H2 20px / H3 18px,
  상세견적 스티키 해제, 후기 3열 → 2열, 표 컬럼 축약
- 구현 시 주의: 현재 미디어쿼리는 `[style*="grid-template-columns: repeat(4"]` 같은
  속성 선택자에 의존합니다(런타임이 공백을 포함해 출력). 실제 코드베이스에서는
  Tailwind breakpoint나 컨테이너 쿼리로 정식 구현하십시오.

## 연락처 · 링크
- 대표번호: **010-9850-2293** → `tel:010-9850-2293`
- 카카오 채널: **`http://pf.kakao.com/_xdBVxaX/chat`** (새 창)
- 사업자: 상호 프로어앤코 / 대표 김동준 / 사업자등록번호 241-10-02476

## Files
| 파일 | 화면 |
|---|---|
| `PRORCO 홈페이지.dc.html` | 메인 |
| `시공패키지.dc.html` | 시공패키지 가격구성 |
| `간접조명패키지.dc.html` | 간접조명 패키지 상세 |
| `우물천장패키지.dc.html` | 우물천장 패키지 상세 |
| `우물천장실링팬패키지.dc.html` | 우물천장+실링팬 패키지 상세 |
| `실링팬패키지.dc.html` | 실링팬 패키지 상세 |
| `개별항목.dc.html` | 개별항목 (탭 5종) |
| `색상안내.dc.html` | 조명 색상 안내 + 3색변환 |
| `상세견적.dc.html` | 셀프견적 |
| `시공사례.dc.html` | 시공사례 125건 + 페이징 |
| `시공후기.dc.html` | 시공후기 |
| `고객센터.dc.html` | 고객센터 |
| `image-slot.js` | 사진 플레이스홀더 컴포넌트 (참조용) |
| `support.js` | DC 런타임 — **이식하지 마십시오** |
| `assets/` | 실제 이미지·폰트 자산 |

## 남은 작업 (프로덕션 전)
1. 실제 시공 사진 촬영·삽입 (특히 색온도별 3버전 세트)
2. 실시간 예약현황·후기·사례·공지 CMS 또는 어드민 연동
3. 카카오 채널 SDK/딥링크 검증, 전화 클릭 트래킹
4. SEO 메타·OG 태그, 사이트맵, 구조화 데이터
5. 시공사례 상세 페이지(개별 케이스 뷰) — 현재는 목록만 존재
