---
name: pre-publish-check
description: 신규/수정 케이스 mdx push 직전 체크리스트. CLAUDE.md 절대 규칙 12개 자동 검증 + 교훈 섹션 확인 + 출처 2개+ 확인 + 빌드 통과 확인. 사용자가 "push 전 검토", "마지막 검토", "체크리스트" 같은 요청 시 발동.
---

# pre-publish-check skill

신규 또는 수정된 case mdx 를 push 하기 직전 자동 체크. hook 으로 잡히지 않는 가드레일까지 검증.

## 체크리스트

### 1. 자동 검증 (hooks 와 중복 OK — 더 엄격)

- [ ] **단정형 표현 없음** — `사기`, `사기꾼`, `scam`, `fraud`, `criminal`, `범죄자`, `도둑`, `박살내`, `잡아내자`, `처벌하자` (인용문 `>` 안 제외)
- [ ] **출처 sourceUrl 채워짐** — `allegations:` 의 각 항목 + 빈 `""` 없음 + `source:` 수 == `sourceUrl:` 수
- [ ] **외부 이미지 hotlink 없음** — `https://...png` 또는 `https://...jpg` 직접 임베드 없음 (모두 `src/assets/cases/<slug>/` 로컬)
- [ ] **API 키 / 시크릿 없음** — `VITE_` 또는 `.env` 내용 mdx 에 노출 안 됨

### 2. 콘텐츠 구조 (CLAUDE.md "Case 본문 구조" 7섹션)

- [ ] **개요** 섹션 존재
- [ ] **타임라인** `<Timeline>` 섹션 존재
- [ ] **공급 구조** 섹션 존재
- [ ] **수법 분석** 섹션 존재
- [ ] **데이터** 섹션 존재 (chart / metric)
- [ ] **교훈** 섹션 존재 — **생략 시 차단** (CLAUDE.md 사이트 차별점)
- [ ] **출처** 섹션 존재 (번호 리스트, 최소 2개)

### 3. frontmatter

- [ ] `slug` · `title` · `tokenSymbol` · `incidentDate` · `publishedDate` · `status` · `severity` · `patterns` · `allegations` 모두 채움
- [ ] `status` ∈ {`documented`, `alleged`, `pattern-match`}
- [ ] `severity` ∈ {`critical`, `high`, `medium`, `low`}
- [ ] `patterns` 배열의 각 항목이 정의된 패턴 9개 중 하나 (CLAUDE.md 도메인 컨텍스트)

### 4. 빌드 / 타입체크

```bash
pnpm typecheck   # TS strict mode 통과
pnpm build       # vite build 통과
```

### 5. 인용문 정직성

- [ ] `>` 직접 인용은 1차 출처가 *그렇게 표현한 경우* 만 사용
- [ ] paraphrase 는 인용문 형식 안 씀 (예: "EmberCN 에 따르면 …" 식 본문 처리)

### 6. cross-case 일관성

- [ ] `relatedCases` 의 다른 케이스 slug 가 실제 존재
- [ ] cross-token wallet 발견 (다른 케이스의 holder 와 동일 주소) 시 명시

## 실행 방법

```bash
# 수동 호출
.claude/skills/pre-publish-check/run.sh <slug>

# 또는 Claude 가 이 skill 발동 시 자동 점검
```

(현재는 체크리스트 + 수동 가이드. 자동화 스크립트는 후속.)

## 예외 / 우회

가드레일 차단을 *의도적으로* 우회해야 할 때 (예: 보도 기사의 인용 형식이 "scam" 단어 포함) 는:
1. 인용문 `>` 안에 두기 — hook 이 인용 형식 인식 못 해도 *문맥상 1차 출처 인용* 임을 명시
2. 또는 PR 본문에 "단정형 표현 검토 완료" 체크박스 + 해당 인용의 출처 링크
