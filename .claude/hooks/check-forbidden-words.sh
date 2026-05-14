#!/bin/bash
# git commit / git push 직전에 변경된 mdx 파일에서 단정형 / 금지 단어 검출
# CLAUDE.md 절대 규칙 3 (단정 금지) · 카피라이팅 금지 단어 자동 검증
# Exit 2 = blocking (Claude 에게 차단됐다고 전달)

set -uo pipefail

input=$(cat)
cmd=$(printf '%s' "$input" | python3 -c 'import sys, json; print(json.load(sys.stdin).get("tool_input", {}).get("command", ""))' 2>/dev/null || echo "")

# git commit 또는 git push 명령일 때만 동작
if [[ "$cmd" != *"git commit"* && "$cmd" != *"git push"* ]]; then
  exit 0
fi

# 검사할 mdx 파일 목록
# - commit: staged
# - push: 마지막 commit 의 변경분
if [[ "$cmd" == *"git commit"* ]]; then
  mdx_files=$(git diff --cached --name-only --diff-filter=ACM 2>/dev/null | grep '\.mdx$' || true)
else
  mdx_files=$(git diff HEAD~1..HEAD --name-only --diff-filter=ACM 2>/dev/null | grep '\.mdx$' || true)
fi

if [[ -z "$mdx_files" ]]; then
  exit 0
fi

# 금지 단어 (CLAUDE.md 카피라이팅 섹션)
# 한국어 "사기" 는 "사기성" 등 부분 매칭 제외, "사기꾼" / "사기다" / "사기였" 등은 검출
forbidden_pattern='사기꾼|사기였|사기다|사기[를을이가는]|범죄자|도둑[질]?|박살내|잡아내자|처벌하자|scam[^_a-z]|fraud[^_a-z]|criminal[^_a-z]|thief'

violations=""
for f in $mdx_files; do
  if [[ -f "$f" ]]; then
    matches=$(grep -niE "$forbidden_pattern" "$f" 2>/dev/null || true)
    if [[ -n "$matches" ]]; then
      violations+="
=== $f ===
$matches
"
    fi
  fi
done

if [[ -n "$violations" ]]; then
  cat >&2 <<EOF
❌ 단정형 / 금지 단어 검출 — CLAUDE.md 절대 규칙 3 위반 가능성

$violations

✏️ 의혹 표현으로 수정 후 다시 시도하세요:
  - "사기" → "manipulation 의혹"
  - "scam / fraud / criminal" → "alleged / 의혹"
  - "박살내자 / 잡아내자" → 분석적 톤으로

인용문 (>) 안의 출처 인용은 OK (1차 출처가 그렇게 표현한 경우).
의도된 인용이면 이 hook 을 우회하려면 .claude/settings.json 에서 임시 비활성화.
EOF
  exit 2
fi

exit 0
