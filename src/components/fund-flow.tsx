export function FundFlow() {
  return (
    <svg
      viewBox="0 0 540 470"
      className="h-full w-full"
      role="img"
      aria-label="0x53d7 multisig가 2-hop burner를 거쳐 Bitget 6 hot wallet으로 22.99M RAVE를 송금한 자금 흐름 다이어그램"
    >
      <defs>
        <marker
          id="ff-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" className="fill-ink-500" />
        </marker>
      </defs>

      {/* connecting curves */}
      <g
        fill="none"
        strokeLinecap="round"
        strokeWidth="1.5"
        className="stroke-ink-600"
        markerEnd="url(#ff-arrow)"
      >
        <path d="M 270 78 C 270 100, 130 105, 130 128" />
        <path d="M 270 78 C 270 100, 410 105, 410 128" />
        <path d="M 130 298 C 130 322, 270 332, 270 358" />
        <path d="M 410 298 C 410 322, 270 332, 270 358" />
      </g>

      {/* source */}
      <g transform="translate(170, 28)">
        <rect
          width="200"
          height="50"
          rx="4"
          className="fill-ink-800 stroke-ink-500"
          strokeWidth="1"
        />
        <text
          x="100"
          y="22"
          textAnchor="middle"
          className="fill-ink-400 font-mono text-[10px] uppercase tracking-[0.2em]"
        >
          Source · multisig
        </text>
        <text
          x="100"
          y="40"
          textAnchor="middle"
          className="fill-ink-100 font-mono text-[11px]"
        >
          0x53d7…487b · 22.99M
        </text>
      </g>

      {/* left pipeline */}
      <PipelineBox
        x={20}
        y={128}
        label="PATH A · 10M"
        hop1="0x7474…0fe3"
        hop1Sub="burner #1"
        hop2="0x26ac…9b45"
        hop2Sub="burner #2"
        pattern="test 1,001 → bulk 9.999M"
        funded="funded by Bitget 6"
      />

      {/* right pipeline */}
      <PipelineBox
        x={300}
        y={128}
        label="PATH B · 13M"
        hop1="0xf763…ada8"
        hop1Sub="burner #1"
        hop2="0x64d6…3c2b"
        hop2Sub="burner #2"
        pattern="test 10K → bulk 12.986M"
        funded="funded by Bitget 6"
      />

      {/* destination */}
      <g transform="translate(170, 360)">
        <rect width="200" height="55" rx="4" className="fill-ink-100" />
        <text
          x="100"
          y="22"
          textAnchor="middle"
          className="fill-ink-900 font-mono text-[10px] font-semibold uppercase tracking-[0.2em]"
        >
          Destination · Bitget 6
        </text>
        <text
          x="100"
          y="42"
          textAnchor="middle"
          className="fill-ink-800 font-mono text-[11px]"
        >
          0x1ab4…8f23 · 22.99M ✓
        </text>
      </g>

      {/* time annotation */}
      <text
        x="270"
        y="450"
        textAnchor="middle"
        className="fill-ink-500 font-mono text-[9px] uppercase tracking-[0.3em]"
      >
        2026-04-19 · 19:47 → 19:58 UTC · 11 min
      </text>
    </svg>
  )
}

interface PipelineBoxProps {
  x: number
  y: number
  label: string
  hop1: string
  hop1Sub: string
  hop2: string
  hop2Sub: string
  pattern: string
  funded: string
}

function PipelineBox({
  x,
  y,
  label,
  hop1,
  hop1Sub,
  hop2,
  hop2Sub,
  pattern,
  funded,
}: PipelineBoxProps) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        width="220"
        height="170"
        rx="4"
        className="fill-ink-800/60 stroke-ink-600"
        strokeWidth="1"
      />
      <text
        x="110"
        y="20"
        textAnchor="middle"
        className="fill-ink-400 font-mono text-[10px] uppercase tracking-[0.25em]"
      >
        {label}
      </text>
      <line
        x1="14"
        y1="30"
        x2="206"
        y2="30"
        className="stroke-ink-700"
        strokeWidth="0.5"
      />

      <text
        x="110"
        y="50"
        textAnchor="middle"
        className="fill-ink-100 font-mono text-[11px]"
      >
        {hop1}
      </text>
      <text
        x="110"
        y="65"
        textAnchor="middle"
        className="fill-ink-500 font-mono text-[9px]"
      >
        {hop1Sub}
      </text>

      <text
        x="110"
        y="90"
        textAnchor="middle"
        className="fill-ink-600 text-[14px]"
      >
        ↓
      </text>

      <text
        x="110"
        y="112"
        textAnchor="middle"
        className="fill-ink-100 font-mono text-[11px]"
      >
        {hop2}
      </text>
      <text
        x="110"
        y="127"
        textAnchor="middle"
        className="fill-ink-500 font-mono text-[9px]"
      >
        {hop2Sub} · {pattern}
      </text>

      <text
        x="110"
        y="156"
        textAnchor="middle"
        className="fill-ink-600 font-mono text-[8px] uppercase tracking-[0.25em]"
      >
        {funded}
      </text>
    </g>
  )
}
