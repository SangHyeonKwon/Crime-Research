# CLAUDE.md

이 파일은 Claude Code가 이 저장소에서 작업할 때 참고하는 가이드다.
이 문서를 위반하는 출력은 코드 리뷰에서 거절된다.

**프로젝트 한 줄 요약:** 크립토 시장의 manipulation 의심 케이스를 분석한 **교육 목적의 risk awareness 자료**. 트레이더가 비슷한 패턴을 식별할 수 있도록 돕는 것이 목적.

---

## 🚨 절대 규칙 (Hard Constraints)

**아래 규칙은 어떤 상황에서도 깨지 않는다. "사용자 요청이라" "더 효율적이라" 같은 이유는 정당화가 되지 않는다.**

### 사이트 정체성

1. **이 사이트는 "교육 자료"다.** "고발 사이트"도 "watch list"도 아니다. 모든 카피라이팅, UI, 디자인 결정은 이 정체성을 따른다.
   - ✅ "이런 패턴을 알면 손실을 피할 수 있습니다"
   - ✅ "구조적 위험 요소 분석"
   - ❌ "사기꾼들 명단"
   - ❌ "Wall of Shame"
   - ❌ "범인을 잡자"

2. **타깃 독자는 "트레이더 / 투자자"다.** 분노를 자극하지 않고, 패턴 인식 능력을 길러주는 톤을 유지한다.

### 법적/윤리적 가드레일

3. **단정 금지** — 특정 인물·팀·프로젝트를 "사기꾼", "범죄자", "manipulation 했다"라고 단정하는 문구를 생성하지 않는다.
   - ❌ "X 팀이 pump-and-dump를 했다"
   - ✅ "X 토큰에 대해 ZachXBT는 manipulation 의혹을 제기했다 (출처 링크)"
   - ✅ "공급의 95%가 소수 지갑에 집중된 것으로 분석되었다"
   - ✅ "차트상 +5,500% 상승 후 -95% 폭락이 발생했다"

4. **출처 필수** — 모든 주장은 1차 출처(ZachXBT 트윗, 거래소 공식 발표, 온체인 트랜잭션 해시, 보도 기사)를 명시한다. 출처 없는 주장은 게재하지 않는다.

5. **개인 식별정보(PII) 금지** — 실명, 여권, 주민번호, 거주지 같은 정보는 게재하지 않는다. 공개된 X/Twitter 핸들만 허용.

6. **법적 disclaimer 필수** — 모든 케이스 페이지 하단에 다음 면책 조항이 자동 삽입되어야 한다:
   > 본 페이지는 공개된 온체인 데이터와 보도 기사를 기반으로 한 교육 목적의 자료입니다. 특정 인물 또는 조직의 위법 행위를 단정하지 않으며, 모든 의혹은 제기된 그대로 인용합니다. 투자 자문이 아닙니다.

7. **검증 안 된 케이스 추가 금지** — 새 케이스를 추가하려면 최소 2개의 독립 출처가 필요하다.

### 기술 규칙

8. **API 키 하드코딩 금지** — `.env.local`에만 저장. 절대 커밋하지 않는다.

9. **`VITE_` prefix 환경변수 주의** — 클라이언트 번들에 노출되므로 민감 정보 넣지 않는다.

10. **외부 이미지 hotlink 금지** — TradingView/CoinGecko 스크린샷은 `src/assets/cases/`에 저장 후 출처 캡션 명시. 저작권 이슈 회피.

11. **실시간 가격 API 의존 금지** — 케이스는 *과거* 사건이므로 historical 스냅샷 이미지로 충분. 외부 데이터 API 호출 없음.

12. **빌드 깨뜨리는 변경 금지** — `pnpm build`가 통과하지 않는 커밋은 안 된다.

---

## 🏗️ 아키텍처

### 기술 스택

- **번들러:** Vite 5
- **프레임워크:** React 18
- **언어:** TypeScript (strict mode)
- **라우팅:** React Router 6 (SPA)
- **스타일:** Tailwind CSS 3 + shadcn/ui (Vite 버전)
- **콘텐츠:** MDX (`@mdx-js/rollup`)
- **frontmatter 파싱:** `gray-matter`
- **데이터 검증:** zod
- **차트:** **정적 이미지만 사용** — 인터랙티브 차트 라이브러리 추가 금지
- **배포:** Cloudflare Pages 또는 Vercel (정적 호스팅)
- **패키지 매니저:** pnpm
- **노드 버전:** 20.x LTS

### 왜 이 스택인가

