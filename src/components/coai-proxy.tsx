import { cn } from '@/lib/utils'

export function CoaiProxy() {
  return (
    <svg
      viewBox="0 0 540 540"
      className="h-full w-full"
      role="img"
      aria-label="COAI (ChainOpera AI) 케이스 — EIP-1967 Transparent Proxy 구조 다이어그램. 사용자 → Proxy(storage) → Implementation(logic) 흐름과, admin 권한 미포기 상태에서 Implementation 을 교체할 수 있는 경로를 표시"
    >
      <defs>
        <marker
          id="cp-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" className="fill-ink-500" />
        </marker>
        <marker
          id="cp-arrow-warn"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" className="fill-ink-300" />
        </marker>
      </defs>

      {/* main call path arrows */}
      <g fill="none" strokeLinecap="round" strokeWidth="1.5">
        <line
          x1="180"
          y1="120"
          x2="180"
          y2="150"
          className="stroke-ink-500"
          markerEnd="url(#cp-arrow)"
        />
        <line
          x1="180"
          y1="258"
          x2="180"
          y2="288"
          className="stroke-ink-500"
          markerEnd="url(#cp-arrow)"
        />
      </g>
      <text
        x="192"
        y="140"
        className="fill-ink-400 font-mono text-[10px] font-semibold"
      >
        transfer() 호출
      </text>
      <text
        x="192"
        y="278"
        className="fill-ink-400 font-mono text-[10px] font-semibold"
      >
        delegatecall (logic 위임)
      </text>

      <Node
        x={20}
        y={50}
        no="01"
        title="사용자 / 트레이더"
        sub="지갑에서 transfer · approve 호출"
        tone="neutral"
      />
      <Node
        x={20}
        y={168}
        no="02"
        title="Proxy Contract — storage"
        sub="0x0A8D...6EA5 · 주소 고정 (변경 불가)"
        tone="neutral"
      />
      <Node
        x={20}
        y={306}
        no="03"
        title="Implementation — logic"
        sub="0xa9d0...a877 · admin 이 교체 가능"
        tone="warn"
      />

      {/* admin side node + swap arrow */}
      <Node
        x={300}
        y={306}
        no="A"
        title="Admin 권한"
        sub="renounce 안 됨 (미포기)"
        tone="alert"
        width={220}
      />
      <g fill="none" strokeLinecap="round" strokeWidth="1.4">
        <path
          d="M 300 345 L 222 345"
          className="stroke-ink-300"
          strokeDasharray="3 3"
          markerEnd="url(#cp-arrow-warn)"
        />
      </g>
      <text
        x="261"
        y="335"
        textAnchor="middle"
        className="fill-ink-300 font-mono text-[9px] font-semibold"
      >
        upgradeTo()
      </text>

      {/* admin capability list */}
      <text
        x="20"
        y="436"
        className="fill-ink-500 font-mono text-[9px] uppercase tracking-[0.25em]"
      >
        admin 이 사전 공지 없이 가능한 것
      </text>
      <CapRow y={456} text="Implementation 교체 — 토큰 동작 로직 전체 변경" />
      <CapRow y={478} text="transfer 비활성화 — 전체 잔고 freeze" />
      <CapRow y={500} text="mint 추가 — 무한 발행으로 가치 희석" />
      <CapRow y={522} text="blacklist · tax 추가 — 특정 지갑 차단 / 수수료 부과" />
    </svg>
  )
}

type Tone = 'neutral' | 'warn' | 'alert'

interface NodeProps {
  x: number
  y: number
  no: string
  title: string
  sub: string
  tone: Tone
  width?: number
}

function Node({ x, y, no, title, sub, tone, width = 360 }: NodeProps) {
  const height = 88
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        width={width}
        height={height}
        rx="4"
        className={cn(
          tone === 'alert'
            ? 'fill-ink-100 stroke-ink-300'
            : tone === 'warn'
              ? 'fill-ink-800/80 stroke-ink-400'
              : 'fill-ink-800/60 stroke-ink-600',
        )}
        strokeWidth="1"
      />
      <text
        x="22"
        y="52"
        className={cn(
          'font-mono text-[20px] font-semibold tabular-nums',
          tone === 'alert' ? 'fill-ink-700' : 'fill-ink-500',
        )}
      >
        {no}
      </text>
      <text
        x="64"
        y="36"
        className={cn(
          'font-mono text-[13px] font-semibold',
          tone === 'alert' ? 'fill-ink-900' : 'fill-ink-100',
        )}
      >
        {title}
      </text>
      <text
        x="64"
        y="56"
        className={cn(
          'font-mono text-[10px]',
          tone === 'alert' ? 'fill-ink-700' : 'fill-ink-400',
        )}
      >
        {sub}
      </text>
    </g>
  )
}

function CapRow({ y, text }: { y: number; text: string }) {
  return (
    <g>
      <rect
        x="20"
        y={y - 10}
        width="6"
        height="6"
        className="fill-ink-500"
      />
      <text
        x="36"
        y={y - 4}
        className="fill-ink-300 font-mono text-[10px]"
      >
        {text}
      </text>
    </g>
  )
}
