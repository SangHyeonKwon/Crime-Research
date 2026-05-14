import { cn } from '@/lib/utils'

interface PatternBadgeProps {
  pattern: string
  active?: boolean
  onToggle?: (pattern: string) => void
  countSuffix?: string
}

export function PatternBadge({
  pattern,
  active = false,
  onToggle,
  countSuffix,
}: PatternBadgeProps) {
  const baseClass =
    'inline-flex items-center rounded-sm border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider transition'
  const stateClass = active
    ? 'border-ink-300 bg-ink-200 text-ink-900'
    : 'border-ink-700/60 bg-ink-800/40 text-ink-300 hover:border-ink-500 hover:text-ink-100'

  const label = countSuffix ? `${pattern} · ${countSuffix}` : pattern

  if (!onToggle) {
    return <span className={cn(baseClass, stateClass)}>{label}</span>
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onToggle(pattern)
      }}
      aria-pressed={active}
      className={cn(baseClass, stateClass, 'cursor-pointer')}
    >
      {label}
    </button>
  )
}
