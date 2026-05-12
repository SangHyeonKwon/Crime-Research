import { cn } from '@/lib/utils'

interface CyclePoint {
  date: string
  label: string
  marketCapUsd: number
  changePct: number
  kind: 'peak' | 'trough'
  cycle: 1 | 2 | 3
}

const points: CyclePoint[] = [
  { date: '03-24', label: '1차 ATH', marketCapUsd: 1_710_000_000, changePct: 0, kind: 'peak', cycle: 1 },
  { date: '03-25', label: '1차 붕괴', marketCapUsd: 743_000_000, changePct: -57, kind: 'trough', cycle: 1 },
  { date: '03-26', label: '2차 펌프', marketCapUsd: 1_510_000_000, changePct: 103, kind: 'peak', cycle: 2 },
  { date: '03-28', label: '2차 붕괴', marketCapUsd: 586_000_000, changePct: -61, kind: 'trough', cycle: 2 },
  { date: '03-30', label: '3차 펌프', marketCapUsd: 1_300_000_000, changePct: 122, kind: 'peak', cycle: 3 },
  { date: '04-01', label: '3차 붕괴', marketCapUsd: 393_700_000, changePct: -70, kind: 'trough', cycle: 3 },
]

const VIEW_W = 720
const VIEW_H = 380
const PAD_L = 56
const PAD_R = 24
const PAD_T = 40
const PAD_B = 78
const CHART_W = VIEW_W - PAD_L - PAD_R
const CHART_H = VIEW_H - PAD_T - PAD_B
const MAX_VAL = 1_800_000_000
const Y_TICKS = [0, 500_000_000, 1_000_000_000, 1_500_000_000]

function yFor(value: number): number {
  return PAD_T + CHART_H - (value / MAX_VAL) * CHART_H
}

function xFor(index: number): number {
  const slot = CHART_W / points.length
  return PAD_L + slot * index + slot / 2
}

function formatB(value: number): string {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6) return `$${Math.round(value / 1e6)}M`
  return `$${value}`
}

export function MarketcapCycles() {
  const barWidth = (CHART_W / points.length) * 0.5

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="h-full w-full"
      role="img"
      aria-label="SIREN 시총 변화 — 2026.03.24 ~ 04.01 사이 3회 반복된 펌프-덤프 사이클"
    >
      {/* y-axis gridlines + labels */}
      <g>
        {Y_TICKS.map((tick) => {
          const y = yFor(tick)
          return (
            <g key={tick}>
              <line
                x1={PAD_L}
                x2={VIEW_W - PAD_R}
                y1={y}
                y2={y}
                className="stroke-ink-700/40"
                strokeWidth="0.5"
                strokeDasharray="2 4"
              />
              <text
                x={PAD_L - 10}
                y={y + 4}
                textAnchor="end"
                className="fill-ink-500 font-mono text-[10px] tabular-nums"
              >
                {formatB(tick)}
              </text>
            </g>
          )
        })}
      </g>

      {/* cycle bands behind bars */}
      <g>
        {[1, 2, 3].map((c) => {
          const cyclePoints = points.filter((p) => p.cycle === c)
          const firstIdx = points.findIndex((p) => p === cyclePoints[0])
          const lastIdx = points.findIndex((p) => p === cyclePoints[cyclePoints.length - 1])
          const slot = CHART_W / points.length
          const x1 = PAD_L + slot * firstIdx
          const x2 = PAD_L + slot * (lastIdx + 1)
          return (
            <g key={c}>
              <rect
                x={x1}
                y={PAD_T}
                width={x2 - x1}
                height={CHART_H}
                className="fill-ink-800/30"
              />
              <text
                x={(x1 + x2) / 2}
                y={PAD_T - 14}
                textAnchor="middle"
                className="fill-ink-500 font-mono text-[10px] uppercase tracking-[0.25em]"
              >
                Cycle {c}
              </text>
            </g>
          )
        })}
      </g>

      {/* connecting line between points */}
      <g>
        <polyline
          points={points.map((p, i) => `${xFor(i)},${yFor(p.marketCapUsd)}`).join(' ')}
          fill="none"
          className="stroke-ink-600"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
      </g>

      {/* bars */}
      <g>
        {points.map((p, i) => {
          const x = xFor(i) - barWidth / 2
          const y = yFor(p.marketCapUsd)
          const h = PAD_T + CHART_H - y
          const isPeak = p.kind === 'peak'
          return (
            <g key={`${p.date}-${p.label}`}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={h}
                className={cn(isPeak ? 'fill-ink-200' : 'fill-ink-600')}
              />
              {/* marketcap label above bar */}
              <text
                x={xFor(i)}
                y={y - 8}
                textAnchor="middle"
                className={cn(
                  'font-mono text-[11px] tabular-nums',
                  isPeak ? 'fill-ink-50' : 'fill-ink-300',
                )}
              >
                {formatB(p.marketCapUsd)}
              </text>
              {/* change % inside / below bar */}
              {p.changePct !== 0 && (
                <text
                  x={xFor(i)}
                  y={y + 18}
                  textAnchor="middle"
                  className={cn(
                    'font-mono text-[10px] tabular-nums',
                    isPeak ? 'fill-ink-700' : 'fill-ink-200',
                  )}
                >
                  {p.changePct > 0 ? `+${p.changePct}%` : `${p.changePct}%`}
                </text>
              )}
              {/* date label below */}
              <text
                x={xFor(i)}
                y={PAD_T + CHART_H + 18}
                textAnchor="middle"
                className="fill-ink-400 font-mono text-[10px] tabular-nums"
              >
                {p.date}
              </text>
              {/* event label below date */}
              <text
                x={xFor(i)}
                y={PAD_T + CHART_H + 34}
                textAnchor="middle"
                className="fill-ink-500 font-mono text-[9px]"
              >
                {p.label}
              </text>
            </g>
          )
        })}
      </g>

      {/* x-axis baseline */}
      <line
        x1={PAD_L}
        x2={VIEW_W - PAD_R}
        y1={PAD_T + CHART_H}
        y2={PAD_T + CHART_H}
        className="stroke-ink-600"
        strokeWidth="1"
      />

      {/* annotation footer */}
      <text
        x={VIEW_W / 2}
        y={VIEW_H - 14}
        textAnchor="middle"
        className="fill-ink-500 font-mono text-[10px] uppercase tracking-[0.25em]"
      >
        peak (light) · trough (dark) — 2026 dates, market cap (USD)
      </text>
    </svg>
  )
}