- **Vite + SPA:** 케이스 수가 수십 개 수준이라 SSR 불필요. SPA가 충분히 빠름.
- **정적 이미지만:** 라이브러리 의존성 최소화, 번들 사이즈 작게, 영구 보존 (외부 API 죽어도 사이트 유지).
- **MDX:** 케이스 작성을 마크다운으로 → 콘텐츠와 코드 분리.

### 폴더 구조

```
.
├── CLAUDE.md                    # 이 파일
├── README.md                    # 인간용 onboarding
├── .env.example
├── .env.local                   # gitignore
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── index.html
├── package.json
│
├── src/
│   ├── main.tsx                 # 진입점
│   ├── App.tsx                  # 라우터 정의
│   │
│   ├── routes/
│   │   ├── home.tsx             # 랜딩 (케이스 그리드)
│   │   ├── case-detail.tsx      # /cases/:slug
│   │   ├── timeline.tsx         # 시간순 뷰
│   │   ├── patterns.tsx         # 수법별 분류
│   │   ├── education.tsx        # 패턴 학습 가이드
│   │   └── about.tsx            # 사이트 목적, 방법론
│   │
│   ├── components/
│   │   ├── ui/                  # shadcn primitives (현재 비어있음)
│   │   ├── case-card.tsx        # 홈 그리드 카드
│   │   ├── case-hero.tsx        # /cases/:slug 상단 hero + stat strip
│   │   ├── case-image.tsx       # 정적 이미지 + 캡션 (lightbox 필요하면 zoomable-image 사용)
│   │   ├── case-timeline.tsx    # <Timeline> / <TimelineEvent date="...">
│   │   ├── chart-frame.tsx      # 차트/이미지/placeholder 슬롯 통일 wrapper (kind/caption/source/aspect)
│   │   ├── fund-flow.tsx        # 자금 흐름 SVG 다이어그램
│   │   ├── long-short-ratio.tsx # Long/Short Ratio SVG 라인차트
│   │   ├── supply-bars.tsx      # 공급 집중도 가로 막대 (HTML/CSS, props 데이터)
│   │   ├── pattern-badge.tsx    # 패턴 태그 chip
│   │   ├── zoomable-image.tsx   # 클릭 시 React Portal lightbox 확대 (ESC/backdrop close)
│   │   ├── disclaimer.tsx       # 법적 면책 (footer 자동 삽입)
│   │   └── layout.tsx           # 헤더(테마 토글 포함) + 푸터
│   │
│   ├── content/
│   │   └── cases/
│   │       ├── rave.mdx
│   │       ├── lab.mdx
│   │       ├── move.mdx
│   │       ├── gps-shell.mdx
│   │       ├── siren.mdx
│   │       └── b3.mdx
│   │
│   ├── lib/
│   │   ├── cases.ts             # import.meta.glob('../content/cases/*.mdx') + zod 검증 + getCase(slug)
│   │   ├── schema.ts            # zod 스키마
│   │   ├── types.ts             # frontmatter 타입 (z.infer)
│   │   ├── utils.ts             # cn() helper (clsx + tailwind-merge)
│   │   └── mdx-components.tsx   # MDX HTML 요소 (h2/h3/p/ul/table/blockquote/a/code 등) 사이트 톤 매핑
│   │
│   └── assets/
│       └── cases/
│           └── [slug]/          # 케이스별 이미지
│               ├── price-chart.png
│               ├── supply-distribution.png
│               └── flow-diagram.png
│
├── public/
│   ├── favicon.svg
│   └── og-image.png
│
└── scripts/
    └── new-case.ts              # 케이스 scaffolding CLI
```

### 데이터 흐름

```
*.mdx 파일 (frontmatter + body)
   ↓ Vite 빌드 타임
@mdx-js/rollup이 컴파일
   ↓
import.meta.glob('./content/cases/*.mdx', { eager: true })
   ↓
lib/cases.ts에서 zod로 frontmatter 검증
   ↓
React 컴포넌트에서 렌더
```

모든 케이스는 빌드 타임에 번들에 포함. 런타임 fetch 없음.

시각 컴포넌트(`SupplyBars`, `FundFlow` 등) 의 props 데이터는 MDX 파일 안에 `export const X = [...]` 형태로 인라인 거주. zod 검증 대상은 frontmatter 만이고, 인라인 데이터는 케이스 콘텐츠의 일부로 함께 관리.

---

## 🔧 빌드/테스트/배포

### 개발 환경

