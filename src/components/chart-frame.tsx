import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Aspect = 'video' | 'square' | 'wide' | 'tall' | 'auto'

const aspectClass: Record<Aspect, string> = {
  video: 'aspect-[16/9]',
  square: 'aspect-square',
  wide: 'aspect-[21/9]',
  tall: 'aspect-[3/4]',
  auto: '',
}

interface ChartFrameProps {
  kind: string
  caption: ReactNode
  source: string
  aspect?: Aspect
  children?: ReactNode
  className?: string
}

export function ChartFrame({
  kind,
  caption,
  source,
  aspect = 'video',
  children,
  className,
}: ChartFrameProps) {
  const hasChart = Boolean(children)
  return (
    <figure
      className={cn(
        'not-prose my-8 overflow-hidden rounded-md border border-ink-700/60 bg-ink-900',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-ink-700/60 bg-ink-800/40 px-4 py-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-300">
          {kind}
        </span>
        <span
          className={cn(
            'font-mono text-[10px] uppercase tracking-widest',
            hasChart ? 'text-ink-500' : 'text-ink-600',
          )}
        >
          {hasChart ? 'chart' : '// data pending'}
        </span>
      </div>

      <div
        className={cn(
          'relative w-full',
          aspect === 'auto' && hasChart ? '' : aspectClass[aspect],
        )}
      >
        {hasChart ? (
          aspect === 'auto' ? (
            children
          ) : (
            <div className="absolute inset-0">{children}</div>
          )
        ) : (
          <ChartPlaceholder kind={kind} />
        )}
      </div>

      <figcaption className="border-t border-ink-700/60 bg-ink-800/30 px-4 py-3">
        <p className="text-sm leading-snug text-ink-200">{caption}</p>
        <p className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-ink-500">
          출처 · {source}
        </p>
      </figcaption>
    </figure>
  )
}

function ChartPlaceholder({ kind }: { kind: string }) {
  return (
    <div
      className="absolute inset-0 bg-ink-900"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgb(var(--ink-50) / 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--ink-50) / 0.04) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    >
      <div
        aria-hidden
        className="absolute inset-x-8 inset-y-8 border-l border-b border-ink-700/40"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-600">
          {kind}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-700">
          chart slot reserved
        </span>
      </div>
    </div>
  )
}
