# Crime-Research

크립토 시장의 manipulation 의심 케이스를 분석한 **교육 목적의 risk awareness 자료**.
트레이더가 비슷한 패턴을 식별할 수 있도록 돕는 것이 목적입니다.

## 개발

```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm build        # 프로덕션 빌드 → dist/
pnpm typecheck    # 타입체크
pnpm start        # 프로덕션 빌드된 dist/ 를 serve 로 서빙 (PORT env 자동 인식)
```

## 배포 (Railway)

이 저장소는 Railway 에 그대로 배포 가능하도록 패키징되어 있습니다.

- 빌더: Nixpacks (`nixpacks.toml` 명시 — Node 20 + pnpm 9)
- 빌드: `pnpm install --frozen-lockfile` → `pnpm build`
- 시작: `pnpm start` (= `serve -s dist`, SPA fallback 포함)
- 포트: Railway가 주입하는 `PORT` env 를 `serve` 가 자동 사용

Railway 프로젝트 생성 후 이 저장소를 연결하면 추가 설정 없이 빌드/배포됩니다.
React Router 의 deep link (`/cases/rave` 같은) 도 `serve -s` 의 fallback 으로 정상 동작.

자세한 아키텍처/규칙은 [CLAUDE.md](./CLAUDE.md) 를 참조.