```bash
# 의존성 설치
pnpm install

# 환경변수 (현재는 빈 파일이어도 됨)
cp .env.example .env.local

# 개발 서버 (포트 5173)
pnpm dev

# 타입체크
pnpm typecheck

# 린트
pnpm lint

# 포맷
pnpm format

# 프로덕션 빌드 (커밋 전 필수)
pnpm build

# 빌드 결과 미리보기
pnpm preview
```

### 신규 케이스 추가

```bash
# 템플릿 생성
pnpm new-case --slug=memecore --title="MemeCore (M)"

# 생성되는 것:
# - src/content/cases/memecore.mdx (템플릿)
# - src/assets/cases/memecore/ (이미지 폴더)
```

### 케이스 데이터 검증

```bash
# 모든 MDX의 frontmatter가 스키마 통과하는지
pnpm validate-cases

# 외부 출처 링크 살아있는지
pnpm check-links
```

### 배포

- **Railway** (Nixpacks 빌더)
- `main` 푸시 → 자동 재배포
- Build: `pnpm install --frozen-lockfile && pnpm build` (`nixpacks.toml` 명시)
- Start: `pnpm start` → `serve -s dist` — SPA fallback 포함, Railway의 `PORT` env 자동 인식
- `dist/` 폴더가 배포 산출물
- Conductor 워크스페이스 환경에서는 `main` 이 부모 worktree 에 잡혀있어 이 workspace 에서 직접 체크아웃 불가. 푸시는 `git push origin <branch>:main` 으로 fast-forward.

### 테스트 정책

- **MVP:** Playwright로 핵심 라우트 스모크 테스트만
  - 홈에서 케이스 카드 클릭 → detail 페이지 정상 렌더
  - 각 케이스가 disclaimer 포함하는지
  - 깨진 이미지 없는지
- **유닛 테스트 (vitest):** zod 스키마 + 유틸 함수만

---

## 📚 도메인 컨텍스트

### 비즈니스 용어

| 용어 | 의미 |
|------|------|
| Case | 개별 manipulation 의심 사건. 1 case = 1 MDX 파일 |
| Token | 케이스 대상 암호화폐 (예: RAVE, LAB) |
| Pattern | 수법 카테고리 (아래 표 참고) |
| Source | 출처. ZachXBT 트윗, 거래소 발표, 보도 기사 |
| Allegation | 제기된 의혹. 단정 아닌 "누가 누구에게 무엇을 제기했는지" |
| Status | 증거 강도. `documented` / `alleged` / `pattern-match` |

### Status 정의 (중요)

- **`documented`** — 거래소가 공식 인정한 케이스 (예: GPS, SHELL, MOVE — 바이낸스가 마켓메이커 차단 발표)
- **`alleged`** — 신뢰할 만한 분석가가 폭로하고 거래소가 조사 시작한 케이스 (예: RAVE, LAB)
- **`pattern-match`** — 구조적 위험 요소만 일치하는 케이스. 폭로 없음 (예: MYX, COAI, RIVER)

`pattern-match` 케이스는 본문에 더 보수적인 표현 사용. "manipulation 의심"보다는 "manipulation에 취약한 구조적 조건을 가진 토큰"으로.

### 수법 분류 (Patterns)

frontmatter `patterns: []` 배열로 태깅:

- `direct-dump` — 마켓메이커가 일방적 매도 (GPS, SHELL, MOVE)
- `short-squeeze` — 숏 베이팅 후 강제청산 캐스케이드 (RAVE, SIREN)
- `supply-concentration` — 90%+ 공급이 소수 지갑 보유
- `cross-exchange-coordination` — 여러 거래소 분산 입금 후 펌프 (LAB)
- `derivatives-frenzy` — OI/펀딩비 비정상 (MYX)
- `delisting-pump` — perp delisting 이후 재펌프 (B3)
- `low-float` — 의도적 낮은 circulating supply (RIVER)
- `proxy-contract-risk` — 컨트랙트 admin 권한 미포기 (COAI)
- `alpha-no-spot` — 바이낸스 spot 미상장 + 알파/perp만 (RAVE, LAB)

### Case Frontmatter 스키마 (zod 검증)

