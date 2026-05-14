import { Link } from 'react-router-dom'
import type { CaseFrontmatter } from '@/lib/types'
import { PatternBadge } from './pattern-badge'

const statusLabel: Record<CaseFrontmatter['status'], string> = {
  documented: '거래소 확인',
  alleged: '의혹 / 조사 중',
  'pattern-match': '구조적 위험',
}

interface CaseCardProps {
  data: CaseFrontmatter
  activePatterns?: string[]
  onTogglePattern?: (pattern: string) => void
}

export function CaseCard({
  data,
  activePatterns = [],
  onTogglePattern,
}: CaseCardProps) {
  const drawdown = data.metrics?.maxDrawdown
  const drawdownLabel =
    typeof drawdown === 'number' ? `${(drawdown * 100).toFixed(0)}%` : null
  const activeSet = new Set(activePatterns)

  return (
    <Link
      to={`/cases/${data.slug}`}
      className="group flex h-full flex-col rounded-md border border-ink-700/60 bg-ink-800/40 p-5 transition hover:border-ink-600 hover:bg-ink-800/70"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-ink-300">
          {data.tokenSymbol}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-500">
          {statusLabel[data.status]}
        </span>
      </div>

      <h3 className="mt-3 text-base font-semibold leading-snug text-ink-100 group-hover:text-ink-50">
        {data.title}
      </h3>

      <div className="mt-3 flex flex-wrap gap-1">
        {data.patterns.map((p) => (
          <PatternBadge
            key={p}
            pattern={p}
            active={activeSet.has(p)}
            onToggle={onTogglePattern}
          />
        ))}
      </div>

      <div className="mt-auto flex items-baseline justify-between pt-5 font-mono text-xs">
        <span className="text-ink-500">{data.incidentDate}</span>
        {drawdownLabel && (
          <span className="text-ink-200">최대 {drawdownLabel}</span>
        )}
      </div>
    </Link>
  )
}
