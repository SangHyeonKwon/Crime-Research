import type { ReactNode } from 'react'

export function Timeline({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose relative my-8 border-l border-ink-700/80 pl-6">
      {children}
    </div>
  )
}

export function TimelineEvent({
  date,
  children,
}: {
  date: string
  children: ReactNode
}) {
  return (
    <div className="relative mb-8 last:mb-0">
      <span
        aria-hidden
        className="absolute -left-[29px] top-1.5 h-2 w-2 rounded-full border border-ink-400 bg-ink-700"
      />
      <p className="font-mono text-[11px] uppercase tracking-widest text-ink-400">
        {date}
      </p>
      <div className="mt-2 text-[15px] leading-7 text-ink-200 [&>p]:my-0 [&>p+p]:mt-3 [&_code]:rounded-sm [&_code]:bg-ink-800/60 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px] [&_code]:text-ink-100 [&_em]:not-italic [&_em]:text-ink-100 [&_strong]:font-semibold [&_strong]:text-ink-50">
        {children}
      </div>
    </div>
  )
}
