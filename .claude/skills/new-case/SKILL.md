---
name: new-case
description: 신규 manipulation 의혹 케이스 추가 표준 워크플로우. Dune 인덱싱 → trace.md → mdx 작성 → SVG (필요 시) → ChartFrame caption JSX 호흡 → 빌드 → push 까지. 사용자가 "케이스 추가" / "X 토큰 분석" / "신규 케이스" 요청 시 자동 발동 권장.
---

# new-case skill

신규 케이스를 사이트에 추가할 때 반복되는 작업을 표준화한 시퀀스. ARIA / MemeCore / SIREN 케이스의 패턴 기반.

## 전제 조건

1. **최소 2개 이상의 독립 출처** (CLAUDE.md 절대 규칙 7) — ZachXBT / EmberCN 같은 분석가 트윗 + 보도 기사 + 거래소 공식 발표 등
2. **토큰 컨트랙트 주소 + 체인** — Dune 인덱싱 가능 여부 결정
3. **incident date** (사건 발생일, ISO 8601)
4. CLAUDE.md 절대 규칙 1-12 모두 적용

## 표준 시퀀스

### 1. Scaffolding

```bash
pnpm new-case --slug=<slug> --title="<Title>"
# 생성: src/content/cases/<slug>.mdx (템플릿) + src/assets/cases/<slug>/ 폴더
```

### 2. Dune 인덱싱 (컨트랙트가 메이저 EVM 체인일 때)

순서:
- **Q0 sanity check** — `transfers_<chain>.erc20` 으로 token_address 활동 (transfer 수 · wallet 수 · 첫/마지막 시각)
- **Q1 Top 50 holders** — 현재 분포 + Top 1/5/10/50 누적 비율
- **Q2 (필요 시) 거래소 출금 추적** — `cex.addresses` 라벨 join 으로 source/destination 식별
- **Q3 (필요 시) cluster dump pattern** — 의심 wallets 의 send/receive 시계열
- **Q4 (필요 시) destination 식별** — 매도분이 어디로 갔는지 (DEX pool · CEX hot wallet)

쿼리 결과는 `.context/sql/<slug>-trace.md` 에 저장. SIREN / MemeCore / ARIA trace.md 포맷 참고:
- 각 Q 별 Dune query 링크 + execution credits
- 결과 표 + 핵심 발견
- "최종 narrative — 자체 측정으로 검증된 사실" 표 (외부 분석가 주장 vs 우리 측정)
- 사용 크레딧 누계

### 3. mdx 본문 (CLAUDE.md "Case 본문 구조" 7개 섹션)

1. **개요** — 1-2 문단 요약
2. **타임라인** — `<Timeline><TimelineEvent date="...">` — UTC 시각 명시
3. **공급 구조** — 외부 분석가 주장 → 자체 검증 결과 (있으면). `<SupplyBars rows={...} asOf="..." />`
4. **수법 분석** — h3 + 평문 + 자체 SVG (예: `<KrakenFlow />`, `<AriaCluster />`)
5. **데이터** — 가격 차트 (TradingView 캡처 → 로컬 저장, `<ZoomableImage>`)
6. **교훈** — 트레이더 risk indicator (CLAUDE.md 차별점, **생략 금지**)
7. **출처** — 번호 리스트 + 외부 링크

### 4. SVG 컴포넌트 (자금 흐름 시각화 필요 시)

`src/components/<slug>-flow.tsx` 또는 `<slug>-cluster.tsx`. KrakenFlow / AriaCluster 패턴 (FlowStage 4 stages + arrows). viewBox 540×540 정사각형 권장.

### 5. ChartFrame caption JSX 호흡

긴 caption (단계 ① ② ③ ④ 또는 (1) (2) (3)) 은 `caption={<>...</>}` JSX fragment 로 작성:
- 각 단계마다 `<br />` 한 줄
- 단락 사이 `<br /><br />` 두 줄

예: ARIA `src/content/cases/aria.mdx` 의 FUND FLOW · 8 WALLET CLUSTER 참고.

### 6. 가드레일 자체 점검

- 단정형 표현 (`사기`, `scam`, `criminal`) → 의혹 표현 (`manipulation 의혹`, `alleged`)
- 모든 allegations 항목에 `sourceUrl` 채움
- 교훈 섹션 *생략 안 함*
- 외부 이미지 hotlink 없음 (모두 `src/assets/cases/<slug>/` 로컬)

### 7. 빌드 → push

```bash
pnpm build  # 통과 필수
git add src/content/cases/<slug>.mdx src/assets/cases/<slug>/ src/components/<slug>-*.tsx
git commit -m "case(<slug>): add <Title> with <key finding>"
git push origin <branch>:main  # Conductor 워크스페이스 fast-forward
```

커밋 메시지 prefix `case(<slug>):` 사용 (다른 케이스 commit 패턴 참고).

## 주의사항

- **Dune 크레딧** — Community plan 한도 내. Q0 sanity 가 의외로 비쌈 (60+ credits) 이라 처음부터 partition filter (`block_month`) 사용 권장.
- **Cross-token 발견** — Top holder 가 다른 케이스의 wallet 과 동일하면 명시 (SIREN/M/ARIA 의 `0x73d8…46db` 사례).
- **이미지** — TradingView 캔들은 1시간봉 (단기 폭락 narrative) 또는 일봉 (장기 누적 narrative). 거래소는 narrative-fit 으로 선택 (perp 폭락이면 메이저 perp venue).
- **legal disclaimer** — Layout footer 자동 삽입이라 mdx 안에 다시 적지 않음.
