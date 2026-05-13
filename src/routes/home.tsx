import { Layout } from '@/components/layout'
import { CaseCard } from '@/components/case-card'
import { cases } from '@/lib/cases'

export function Home() {
  return (
    <Layout>
      <section className="border-b border-ink-700/60 px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-semibold tracking-tight text-ink-50 md:text-4xl">
            구조적 위험 요소 분석
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-300 md:text-lg">
            공개된 온체인 데이터와 보도 기사를 기반으로 한 교육 목적의 사례
            연구입니다. 
            <br/>트레이더가 비슷한 위험 구조를 사전에 식별할 수 있도록
            돕는 것이 목적입니다.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold text-ink-200">사례 연구</h2>
            <span className="font-mono text-xs text-ink-500">
              {cases.length}건
            </span>
          </div>

          {cases.length === 0 ? (
            <div className="mt-6 rounded-md border border-dashed border-ink-700 bg-ink-800/40 px-6 py-20 text-center">
              <p className="text-sm text-ink-300">
                케이스 데이터가 준비되는 중입니다.
              </p>
              <p className="mt-2 text-xs text-ink-500">
                각 케이스는 최소 2개의 독립 출처 검증 후 게재됩니다.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cases.map((entry) => (
                <CaseCard
                  key={entry.frontmatter.slug}
                  data={entry.frontmatter}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}
