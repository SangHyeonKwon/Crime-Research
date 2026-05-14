import { cn } from '@/lib/utils'

export function AriaCluster() {
  return (
    <svg
      viewBox="0 0 540 540"
      className="h-full w-full"
      role="img"
      aria-label="ARIA (AriaAI) 케이스 — Gate.io 1 hot wallet → 8 wallets cluster → 04-14 17:00 UTC 동시 매도 → PancakeSwap v3 ARIA pool 까지 4단계 자금 흐름 다이어그램 (EmberCN 트윗 데이터 자체 Dune 인덱싱 재현)"
    >
      <defs>
        <marker
          id="ac-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" className="fill-ink-500" />
        </marker>
      </defs>

      {/* stage→stage arrows */}
      <g fill="none" strokeLinecap="round" strokeWidth="1.5">
        <line
          x1="270"
          y1="118"
          x2="270"
          y2="148"
          className="stroke-ink-500"
          markerEnd="url(#ac-arrow)"
        />
        <line
          x1="270"
          y1="246"
          x2="270"
          y2="276"
          className="stroke-ink-500"
          markerEnd="url(#ac-arrow)"
        />
        <line
          x1="270"
          y1="374"
          x2="270"
          y2="404"
          className="stroke-ink-500"
          markerEnd="url(#ac-arrow)"
        />
      </g>

      {/* arrow labels */}
      <g>
        <text
          x="282"
          y="132"
          className="fill-ink-200 font-mono text-[8px] font-semibold"
        >
          A · 26.94M / 6 wallets · 03-23~24 (사전 셋업)
        </text>
        <text
          x="282"
          y="146"
          className="fill-ink-300 font-mono text-[8px]"
        >
          B · 18.70M / 2 wallets · 04-14 17:11 (just-in-time)
        </text>

        <text
          x="282"
          y="260"
          className="fill-ink-200 font-mono text-[8px] font-semibold"
        >
          4,825+ swap · 04-14 16:55~17:55 UTC
        </text>
        <text
          x="282"
          y="274"
          className="fill-ink-300 font-mono text-[8px]"
        >
          한국시간 04-15 새벽 02시
        </text>

        <text
          x="282"
          y="388"
          className="fill-ink-200 font-mono text-[8px] font-semibold"
        >
          $5.43M USDT (소수점까지 EmberCN 부합)
        </text>
        <text
          x="282"
          y="402"
          className="fill-ink-300 font-mono text-[8px]"
        >
          가격 $1.01 → $0.09 (4시간 -91%)
        </text>
      </g>

      <FlowStage
        x={20}
        y={30}
        no="01"
        title="Gate.io 1 hot wallet"
        sub="0x0d0707…b492fe — 8 wallets 전부 단일 ARIA 출처"
        confidence="documented"
      />
      <FlowStage
        x={20}
        y={158}
        no="02"
        title="8 wallets cluster (EmberCN 식별, 자체 재현)"
        sub="그룹 A 6 wallets (사전 셋업) + 그룹 B 2 wallets (just-in-time)"
        confidence="documented"
      />
      <FlowStage
        x={20}
        y={286}
        no="03"
        title="PancakeSwap v3 ARIA pool"
        sub="0xa5dbea…be4ad17 — 단일 destination · 단 1 hop · 45.65M 전부 수신"
        confidence="documented"
        highlight
      />
      <FlowStage
        x={20}
        y={414}
        no="04"
        title="시총 $315M → $38.5M 증발"
        sub="EmberCN 8 wallets USDT 합 5,425,398 = 자체 측정 100% 부합"
        confidence="documented"
      />
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
  const width = 500
  const height = 88

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
        y="58"
        className={cn(
          'font-mono text-[20px] font-semibold tabular-nums',
          highlight ? 'fill-ink-700' : 'fill-ink-500',
        )}
      >
        {no}
      </text>
      <text
        x="64"
        y="38"
        className={cn(
          'font-mono text-[13px] font-semibold',
          highlight ? 'fill-ink-900' : 'fill-ink-100',
        )}
      >
        {title}
      </text>
      <text
        x="64"
        y="60"
        className={cn(
          'font-mono text-[10px]',
          highlight ? 'fill-ink-700' : 'fill-ink-400',
        )}
      >
        {sub}
      </text>
      <text
        x={width - 14}
        y="84"
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
