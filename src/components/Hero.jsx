import { personalInfo, techStack } from '../data/portfolioData';

export default function Hero({ isDark }) {
  const featuredStack = techStack.slice(0, 6);

  return (
    <section
      id="about"
      className={`relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden px-6 py-20 ${isDark ? 'bg-stone-950' : 'bg-stone-50'}`}
    >
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="max-w-3xl animate-[fadeUp_0.9s_ease-out_forwards]">
          <div className={`mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.28em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
            <span>Full-stack developer</span>
            <span className={`h-px w-10 ${isDark ? 'bg-stone-700' : 'bg-stone-300'}`} />
            <span>{personalInfo.location}</span>
          </div>

          <h1 className={`max-w-4xl text-[clamp(4rem,12vw,9.5rem)] font-semibold leading-[0.82] tracking-[-0.085em] ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>
            Dachi
            <span className={`block ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>Shengelia</span>
          </h1>

          <div className="mt-10 grid max-w-2xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <p className={`max-w-lg text-base leading-8 md:text-lg ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
              I love coding and gaming and stuff :)
            </p>

            <div className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
              <span className="block">Currently learning</span>
              <span className={`mt-2 block ${isDark ? 'text-stone-200' : 'text-stone-700'}`}>Backend scaling</span>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#projects"
              className={`rounded-full px-6 py-3 text-sm font-medium transition duration-200 hover:-translate-y-0.5 ${isDark ? 'bg-stone-100 text-stone-950 hover:bg-white' : 'bg-stone-900 text-white hover:bg-stone-800'}`}
            >
              View my work
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className={`rounded-full border px-6 py-3 text-sm font-medium transition duration-200 hover:-translate-y-0.5 ${isDark ? 'border-stone-700 text-stone-200 hover:border-stone-400' : 'border-stone-300 text-stone-700 hover:border-stone-500'}`}
            >
              Get in touch
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm animate-[heroMarkReveal_1.1s_ease-out_forwards] lg:justify-self-end">
          <div className={`relative aspect-square overflow-hidden border ${isDark ? 'border-stone-700 bg-stone-900/50' : 'border-stone-300 bg-white/70'}`}>
            <div className={`absolute inset-5 border ${isDark ? 'border-stone-800' : 'border-stone-200'}`} />
            <div className={`absolute left-8 top-8 text-[10px] font-semibold uppercase tracking-[0.3em] ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
              DS / 01
            </div>
            <div className={`absolute bottom-8 right-8 text-[clamp(8rem,18vw,13rem)] font-semibold leading-none tracking-[-0.15em] ${isDark ? 'text-stone-800' : 'text-stone-200'}`}>
              DS
            </div>
            <div className={`absolute bottom-8 left-8 max-w-[140px] border-l-2 pl-3 text-[10px] font-semibold uppercase leading-5 tracking-[0.2em] ${isDark ? 'border-stone-600 text-stone-300' : 'border-stone-400 text-stone-600'}`}>
              Software engineer in progress
            </div>
          </div>

          <div className={`mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.18em] ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
            {featuredStack.map((technology) => <span key={technology}>{technology}</span>)}
          </div>
        </div>

        <a
          href="#projects"
          className={`group mt-2 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] lg:col-span-2 ${isDark ? 'text-stone-500 hover:text-stone-200' : 'text-stone-500 hover:text-stone-900'}`}
          aria-label="Scroll down to projects"
        >
          <span>Selected work</span>
          <span className={`flex h-8 w-5 items-center justify-center rounded-full border ${isDark ? 'border-stone-700' : 'border-stone-300'}`}>
            <span className={`scroll-indicator h-2 w-2 rounded-full ${isDark ? 'bg-stone-100' : 'bg-stone-900'}`} />
          </span>
        </a>
      </div>
    </section>
  );
}