```yaml
---
slug: rave
title: "RaveDAO (RAVE)"
tokenSymbol: "RAVE"
incidentDate: "2026-04-18"          # 사건 발생일 (ISO 8601)
publishedDate: "2026-04-20"         # 케이스 작성일
status: "alleged"                   # documented | alleged | pattern-match
severity: "high"                    # critical | high | medium | low
patterns:
  - short-squeeze
  - supply-concentration
  - alpha-no-spot
metrics:
  startPrice: 0.25                    # 펌프 시작 가격 (optional)
  peakPrice: 27.94
  bottomPrice: 0.50
  maxGain: 103.83                     # 비율 (103.83 = +10,383%)
  maxDrawdown: -0.95                  # 비율 (-0.95 = -95%)
  marketCapPeak: 6000000000
  marketCapEvaporated: 5700000000     # 피크 → 바닥 사이 증발한 시총
  pumpDurationDays: 9
  crashDurationHours: 24
  liquidationVolume24h: 44000000      # 24h 강제청산액 (USD)
exchanges:
  binanceSpot: false
  binanceAlpha: true
  binanceFutures: true
  others: [bitget, gate, kucoin]
allegations:
  - source: "ZachXBT"
    sourceUrl: "https://x.com/zachxbt/status/..."
    date: "2026-04-18"
    summary: "공급의 95%가 멀티시그 지갑에 집중되었으며 펌프 직전 Bitget으로 대량 입금"
  - source: "Bitget 공식"
    sourceUrl: "https://..."
    date: "2026-04-19"
    summary: "RAVE 거래 활동 조사 개시 발표"
images:
  - file: "price-chart.png"
    caption: "RAVE 가격 차트 (CoinGecko, 2026.04.08~04.20)"
    sourceUrl: "https://www.coingecko.com/..."
  - file: "supply-distribution.png"
    caption: "공급 집중도 — 상위 10 지갑이 98% 보유 (Etherscan)"
    sourceUrl: "https://..."
relatedCases: [lab, siren]
---
```

### Case 본문 구조 (MDX)

모든 케이스는 아래 7개 섹션을 가진다 (정보 없으면 생략):

1. **개요** — 1-2 문단 요약
2. **타임라인** — 날짜별 사건 순서
3. **공급 구조** — 토큰 분배, 지갑 집중도, vesting
4. **수법 분석** — 어떤 패턴인지, 어떻게 작동했는지
5. **데이터** — 가격 차트 이미지, 거래량/OI 스크린샷
6. **교훈** — 트레이더가 이 케이스에서 배울 수 있는 risk indicator
7. **출처** — 모든 인용 링크

### 7개 섹션을 어떤 컴포넌트로 렌더하나

| 섹션 | 도구 |
|------|------|
| 개요 | 평문 (h2 + p) + `blockquote` 큰 인용 |
| 타임라인 | `<Timeline><TimelineEvent date="...">` (수직 라인 + 점 마커) |
| 공급 구조 | markdown 표 (거래소 상장 여부) + `<ChartFrame><SupplyBars rows={...} asOf="..." /></ChartFrame>` |
| 수법 분석 | h3 + 평문 + `<ChartFrame kind="FUND FLOW" aspect="square"><FundFlow /></ChartFrame>` |
| 데이터 | `<ChartFrame>` 시리즈 — 캔들/스크린샷은 `<ZoomableImage src={import...} />`, 파생 metric 은 SVG 차트(`<LongShortRatio />` 등), 데이터 없음은 children 없이 placeholder |
| 교훈 | h3 (시그널 카테고리) + 불릿 리스트 |
| 출처 | 번호 리스트 + 외부 링크 |

표/리스트/인용 등 HTML 요소는 `src/lib/mdx-components.tsx` 매핑으로 사이트 톤으로 재스타일링. `@tailwindcss/typography` 의 `.prose` 클래스는 case detail 에서 안 씀 (매핑이 더 정확하고 일관됨).

### 차트 vs 이미지 정책

데이터 시각화 결정 트리:

1. **자체 SVG 컴포넌트** — 데이터가 정량적이고 재사용 가치가 있는 경우. 컬러 톤 일관성, 다크/라이트 자동 전환.
   - `<SupplyBars>` (공급 분포), `<FundFlow>` (자금 흐름), `<LongShortRatio>` (파생 metric)
   - 새 차트 추가 시 같은 패턴 따름 (`viewBox` + Tailwind `fill-ink-*` / `stroke-ink-*`)

2. **로컬 호스트 이미지** — 캔들 차트처럼 다중 패널/복잡 인디케이터가 필요한 경우. TradingView/Coinglass/Etherscan 캡처 → `src/assets/cases/<slug>/` 에 저장 → `<ZoomableImage>` 로 wrap (클릭 확대).
   - **외부 hotlink 절대 금지** (절대 규칙 10).
   - 캡션에 원 출처 명시.

