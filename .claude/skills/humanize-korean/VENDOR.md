# Vendored: humanize-korean

이 스킬 (`humanize-korean`) 과 함께 들어온 `.claude/agents/` 12개,
`.claude/commands/humanize.md` · `humanize-redo.md` 는 외부 오픈소스를
**수정 없이 그대로 vendoring** 한 것이다.

| 항목 | 값 |
|------|-----|
| 출처 | https://github.com/epoko77-ai/im-not-ai |
| 버전 | v2.0.0 (2026-05) |
| 통합일 | 2026-05-16 |
| 라이선스 | MIT (`./LICENSE` 참조, Copyright (c) 2026 epoko77-ai) |
| 수정 여부 | 없음 (원본 그대로 복사) |

## 용도

crime-research 케이스 mdx 의 한국어 본문이 AI 작성 톤 (번역투 · 기계적
병렬 · 영어 인용 과다 등) 일 때 사람이 쓴 톤으로 윤문. `new-case` 스킬의
6단계로 연계됨.

## 우리 프로젝트에서의 주의

mdx 는 순수 산문이 아니라 frontmatter + import + JSX + 표 혼재이므로
**본문 산문 단락만 발췌**해서 적용하고 frontmatter/JSX/표는 윤문 대상에서
제외한다. 윤문 후 수치 · 주소 · 출처 무변경을 반드시 재확인한다
(`pre-publish-check` 스킬 + `check-forbidden-words` hook 연계).

업스트림 업데이트 반영 시: 원본 repo 를 다시 clone 해 `.claude/skills/
humanize-korean/`, `.claude/agents/`, `.claude/commands/humanize*.md` 를
교체하고 이 파일의 버전 · 통합일을 갱신한다.
