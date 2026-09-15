# 배치 방법

압축을 풀어 아래 경로로 저장소 루트에 올리세요. 기존 파일은 덮어쓰지 않습니다 (모두 새 파일).

| 이 폴더의 파일 | 저장소 경로 |
|---|---|
| package.json | package.json |
| scripts/build-blog.mjs | scripts/build-blog.mjs |
| scripts/render.mjs | scripts/render.mjs |
| scripts/fixture.json | scripts/fixture.json |
| github-workflows/daily-rebuild.yml | .github/workflows/daily-rebuild.yml |
| gitignore.txt | .gitignore (내용 추가 또는 신규 생성) |

`.gitignore` 내용:

```
dist/
node_modules/
```

## 커밋

```
git add package.json scripts .github .gitignore
git commit -m "Add Aeolo content feed build step (static /blog, sitemap, verification tag)"
git push
```

## 로컬에서 직접 확인하려면 (선택)

```
AEOLO_FIXTURE=scripts/fixture.json AEOLO_VERIFICATION=aeo-TEST npm run build
```

기대 로그: `피드 아이템 5개 → 사이트에 게시 3개 (언어: ko)`, `검증 태그 삽입: N개 파일`

키 없이 실행: `npm run build` → `AEOLO_KEY 없음 — 블로그 없이 사이트만 빌드합니다` 후 정상 종료.
