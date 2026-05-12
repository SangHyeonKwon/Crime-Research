import type { z } from 'zod'
import type {
  caseFrontmatterSchema,
  caseSeveritySchema,
  caseStatusSchema,
} from './schema'

export type CaseFrontmatter = z.infer<typeof caseFrontmatterSchema>
export type CaseStatus = z.infer<typeof caseStatusSchema>
export type CaseSeverity = z.infer<typeof caseSeveritySchema>
