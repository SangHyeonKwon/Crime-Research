---
name: caption-breakup
description: ChartFrame 의 긴 string caption 을 단계별 줄바꿈 JSX fragment 로 변환. 번호 매겨진 흐름 (① ② ③ ④ 또는 (1) (2) (3)) 또는 → 화살표 단계가 한 단락에 몰려 있을 때 호흡 개선용. 사용자가 "caption 호흡", "단계별 줄바꿈", "글 호흡" 같은 요청 시 발동.
---

# caption-breakup skill

ChartFrame 의 `caption` prop 이 string 으로 한 단락에 몰려 있어 호흡이 안 좋을 때 JSX fragment 로 변환.

## 변환 패턴

### Before (string)

```tsx
<ChartFrame
  caption="intro 문장. (1) 단계 → (2) 단계 → (3) 단계. 보충 설명."
/>
```

### After (JSX fragment)

```tsx
<ChartFrame
  caption={<>
    intro 문장.
    <br />
    <br />
    (1) 단계
    <br />
    → (2) 단계
    <br />
    → (3) 단계
    <br />
    <br />
    보충 설명.
  </>}
/>
```

## 변환 규칙

| 구분 | 처리 |
|------|------|
| 단계 사이 (① / (1) / → 시작) | `<br />` 한 줄 |
| 단락 / 의미 그룹 사이 | `<br />` 두 줄 (단락 spacing) |
| 첫 단계 직전의 intro 문 | intro 끝에 `<br /><br />` |
| 마지막 단계 직후의 마무리 문 | 마지막 단계 뒤 `<br /><br />` |

## 검출 패턴

caption 안에 다음 중 하나라도 있으면 변환 후보:
- `①` `②` `③` `④` `⑤` `⑥` `⑦` `⑧` `⑨` `⑩`
- `(1)` `(2)` `(3)` ... 단계 표기
- `→` 화살표가 2개 이상 (단계 흐름)
- 80자 이상의 단일 문장 caption (호흡 불량)

## 의존성

ChartFrame 컴포넌트 (`src/components/chart-frame.tsx`) 의 `caption` prop 타입이 `ReactNode` 여야 JSX 허용. 이미 적용됨 (2026-05-14, ARIA 케이스 작업 시 변경).

## 작업 순서

1. `Grep` 으로 `caption=` 패턴 찾기 (`src/content/cases/*.mdx`)
2. 각 caption 검출 패턴 검사
3. 매칭되면 JSX fragment 로 변환 (`Edit` 도구)
4. `pnpm build` 검증 (mdx 컴파일 오류 없는지)
5. commit + push

## 예외 케이스

- **인용문 안의 caption** — `>` 직접 인용에는 JSX 적용 안 함 (마크다운 인용 그대로 유지)
- **짧은 caption** (50자 미만, 한 문장) — 줄바꿈 불필요
- **단계 없는 단순 metadata** — 출처 / 시각 등만 있는 짧은 caption 은 그대로
