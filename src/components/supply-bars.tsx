import { cn } from '@/lib/utils'

export type HolderCategory = 'team' | 'dispersed' | 'exchange' | 'unknown'

export interface HolderRow {
  rank: number
  address: string
  label?: string
  category: HolderCategory
  pct: number
  balance: number
}

const categoryStyle: Record<HolderCategory, { bar: string; chip: string }> = {
  team: {
    bar: 'bg-ink-200',
    chip: 'border-ink-400 text-ink-100',
  },
  dispersed: {
    bar: 'bg-ink-400',
    chip: 'border-ink-500 text-ink-200',
  },
  exchange: {
    bar: 'bg-ink-500',
    chip: 'border-ink-600 text-ink-300',
  },
  unknown: {
    bar: 'bg-ink-700',
    chip: 'border-ink-700 text-ink-400',
  },
}

function formatBalance(n: number): string {
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`
  return n.toFixed(0)
}

function shortAddr(addr: string): string {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`
}

interface SupplyBarsProps {
  rows: HolderRow[]
  asOf: string
  symbol: string
}

export function SupplyBars({ rows, asOf, symbol }: SupplyBarsProps) {
  const maxPct = Math.max(...rows.map((r) => r.pct))
  const total = rows.reduce((s, r) => s + r.pct, 0)
  const top3 = rows.slice(0, 3).reduce((s, r) => s + r.pct, 0)

  return (
    <div className="p-5 md:p-7">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3 border-b border-ink-700/40 pb-3">
        <div className="font-mono text-[10px] uppercase tracking-widest text-ink-400">
          As of {asOf}
        </div>
        <div className="flex gap-4 font-mono text-[10px] uppercase tracking-widest">
          <span className="text-ink-500">
            Top 3 · <span className="text-ink-100">{top3.toFixed(2)}%</span>
          </span>
          <span className="text-ink-500">
            Top {rows.length} · <span className="text-ink-100">{total.toFixed(2)}%</span>
          </span>
        </div>
      </div>

      <ol className="space-y-3">
        {rows.map((row) => (
          <li key={row.address}>
            <SupplyRow row={row} maxPct={maxPct} symbol={symbol} />
          </li>
        ))}
      </ol>
    </div>
  )
}

function SupplyRow({
  row,
  maxPct,
  symbol,
}: {
  row: HolderRow
  maxPct: number
  symbol: string
}) {
  const widthPct = Math.max(0.5, (row.pct / maxPct) * 100)
  const { bar, chip } = categoryStyle[row.category]

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-2 font-mono text-[11px]">
        <div className="flex min-w-0 items-center gap-2">
          <span className="tabular-nums text-ink-500">
            #{row.rank.toString().padStart(2, '0')}
          </span>
          <span className="truncate text-ink-200">{shortAddr(row.address)}</span>
          {row.label && (
            <span
              className={cn(
                'shrink-0 rounded-sm border bg-ink-900/40 px-1.5 py-0.5 text-[9px] uppercase tracking-wider',
                chip,
              )}
            >
              {row.label}
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-baseline gap-3 tabular-nums">
          <span className="text-ink-400">
            {formatBalance(row.balance)} {symbol}
          </span>
          <span className="w-14 text-right text-xs text-ink-50">
            {row.pct.toFixed(2)}%
          </span>
        </div>
      </div>
      <div className="relative h-2.5 overflow-hidden rounded-sm bg-ink-800/60">
        <div
          className={cn('h-full rounded-sm', bar)}
          style={{ width: `${widthPct}%` }}
        />
      </div>
    </div>
  )
}
