import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ZoomableImageProps {
  src: string
  alt: string
}

export function ZoomableImage({ src, alt }: ZoomableImageProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${alt} — 클릭해서 확대`}
        className="block w-full cursor-zoom-in transition hover:opacity-90"
      >
        <img src={src} alt={alt} className="block w-full" />
      </button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="확대 이미지"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/95 p-4 backdrop-blur-sm"
          >
            <img
              src={src}
              alt={alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[92vh] max-w-[96vw] cursor-zoom-out object-contain"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="닫기"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-sm border border-ink-600 bg-ink-800/80 font-mono text-lg text-ink-100 transition hover:border-ink-400 hover:text-ink-50"
            >
              ×
            </button>
          </div>,
          document.body,
        )}
    </>
  )
}
