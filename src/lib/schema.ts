import { z } from 'zod'

export const caseStatusSchema = z.enum([
  'documented',
  'alleged',
  'pattern-match',
])

export const caseSeveritySchema = z.enum(['critical', 'high', 'medium', 'low'])

export const allegationSchema = z.object({
  source: z.string().min(1),
  sourceUrl: z.string().url(),
  date: z.string(),
  summary: z.string().min(1),
})

export const caseImageSchema = z.object({
  file: z.string().min(1),
  caption: z.string().min(1),
  sourceUrl: z.string().url(),
})

export const caseMetricsSchema = z
  .object({
    startPrice: z.number().optional(),
    peakPrice: z.number().optional(),
    bottomPrice: z.number().optional(),
    maxGain: z.number().optional(),
    maxDrawdown: z.number().optional(),
    marketCapPeak: z.number().optional(),
    marketCapEvaporated: z.number().optional(),
    pumpDurationDays: z.number().optional(),
    crashDurationHours: z.number().optional(),
    liquidationVolume24h: z.number().optional(),
  })
  .optional()

export const caseExchangesSchema = z
  .object({
    binanceSpot: z.boolean().optional(),
    binanceAlpha: z.boolean().optional(),
    binanceFutures: z.boolean().optional(),
    others: z.array(z.string()).optional(),
  })
  .optional()

export const caseFrontmatterSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, 'slug는 kebab-case'),
  title: z.string().min(1),
  tokenSymbol: z.string().min(1),
  incidentDate: z.string(),
  publishedDate: z.string(),
  status: caseStatusSchema,
  severity: caseSeveritySchema,
  patterns: z.array(z.string()).min(1),
  metrics: caseMetricsSchema,
  exchanges: caseExchangesSchema,
  allegations: z.array(allegationSchema).min(1, '최소 1개 출처 필요'),
  images: z.array(caseImageSchema).optional(),
  relatedCases: z.array(z.string()).optional(),
})
