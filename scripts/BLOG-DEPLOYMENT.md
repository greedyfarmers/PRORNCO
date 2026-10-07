# 프로어앤코 블로그 배포 점검

현재 `npm run build`는 기존 사이트와 에이올로 글을 정적 HTML로 만들어 `dist/`에 저장합니다.
이 변경 이후에는 키 누락이나 피드 요청 오류가 발생하면 빌드를 실패시킵니다.
운영 설정이 빠져 있다면 머지만으로 블로그가 복구되지는 않습니다.

## 1. Vercel 프로젝트 관리자

실제 `www.prornco.com` 도메인이 연결된 `prornco` 프로젝트에서 확인합니다.

- Build Command: `npm run build`
- Output Directory: `dist`
- Production 환경변수 `AEOLO_KEY`: 에이올로에서 프로어앤코 사이트에 연결해 발급한 키
- `AEOLO_VERIFICATION`: 에이올로에서 제공받은 사이트 소유 확인 토큰
- Production에는 `AEOLO_FIXTURE`를 설정하지 않습니다. 이 값은 로컬 샘플 테스트 전용입니다.

키는 저장소나 PR 댓글에 올리지 말고 Vercel 환경변수로만 등록합니다.
설정한 뒤 새로 배포하고 Build Logs에서 다음을 확인합니다.

- `AEOLO_KEY가 없습니다`: 키 이름, 값, 적용 환경(Production)을 확인합니다.
- `피드 응답 400/401/403`: 에이올로 담당자에게 상태 코드를 전달해 키 유효성과 사이트 연결을 확인합니다.
- `피드 응답 5xx` 또는 네트워크 오류: 요청 실패 원인을 확인하고 재시도합니다.
- 성공 시 `피드 페이지 ... 수신`, `피드 아이템 ... → 사이트에 게시 ...`, `빌드 완료`가 표시됩니다.

정상 응답의 글이 0개면 빈 블로그 목록이 만들어집니다. 게시 예정 글이 있는데 0개라면
에이올로 담당자가 게시 상태와 키의 사이트 연결을 확인해야 합니다.

## 2. GitHub / Vercel 관리자: 자동 갱신

이 사이트는 빌드할 때 글을 가져오므로 새 글 게시 후 재배포가 필요합니다.
`.github/workflows/daily-rebuild.yml`은 Vercel Deploy Hook을 호출합니다.

1. Vercel `prornco` 프로젝트에서 `main` 브랜치용 Deploy Hook을 생성합니다.
2. **원본 저장소 `greedyfarmers/PRORNCO`**의 Actions repository secret에
   `VERCEL_DEPLOY_HOOK`이라는 이름으로 해당 URL을 저장합니다.
3. GitHub Actions의 `daily-rebuild`를 수동 실행해 훅 호출 성공을 확인합니다.
4. Vercel에서도 새 배포가 실제로 성공했는지 확인합니다. 훅의 HTTP 2xx는 배포 요청 접수만 의미합니다.

현재 예약은 UTC 18:00(한국시간 다음 날 03:00)이며 실행이 지연될 수 있습니다.
즉시 글을 반영해야 할 때는 `daily-rebuild`를 수동 실행합니다.
Deploy Hook URL도 비밀값이므로 코드나 PR 댓글에 넣지 않습니다.

## 3. 에이올로 담당자와 함께 완료 확인

- `https://www.prornco.com/blog/`에서 목록이 열리는지 확인합니다.
- 에이올로에 게시된 각 글의 실제 URL에서 HTTP 200과 해당 제목·본문을 확인합니다.
- 페이지 소스에 본문 HTML이 있고 canonical이 실제 글 주소와 일치하는지 확인합니다.
- `sitemap.xml`에 실제 게시 글 주소가 포함되는지 확인합니다.
- 새 글 게시 후 재배포했을 때 목록과 sitemap에 반영되는지 확인합니다.

상세 기준: https://aeolo.io/integrate/content-feed.md 의 Self-check 항목.
로컬 테스트 통과나 배포 성공만으로 운영 사이트 복구가 확인된 것은 아닙니다.

## 로컬 검증 (실제 키 불필요)

```sh
npm test
AEOLO_FIXTURE=scripts/fixture.json npm run build
```

샘플 콘텐츠는 운영에 배포하지 않습니다. 외부 포크의 Preview에는 운영 비밀값을 제공하지 말고,
코드 검토와 로컬 테스트 후 원본 저장소의 신뢰할 수 있는 배포에서 실제 연결을 검증합니다.
