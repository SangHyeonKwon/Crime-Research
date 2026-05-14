import { cn } from '@/lib/utils'

export function KrakenFlow() {
  return (
    <svg
      viewBox="0 0 540 540"
      className="h-full w-full"
      role="img"
      aria-label="M (MemeCore) 케이스 — TGE → 의심 팀 지갑 → 상장 2일 전 175M passthrough → Kraken 상장 당일 거대 hot wallet 입금까지 4단계 자금 흐름 다이어그램 (자체 Dune 인덱싱 결과)"
    >
      <defs>
        <marker
          id="kf-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" className="fill-ink-500" />
        </marker>
        <marker
          id="kf-arrow-dim"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" className="fill-ink-700" />
        </marker>
      </defs>

      {/* stage→stage arrows */}
      <g fill="none" strokeLinecap="round" strokeWidth="1.5">
        <line
          x1="220"
          y1="128"
          x2="220"
          y2="158"
          className="stroke-ink-500"
          markerEnd="url(#kf-arrow)"
        />
        <line
          x1="220"
          y1="246"
          x2="220"
          y2="276"
          className="stroke-ink-500"
          markerEnd="url(#kf-arrow)"
        />
        <line
          x1="220"
          y1="364"
          x2="220"
          y2="394"
          className="stroke-ink-500"
          markerEnd="url(#kf-arrow)"
        />
      </g>

      {/* arrow labels */}
      <text
        x="232"
        y="148"
        className="fill-ink-200 font-mono text-[10px] font-semibold"
      >
        211.6M / 9 tx · 2025-06-20 ~ 12-21
      </text>
      <text
        x="232"
        y="266"
        className="fill-ink-200 font-mono text-[10px] font-semibold"
      >
        175M / 1 tx · 2025-07-01 (상장 2일 전)
      </text>
      <text
        x="232"
        y="384"
        className="fill-ink-200 font-mono text-[10px] font-semibold"
      >
        15.72M / 1 tx · 2025-07-03 07:20 (상장 당일)
      </text>

      <FlowStage
        x={20}
        y={50}
        no="01"
        title="TGE / 초기 분배"
        sub="공급의 약 21% 이 단일 의심 지갑에 집중 (ZachXBT 분류 'Genesis')"
        confidence="alleged"
      />
      <FlowStage
        x={20}
        y={168}
        no="02"
        title="0x6f1f0a1...ba9 — 의심 팀 지갑"
        sub="TGE 211.6M 수령 → 약 95% 분산 → 현재 9.3M 잔여 (Q1 rank 4)"
        confidence="documented"
      />
      <FlowStage
        x={20}
        y={286}
        no="03"
        title="0x06ef...f0fc — 1-hop passthrough hub"
        sub="3일 만에 175M 단발성 전량 재송신 (4 tx 만 발생)"
        confidence="documented"
      />
      <FlowStage
        x={20}
        y={404}
        no="04"
        title="0xd544...ac8b — 거대 hot wallet 추정"
        sub="11개월간 1.15B M 처리 · 125만 transfer · Dune 라벨 미등록"
        confidence="alleged"
        highlight
      />

      {/* side note: split-off arrows from stage 2 to stage 4 (상장 당일 분산) */}
      <g fill="none" strokeLinecap="round" strokeWidth="1.2">
        <path
          d="M 420 207 C 500 207, 500 443, 420 443"
          className="stroke-ink-700"
          strokeDasharray="2 3"
          markerEnd="url(#kf-arrow-dim)"
        />
      </g>
      <text
        x="500"
        y="325"
        textAnchor="middle"
        transform="rotate(-90 500 325)"
        className="fill-ink-500 font-mono text-[9px] uppercase tracking-[0.25em]"
      >
        상장 당일 21M / 3 tx (병렬 분산)
      </text>
    </svg>
  )
}

type Confidence = 'documented' | 'mixed' | 'alleged'

interface FlowStageProps {
  x: number
  y: number
  no: string
  title: string
  sub: string
  confidence: Confidence
  highlight?: boolean
}

const confidenceLabel: Record<Confidence, string> = {
  documented: '자체 측정',
  mixed: '일부 자체 측정',
  alleged: '추정 / 분석',
}

function FlowStage({
  x,
  y,
  no,
  title,
  sub,
  confidence,
  highlight,
}: FlowStageProps) {
  const width = 400
  const height = 78

  const confColor = highlight
    ? 'fill-ink-700'
    : confidence === 'documented'
      ? 'fill-ink-200'
      : confidence === 'mixed'
        ? 'fill-ink-400'
        : 'fill-ink-600'

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        width={width}
        height={height}
        rx="4"
        className={cn(
          highlight
            ? 'fill-ink-100 stroke-ink-300'
            : 'fill-ink-800/60 stroke-ink-600',
        )}
        strokeWidth="1"
      />
      <text
        x="22"
        y="48"
        className={cn(
          'font-mono text-[20px] font-semibold tabular-nums',
          highlight ? 'fill-ink-700' : 'fill-ink-500',
        )}
      >
        {no}
      </text>
      <text
        x="64"
        y="32"
        className={cn(
          'font-mono text-[13px] font-semibold',
          highlight ? 'fill-ink-900' : 'fill-ink-100',
        )}
      >
        {title}
      </text>
      <text
        x="64"
        y="50"
        className={cn(
          'font-mono text-[10px]',
          highlight ? 'fill-ink-700' : 'fill-ink-400',
        )}
      >
        {sub}
      </text>
      <text
        x={width - 14}
        y="64"
        textAnchor="end"
        className={cn(
          'font-mono text-[8px] uppercase tracking-[0.2em]',
          confColor,
        )}
      >
        {confidenceLabel[confidence]}
      </text>
    </g>
  )
}
