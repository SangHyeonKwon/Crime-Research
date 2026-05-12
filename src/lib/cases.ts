import type { MDXContent } from 'mdx/types'
import { caseFrontmatterSchema } from './schema'
import type { CaseFrontmatter } from './types'

interface MdxModule {
  default: MDXContent
  frontmatter: unknown
}

const modules = import.meta.glob<MdxModule>('../content/cases/*.mdx', {
  eager: true,
})

export interface CaseEntry {
  frontmatter: CaseFrontmatter
  Component: MDXContent
}

export const cases: CaseEntry[] = Object.entries(modules)
  .map(([path, mod]) => {
    const result = caseFrontmatterSchema.safeParse(mod.frontmatter)
    if (!result.success) {
      throw new Error(
        `Invalid frontmatter in ${path}: ${result.error.message}`,
      )
    }
    return { frontmatter: result.data, Component: mod.default }
  })
  .sort((a, b) =>
    b.frontmatter.incidentDate.localeCompare(a.frontmatter.incidentDate),
  )

export function getCase(slug: string): CaseEntry | undefined {
  return cases.find((entry) => entry.frontmatter.slug === slug)
}
