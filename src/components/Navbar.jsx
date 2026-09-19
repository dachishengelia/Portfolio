export default function Navbar({ isDark, onToggleTheme }) {
  return (
    <header className={`sticky top-0 z-50 border-b ${isDark ? 'border-stone-800 bg-stone-950/90' : 'border-stone-200 bg-white/90'}`}>
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <a href="#about" className={`text-sm font-semibold tracking-[0.24em] uppercase ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>
          Dachi S.
        </a>

        <div className="flex items-center gap-6">
          <div className={`hidden items-center gap-6 text-sm md:flex ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
            <a href="#about" className="transition hover:text-stone-900 dark:hover:text-white">About</a>
            <a href="#projects" className="transition hover:text-stone-900 dark:hover:text-white">Projects</a>
            <a href="#skills" className="transition hover:text-stone-900 dark:hover:text-white">Skills</a>
            <a href="#contact" className="transition hover:text-stone-900 dark:hover:text-white">Contact</a>
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            className={`relative flex h-9 w-16 items-center rounded-full border p-1 transition-all duration-300 ${isDark ? 'border-stone-700 bg-stone-800' : 'border-stone-300 bg-stone-200'}`}
            aria-label="Toggle theme"
          >
            <span className="sr-only">{isDark ? 'Switch to light mode' : 'Switch to dark mode'}</span>

            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full shadow-sm transition-transform duration-300 ${
                isDark ? 'translate-x-6 bg-stone-100 text-stone-900' : 'translate-x-0 bg-stone-900 text-stone-100'
              }`}
            >
              {isDark ? (
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <g>
                    <path d="M12 2.5v2.2M12 19.3v2.2M4.93 4.93l1.56 1.56M17.51 17.51l1.56 1.56M2.5 12h2.2M19.3 12h2.2M4.93 19.07l1.56-1.56M17.51 6.49l1.56-1.56" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                  </g>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
                  <path d="M21 12.8A8.8 8.8 0 0 1 11.2 3a8.8 8.8 0 1 0 9.8 9.8Z" />
                </svg>
              )}
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}