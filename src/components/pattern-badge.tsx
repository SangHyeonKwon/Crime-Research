export function PatternBadge({ pattern }: { pattern: string }) {
  return (
    <span className="inline-flex items-center rounded-sm border border-ink-700/60 bg-ink-800/40 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-300">
      {pattern}
    </span>
  )
}
