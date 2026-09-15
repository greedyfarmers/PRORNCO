repo: greedyfarmers/PRORNCO
branch: main

## Last sync
date: 2026-09-15T01:34:35Z

### Updated in this project
- 히어로 사진 18장을 2400px·품질 82%로 재인코딩 (장당 7MB → 150~230KB)
- 색상안내 비교컷 16장 압축 (2MB → 60~170KB)
- 시공후기 127건으로 확장, 제목·본문 중복 제거, 후기별 개별 사진 슬롯 분리
- 패키지 5개 페이지 하단 후기 구간을 ReviewStrip.dc.html 한 파일로 통합

## Screen map
| 화면 | 저장소 파일 |
|---|---|
| 메인 | PRORCO 홈페이지.dc.html |
| 시공패키지 개요 | 시공패키지.dc.html |
| 간접조명 패키지 | 간접조명패키지.dc.html |
| 우물천장 패키지 | 우물천장패키지.dc.html |
| 우물천장 + 실링팬 | 우물천장실링팬패키지.dc.html |
| 실링팬 패키지 | 실링팬패키지.dc.html |
| 개별항목 | 개별항목.dc.html |
| 색상안내 | 색상안내.dc.html |
| 셀프견적 | 상세견적.dc.html |
| 시공사례 | 시공사례.dc.html |
| 시공후기 | 시공후기.dc.html |
| 고객센터 | 고객센터.dc.html |
| 후기 구간 (공용) | ReviewStrip.dc.html |
| 공용 스크립트 | mobile-nav.js, image-slot.js, support.js, image-slots.state.json |
| 사진·영상·폰트 | assets/, assets/slots/, assets/fonts/ |

## 주의
- 저장소 루트와 assets/ 양쪽에 사진이 섞여 있습니다. 슬롯 사진의 정본은 assets/slots/ 이며, image-slots.state.json이 그 경로를 참조합니다.
- ReviewStrip.dc.html은 아직 저장소에 없습니다 (신규 파일).
