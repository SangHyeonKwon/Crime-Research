interface DataPoint {
  date: string
  ratio: number
}

const data: DataPoint[] = [
  { date: '04/13', ratio: 0.40 },
  { date: '04/14', ratio: 0.40 },
  { date: '04/15', ratio: 0.50 },
  { date: '04/16', ratio: 0.60 },
  { date: '04/17', ratio: 0.42 },
  { date: '04/18', ratio: 0.30 },
  { date: '04/19', ratio: 1.25 },
  { date: '04/20', ratio: 2.20 },
  { date: '04/21', ratio: 2.95 },
  { date: '04/22', ratio: 2.45 },
  { date: '04/23', ratio: 2.80 },
  { date: '04/24', ratio: 3.00 },
  { date: '04/25', ratio: 3.20 },
  { date: '04/26', ratio: 3.10 },
  { date: '04/27', ratio: 3.20 },
  { date: '04/28', ratio: 3.25 },
  { date: '04/29', ratio: 3.30 },
  { date: '04/30', ratio: 3.15 },
  { date: '05/01', ratio: 3.00 },
  { date: '05/02', ratio: 2.95 },
  { date: '05/03', ratio: 3.05 },
  { date: '05/04', ratio: 3.15 },
  { date: '05/05', ratio: 3.00 },
  { date: '05/06', ratio: 3.55 },
  { date: '05/07', ratio: 3.45 },
  { date: '05/08', ratio: 3.45 },
  { date: '05/09', ratio: 3.35 },
  { date: '05/10', ratio: 3.00 },
  { date: '05/11', ratio: 3.20 },
  { date: '05/12', ratio: 3.25 },
]

export function LongShortRatio() {
  const W = 720
  const H = 280
  const M = { l: 50, r: 24, t: 24, b: 36 }
  const innerW = W - M.l - M.r
  const innerH = H - M.t - M.b
  const maxY = 4
  const n = data.length

  const xScale = (i: number) => M.l + (i / (n - 1)) * innerW
  const yScale = (v: number) => M.t + innerH - (v / maxY) * innerH

  const linePath = data
    .map(
      (d, i) =>
        `${i === 0 ? 'M' : 'L'} ${xScale(i).toFixed(2)} ${yScale(d.ratio).toFixed(2)}`,
    )
    .join(' ')

  const areaPath =
    `${linePath} ` +
    `L ${xScale(n - 1).toFixed(2)} ${yScale(0).toFixed(2)} ` +
    `L ${xScale(0).toFixed(2)} ${yScale(0).toFixed(2)} Z`

  const crashIdx = data.findIndex((d) => d.date === '04/19')
  const discloseIdx = data.findIndex((d) => d.date === '04/18')

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full"
      role="img"
      aria-label="Long/Short Ratio 시계열 — RAVE 4월 13일 ~ 5월 12일. 펌프 직전 약 0.30 (숏 우세) 에서 폭락 다음 날 2.20 이상으로 급반전 후 3.0 ~ 3.5 부근 유지"
    >
      {/* Y-axis grid + labels */}
      {[0, 1, 2, 3, 4].map((v) => {
        const isBalance = v === 1
        return (
          <g key={v}>
            <line
              x1={M.l}
              x2={W - M.r}
              y1={yScale(v)}
              y2={yScale(v)}
              className={isBalance ? 'stroke-ink-600' : 'stroke-ink-700'}
              strokeWidth={isBalance ? 1 : 0.5}
              strokeDasharray={isBalance ? '4 4' : undefined}
            />
            <text
              x={M.l - 10}
              y={yScale(v) + 3}
              textAnchor="end"
              className="fill-ink-500 font-mono text-[10px]"
            >
              {v.toFixed(1)}
            </text>
          </g>
        )
      })}

      {/* y=1 balance label */}
      <text
        x={W - M.r - 4}
        y={yScale(1) - 4}
        textAnchor="end"
        className="fill-ink-500 font-mono text-[9px] uppercase tracking-widest"
      >
        balance (1:1)
      </text>

      {/* Area fill */}
      <path d={areaPath} className="fill-ink-100/[0.06]" />

      {/* Disclose marker (vertical line) at 04/18 */}
      <g>
        <line
          x1={xScale(discloseIdx)}
          x2={xScale(discloseIdx)}
          y1={M.t}
          y2={M.t + innerH}
          className="stroke-ink-500"
          strokeDasharray="3 3"
          strokeWidth={0.8}
        />
        <text
          x={xScale(discloseIdx) - 6}
          y={M.t + 14}
          textAnchor="end"
          className="fill-ink-400 font-mono text-[9px] uppercase tracking-widest"
        >
          04-18 disclose
        </text>
      </g>

      {/* Crash marker at 04/19 */}
      <g>
        <line
          x1={xScale(crashIdx)}
          x2={xScale(crashIdx)}
          y1={M.t}
          y2={M.t + innerH}
          className="stroke-ink-500"
          strokeDasharray="3 3"
          strokeWidth={0.8}
        />
        <text
          x={xScale(crashIdx) + 6}
          y={M.t + 14}
          className="fill-ink-300 font-mono text-[9px] uppercase tracking-widest"
        >
          04-19 short squeeze →
        </text>
      </g>

      {/* Main line */}
      <path
        d={linePath}
        fill="none"
        className="stroke-ink-50"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />

      {/* Highlight dots: low point and post-crash peak */}
      {data.map((d, i) => {
        if (i !== discloseIdx && i !== crashIdx + 2) return null
        return (
          <circle
            key={d.date}
            cx={xScale(i)}
            cy={yScale(d.ratio)}
            r={3}
            className="fill-ink-50"
          />
        )
      })}

      {/* Annotations */}
      <text
        x={xScale(2)}
        y={yScale(0.4) - 12}
        textAnchor="middle"
        className="fill-ink-400 font-mono text-[10px] uppercase tracking-widest"
      >
        shorts dominate
      </text>
      <text
        x={xScale(22)}
        y={yScale(3.3) - 12}
        textAnchor="middle"
        className="fill-ink-400 font-mono text-[10px] uppercase tracking-widest"
      >
        longs dominate
      </text>

      {/* X-axis labels */}
      {data.map((d, i) => {
        if (i % 4 !== 0 && i !== n - 1) return null
        return (
          <text
            key={d.date}
            x={xScale(i)}
            y={H - M.b + 18}
            textAnchor="middle"
            className="fill-ink-500 font-mono text-[10px]"
          >
            {d.date}
          </text>
        )
      })}
    </svg>
  )
}