3. **데이터 없음 / 작업 중** — `<ChartFrame kind="..." caption="..." source="..." />` (children 없이) — placeholder grid + "data pending" 표시. 본문 레이아웃을 미리 확정해두는 용도.

모든 경우 `<ChartFrame>` 으로 감싸 메타(kind / caption / source) 통일.

### "교훈" 섹션 가이드 (중요)

이게 사이트의 차별점이자 정체성. 단순 "무슨 일이 있었다" 기록이 아니라 **"다음에 비슷한 게 보이면 어떻게 식별할 수 있나"**를 제공.

예시:
> **이 케이스에서 배울 수 있는 위험 시그널:**
> - 바이낸스 spot 미상장 + 알파/perp 동시 상장 구조
> - 시총 vs 거래량 비율이 10:1 이상으로 비정상
> - 갑작스러운 OI 증가 (24시간 +100% 이상)
> - 상위 10개 지갑이 공급의 95%+ 보유
> - 가격 펌프 직전 대량 거래소 입금이 온체인에서 관찰됨

이 섹션은 **케이스마다 반드시 작성**한다. 생략 시 PR 거절.

---

## 🎨 코딩 컨벤션

### 네이밍

- **파일:** kebab-case (`case-card.tsx`)
- **컴포넌트:** PascalCase (`CaseCard`)
- **함수/변수:** camelCase
- **상수:** SCREAMING_SNAKE_CASE
- **타입:** PascalCase, prefix 없음 (`Case` ✅, `ICase` ❌)
- **케이스 슬러그:** kebab-case (`rave`, `gps-shell`)

### TypeScript

- `strict: true`
- `any` 금지 (불가피하면 `unknown` + 타입 가드)
- 외부 데이터(MDX frontmatter)는 zod로 파싱
- React 함수형 컴포넌트만 사용 (class 컴포넌트 X)

### React

- 함수형 + Hooks
- Props는 destructuring
- `useState`/`useEffect` 남발 금지. 파생 값은 변수로 계산.
- 한 라우트에서만 쓰는 컴포넌트는 같은 파일에 co-locate

### Vite + Asset 처리

- 케이스 이미지는 `import`로 가져옴 (Vite가 hash 처리):
  ```tsx
  import priceChart from '@/assets/cases/rave/price-chart.png'
  ```
- 또는 `import.meta.glob`으로 동적 로드:
  ```tsx
  const images = import.meta.glob('@/assets/cases/*/*.png', { eager: true })
  ```
- `public/` 폴더는 favicon, og-image 같이 *변환 안 할* 파일만

### Tailwind + 색 시스템

- utility class 직접 사용 (`@apply` 금지, `body` base 만 예외)
- 색상은 `ink` 팔레트만 (`tailwind.config.ts` 의 `theme.extend.colors`)
- `ink-50` ~ `ink-900` 는 CSS variable 기반 (`src/index.css` 에서 `html` / `html.dark` 에 미러 매핑)
- 컴포넌트는 **"다크-퍼스트 의미"** 로 작성:
  - `ink-900` = 가장 콘트라스트가 큰 표면 (다크에서 검정, 라이트에서 흰색)
  - `ink-50` = 가장 콘트라스트가 큰 텍스트 (다크에서 흰색, 라이트에서 검정)
  - 두 모드 모두 자동 전환 — `dark:` prefix 거의 안 씀
- 라이트 ↔ 다크 전환은 `<html>` 에 `dark` class 토글만으로 작동
- 헤더의 ☀/☽ 토글 + localStorage 영속, OS `prefers-color-scheme` fallback
- **기본 테마: 라이트** (저장된 선호 없고 OS도 라이트면 라이트, OS가 다크면 다크)
- 한국어 폰트: Pretendard (`index.html` 의 CDN)
- 디자인 톤: Bloomberg 느낌 — 강한 채도 (빨강/녹색/노랑) 자제, 회색 톤으로 데이터 표현

### 디자인 톤 (재강조)

- **차분하고 분석적이게.** 빨강/검정 대비 강한 색 피하기.
- 차트 폭락 표시도 회색 + 데이터 톤으로.
- 폰트는 가독성 최우선.
- 사이트 정체성: "Bloomberg 같은 분석 자료" 느낌이지 "TMZ" 느낌 아님.

### 커밋 규칙

