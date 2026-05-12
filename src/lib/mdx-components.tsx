import type { ComponentPropsWithoutRef } from 'react'

type Props<T extends keyof JSX.IntrinsicElements> = ComponentPropsWithoutRef<T>

export const mdxComponents = {
  h2: (props: Props<'h2'>) => (
    <h2
      {...props}
      className="mt-16 mb-5 scroll-mt-24 border-b border-ink-700/60 pb-3 text-2xl font-semibold tracking-tight text-ink-50 first:mt-0 md:text-[1.75rem]"
    />
  ),
  h3: (props: Props<'h3'>) => (
    <h3
      {...props}
      className="mt-10 mb-3 text-base font-semibold tracking-tight text-ink-100"
    />
  ),
  p: (props: Props<'p'>) => (
    <p
      {...props}
      className="my-4 text-[15px] leading-[1.8] text-ink-200"
    />
  ),
  ul: (props: Props<'ul'>) => (
    <ul
      {...props}
      className="my-4 space-y-1.5 pl-5 text-[15px] leading-[1.8] text-ink-200 [&>li]:list-disc [&>li]:marker:text-ink-500"
    />
  ),
  ol: (props: Props<'ol'>) => (
    <ol
      {...props}
      className="my-4 space-y-1.5 pl-5 text-[15px] leading-[1.8] text-ink-200 [&>li]:list-decimal [&>li]:marker:text-ink-500"
    />
  ),
  li: (props: Props<'li'>) => <li {...props} className="pl-1" />,
  strong: (props: Props<'strong'>) => (
    <strong {...props} className="font-semibold text-ink-50" />
  ),
  em: (props: Props<'em'>) => (
    <em {...props} className="not-italic text-ink-100" />
  ),
  code: (props: Props<'code'>) => (
    <code
      {...props}
      className="rounded-sm bg-ink-800/60 px-1.5 py-0.5 font-mono text-[13px] text-ink-100"
    />
  ),
  blockquote: (props: Props<'blockquote'>) => (
    <blockquote
      {...props}
      className="my-6 border-l-2 border-ink-500 bg-ink-800/30 px-5 py-3 text-[15px] leading-7 text-ink-200 [&>p]:my-0"
    />
  ),
  hr: (props: Props<'hr'>) => (
    <hr {...props} className="my-12 border-ink-700/60" />
  ),
  a: (props: Props<'a'>) => (
    <a
      {...props}
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noreferrer' : undefined}
      className="border-b border-ink-600 text-ink-100 transition hover:border-ink-300 hover:text-ink-50"
    />
  ),
  table: (props: Props<'table'>) => (
    <div className="my-8 overflow-x-auto rounded-md border border-ink-700/60">
      <table {...props} className="w-full border-collapse text-sm" />
    </div>
  ),
  thead: (props: Props<'thead'>) => (
    <thead
      {...props}
      className="bg-ink-800/60 font-mono text-[11px] uppercase tracking-widest text-ink-400"
    />
  ),
  th: (props: Props<'th'>) => (
    <th
      {...props}
      className="border-b border-ink-700/60 px-4 py-3 text-left font-normal"
    />
  ),
  tr: (props: Props<'tr'>) => (
    <tr {...props} className="border-b border-ink-700/40 last:border-b-0" />
  ),
  td: (props: Props<'td'>) => (
    <td {...props} className="px-4 py-3 align-top text-ink-200" />
  ),
}
