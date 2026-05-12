import { cn } from '@/lib/utils'

export function Web3PortFlow() {
  return (
    <svg
      viewBox="0 0 540 540"
      className="h-full w-full"
      role="img"
      aria-label="GPS/SHELL 케이스 — 프로젝트 → Web3Port → Whisper → Binance 매도 → 수익 분배까지 4단계 자금 흐름 다이어그램"
    >
      <defs>
        <marker
          id="wpf-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" className="fill-ink-500" />
        </marker>
        <marker
          id="wpf-arrow-dim"
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
          className="stroke-ink-700"
          strokeDasharray="3 3"
          markerEnd="url(#wpf-arrow-dim)"
        />
        <line
          x1="220"
          y1="246"
          x2="220"
          y2="276"
          className="stroke-ink-700"
          strokeDasharray="3 3"
          markerEnd="url(#wpf-arrow-dim)"
        />
        <line
          x1="220"
          y1="364"
          x2="220"
          y2="394"
          className="stroke-ink-500"
          markerEnd="url(#wpf-arrow)"
        />
      </g>

      {/* arrow labels */}
      <text
        x="232"
        y="148"
        className="fill-ink-500 font-mono text-[10px]"
      >
        공급의 1-3% (무상 토큰)
      </text>
      <text
        x="232"
        y="266"
        className="fill-ink-500 font-mono text-[10px]"
      >
        자회사 이관
      </text>
      <text
        x="232"
        y="384"
        className="fill-ink-200 font-mono text-[10px] font-semibold"
      >
        GPS 7,000만 · 21h · 매수 호가 미이행
      </text>

      <FlowStage
        x={20}
        y={50}
        no="01"
        title="GPS · SHELL Projects"
        sub="토큰 발행 · Web3Port 인큐베이션 계약"
        confidence="alleged"
      />
      <FlowStage
        x={20}
        y={168}
        no="02"
        title="Web3Port"
        sub="VC / 인큐베이터로 가장 · 무상 토큰 수령"
        confidence="alleged"
      />
      <FlowStage
        x={20}
        y={286}
        no="03"
        title="Whisper · Market Maker"
        sub="자회사 격 · 바이낸스 계정 권한 보유"
        confidence="mixed"
      />
      <FlowStage
        x={20}
        y={404}
        no="04"
        title="Binance Spot 매도 → ~$5M (GPS)"
        sub="SHELL 수치 미공개 · 사용자 보상 절차 발표"
        confidence="documented"
        highlight
      />

      {/* profit-distribution side curve: stage 4 → stage 1 */}
      <g fill="none" strokeLinecap="round" strokeWidth="1.2">
        <path
          d="M 420 443 C 500 443, 500 90, 420 90"
          className="stroke-ink-700"
          strokeDasharray="2 3"
          markerEnd="url(#wpf-arrow-dim)"
        />
      </g>
      <text
        x="500"
        y="270"
        textAnchor="middle"
        transform="rotate(-90 500 270)"
        className="fill-ink-500 font-mono text-[9px] uppercase tracking-[0.25em]"
      >
        수익 분배 (비율 미공개)
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
  documented: 'Binance 공식',
  mixed: '일부 documented',
  alleged: '분석가 주장',
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