[Conventional Commits](https://www.conventionalcommits.org/) 형식:

```
<type>(<scope>): <subject>
```

**Type:**
- `feat`: 신규 기능
- `fix`: 버그 수정
- `case`: 신규 케이스 추가 또는 데이터 업데이트
- `docs`: 문서
- `style`: 포맷만
- `refactor`: 동작 무변화 리팩토링
- `chore`: 빌드/설정/의존성

**예시:**
```
case(rave): add ZachXBT bounty escalation timeline
feat(timeline): add date range filter
fix(case-card): correct max drawdown formatting
```

### PR 규칙

- 한 PR = 한 가지 변경
- 신규 케이스는 별도 PR
- 빌드 + 타입체크 + 린트 통과 필수
- 케이스 추가 PR 본문에 출처 링크 최소 2개 명시
- PR 본문에 "단정형 표현 검토 완료" 체크박스 포함

---

## 🤖 Claude Code 작업 시 참고

### 새 케이스를 추가할 때

1. **먼저 "절대 규칙" 1-7번 다시 읽기**
2. `pnpm new-case --slug=<slug>` 실행
3. frontmatter를 스키마대로 채움 (출처 2개 이상 필수)
4. 본문은 "케이스 본문 구조" 7개 섹션 따름
5. **"교훈" 섹션은 절대 생략하지 않음** (사이트의 차별점)
6. 이미지는 `src/assets/cases/<slug>/`에 저장
7. 단정형 문장 ("X가 사기다") 발견하면 즉시 의혹형으로 ("X는 ~ 의혹이 제기되었다")
8. `pnpm validate-cases` 통과 확인

### 새 기능 추가 시

1. 외부 API 호출이 필요한지 다시 고민 (정적으로 충분하지 않은가?)
2. 새 패키지가 정말 필요한지 검토 (번들 사이즈)
3. shadcn/ui에 이미 있는 컴포넌트인지 확인
4. 사이트 정체성("교육 자료, 분석적, 차분함")에 맞는지 검토

### 카피라이팅을 할 때

**금지 단어 (사이트 어디에도 사용 안 함):**
- "사기", "사기꾼", "범죄자", "도둑"
- "scam", "fraud", "criminal", "thief"
- "박살내자", "잡아내자", "처벌하자"
- 감정적 격앙 표현 일반

**선호 표현:**
- "구조적 위험", "패턴 분석", "사례 연구"
- "의혹이 제기되었다", "조사가 시작되었다"
- "투자자가 알아두어야 할 시그널"

**테이블 표기 — 색 이모지 자제:**
- `✅` 대신 `O` (텍스트)
- `❌` 는 유지 가능하나 채도가 거슬리면 `X` 텍스트로 통일도 OK
- 해당 없음은 `—` 또는 빈칸

### 모르겠으면

이 문서를 다시 참고하고, 그래도 모호하면 사용자에게 묻는다. 추측해서 코드 짜지 않는다.

---

## 📦 환경변수

```bash
# .env.example
VITE_SITE_URL=https://example.com
VITE_PLAUSIBLE_DOMAIN=example.com  # 분석 도구 (선택)
```

현재 MVP는 정적 사이트라 시크릿 없음.

---

## 🚦 운영 노트

- **저작권 문의 들어오면:** 해당 이미지 즉시 내리고 출처 캡션으로 대체
- **명예훼손 항의 들어오면:** 단정형 문장 있는지 즉시 검토, 의혹형으로 수정. 필요시 해당 케이스 일시 비공개.
- **사실관계 정정 요청:** 1차 출처 확인 후 수정, 페이지 하단에 "수정 이력" 명시
- **신규 폭로 발생:** 24-48시간 내 케이스 페이지 작성 (`status: alleged`로 시작, 거래소 인정되면 `documented`로 승격)

---

## 📋 초기 케이스 목록 (런칭 시 참고)

**Documented (거래소 공식 확인):**
- GPS / SHELL — Web3Port 마켓메이커 차단
- MOVE — 마켓메이커 6,600만 토큰 덤프

**Alleged (분석가 폭로 + 거래소 조사):**
- RAVE — ZachXBT 폭로, 95% 폭락
- LAB — ZachXBT 폭로, $10K 바운티
- SIREN — Short squeeze 패턴

**Pattern-match (구조적 위험만):**
- MYX, COAI, RIVER, PIPPIN, M (MemeCore) — ZachXBT watchlist
- B3 — Delisting 후 펌프 케이스

각 케이스에 대한 상세 사실 데이터는 별도 리서치 노트 참조.

---

_Last updated: 2026-05-12 — RAVE 케이스 완료 후 컴포넌트/배포/테마 시스템 반영_
