import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Disclaimer } from './disclaimer'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-ink-900 text-ink-100">
      <header className="border-b border-ink-700/60 px-6 py-4 md:px-12">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            to="/"
            className="font-mono text-xs uppercase tracking-widest text-ink-200 transition hover:text-ink-50"
          >
            Crime Research
          </Link>
          <div className="flex items-center gap-4">
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-ink-700/60 px-6 py-8 md:px-12">
        <div className="mx-auto max-w-6xl">
          <Disclaimer />
        </div>
      </footer>
    </div>
  )
}

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  try {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* ignore */
  }
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark'
  }
  return 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  try {
    localStorage.setItem('theme', theme)
  } catch {
    /* ignore */
  }
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  // 마운트 시 한번 확실히 동기화 (FOUC 스크립트 + 초기 state 가 어긋날 가능성 차단)
  useEffect(() => {
    applyTheme(theme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isDark = theme === 'dark'
  const label = isDark ? '라이트 모드로 전환' : '다크 모드로 전환'

  const handleClick = () => {
    const next: Theme = isDark ? 'light' : 'dark'
    applyTheme(next)
    setTheme(next)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      title={label}
      className="inline-flex h-7 w-7 items-center justify-center rounded-sm border border-ink-700/60 text-ink-300 transition hover:border-ink-500 hover:text-ink-100"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

type Lang = 'ko' | 'en'

function getInitialLang(): Lang {
  if (typeof document === 'undefined') return 'ko'
  try {
    const stored = localStorage.getItem('lang')
    if (stored === 'ko' || stored === 'en') return stored
  } catch {
    /* ignore */
  }
  if (typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('en')) {
    return 'en'
  }
  return 'ko'
}

function applyLang(lang: Lang) {
  document.documentElement.lang = lang
  try {
    localStorage.setItem('lang', lang)
  } catch {
    /* ignore */
  }
}

function LangToggle() {
  const [lang, setLang] = useState<Lang>(getInitialLang)

  useEffect(() => {
    applyLang(lang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSelect = (next: Lang) => {
    if (next === lang) return
    applyLang(next)
    setLang(next)
  }

  return (
    <div
      role="group"
      aria-label="언어 선택 / Language"
      className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest"
    >
      <button
        type="button"
        onClick={() => handleSelect('ko')}
        aria-pressed={lang === 'ko'}
        className={`transition hover:text-ink-100 ${lang === 'ko' ? 'text-ink-100' : 'text-ink-500'}`}
      >
        KR
      </button>
      <span aria-hidden className="text-ink-600">|</span>
      <button
        type="button"
        onClick={() => handleSelect('en')}
        aria-pressed={lang === 'en'}
        className={`transition hover:text-ink-100 ${lang === 'en' ? 'text-ink-100' : 'text-ink-500'}`}
      >
        EN
      </button>
    </div>
  )
}

function SunIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}
