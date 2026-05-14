#!/bin/bash
# git push 직전에 신규/수정된 mdx 의 frontmatter sourceUrl 누락 검출
# CLAUDE.md 절대 규칙 4 (출처 필수) 자동 검증
# Exit 2 = blocking

set -uo pipefail

input=$(cat)
cmd=$(printf '%s' "$input" | python3 -c 'import sys, json; print(json.load(sys.stdin).get("tool_input", {}).get("command", ""))' 2>/dev/null || echo "")

# git push 일 때만 동작
if [[ "$cmd" != *"git push"* ]]; then
  exit 0
fi

# 마지막 commit 의 mdx 변경분
mdx_files=$(git diff HEAD~1..HEAD --name-only --diff-filter=ACM 2>/dev/null | grep 'src/content/cases/.*\.mdx$' || true)

if [[ -z "$mdx_files" ]]; then
  exit 0
fi

violations=""
for f in $mdx_files; do
  if [[ ! -f "$f" ]]; then continue; fi

  # frontmatter (--- 사이) 안의 sourceUrl 값 검사
  empty_urls=$(awk '/^---$/{c++; next} c==1' "$f" | grep -nE 'sourceUrl:\s*""' || true)

  # allegations 배열에서 sourceUrl 자체가 누락된 항목 (heuristic: source 만 있고 sourceUrl 없는 경우)
  # 간단 휴리스틱: source: 가 N 번이면 sourceUrl: 도 N 번이어야
  src_count=$(awk '/^---$/{c++; next} c==1' "$f" | grep -cE '^\s*-\s*source:' || true)
  url_count=$(awk '/^---$/{c++; next} c==1' "$f" | grep -cE '^\s*sourceUrl:' || true)

  msg=""
  if [[ -n "$empty_urls" ]]; then
    msg+="
  - 빈 sourceUrl:
$empty_urls"
  fi
  if [[ "$src_count" -ne "$url_count" ]]; then
    msg+="
  - source ($src_count) ≠ sourceUrl ($url_count) — 짝 안 맞음"
  fi

  if [[ -n "$msg" ]]; then
    violations+="
=== $f ===$msg
"
  fi
done

if [[ -n "$violations" ]]; then
  cat >&2 <<EOF
❌ 출처 누락 검출 — CLAUDE.md 절대 규칙 4 (출처 필수)
$violations

✏️ 모든 allegations 항목에 sourceUrl 채워주세요 (1차 출처 링크).
EOF
  exit 2
fi

exit 0
