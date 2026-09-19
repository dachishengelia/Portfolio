import { useEffect, useRef, useState } from 'react';
import { personalInfo, projects } from '../data/portfolioData';
import ProjectPreview from './ProjectPreview';

const featuredProjects = projects.slice(0, 3);
const AUTO_SWITCH_MS = 6500;

export default function Hero({ isDark }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);
  const [direction, setDirection] = useState(1);
  const switchTimeoutRef = useRef(null);
  const autoSwitchTimeoutRef = useRef(null);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const scheduleAutoSwitch = () => {
    if (autoSwitchTimeoutRef.current) {
      window.clearTimeout(autoSwitchTimeoutRef.current);
    }

    autoSwitchTimeoutRef.current = window.setTimeout(() => {
      const nextIndex = (activeIndexRef.current + 1) % featuredProjects.length;
      switchProject(nextIndex);
    }, AUTO_SWITCH_MS);
  };

  const switchProject = (nextIndex) => {
    if (nextIndex === activeIndexRef.current) return;

    setDirection(nextIndex > activeIndexRef.current ? 1 : -1);
    setIsSwitching(true);
    setActiveIndex(nextIndex);
    activeIndexRef.current = nextIndex;

    if (switchTimeoutRef.current) {
      window.clearTimeout(switchTimeoutRef.current);
    }

    switchTimeoutRef.current = window.setTimeout(() => {
      setIsSwitching(false);
    }, 850);

    scheduleAutoSwitch();
  };

  useEffect(() => {
    scheduleAutoSwitch();

    return () => {
      if (autoSwitchTimeoutRef.current) {
        window.clearTimeout(autoSwitchTimeoutRef.current);
      }
      if (switchTimeoutRef.current) {
        window.clearTimeout(switchTimeoutRef.current);
      }
    };
  }, []);

  const activeProject = featuredProjects[activeIndex];

  const goToProject = (index) => switchProject(index);
  const goToPrevious = () => goToProject((activeIndex - 1 + featuredProjects.length) % featuredProjects.length);
  const goToNext = () => goToProject((activeIndex + 1) % featuredProjects.length);

  return (
    <section id="about" className={`relative flex min-h-[calc(100vh-5rem)] items-center px-6 py-20 ${isDark ? 'bg-stone-950' : 'bg-white'}`}>
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-3xl space-y-7 opacity-0 animate-[fadeUp_0.9s_ease-out_forwards]">
          <p className={`text-xs font-medium uppercase tracking-[0.32em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
            Hi there, I&apos;m
          </p>

          <h1 className={`text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-7xl ${isDark ? 'text-white' : 'text-stone-900'}`}>
            {personalInfo.name}
          </h1>

          <p className={`max-w-2xl text-lg font-medium leading-snug md:text-2xl ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
            {personalInfo.title}
          </p>

          <p className={`max-w-xl text-base leading-relaxed md:text-lg ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
            {personalInfo.bio}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#projects"
              className={`rounded-full px-6 py-3 text-sm font-medium transition duration-200 hover:-translate-y-0.5 ${isDark ? 'bg-stone-100 text-stone-950 hover:bg-white' : 'bg-stone-900 text-white hover:bg-stone-800'}`}
            >
              View Projects
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className={`rounded-full border px-6 py-3 text-sm font-medium transition duration-200 hover:-translate-y-0.5 ${isDark ? 'border-stone-700 bg-stone-900/70 text-stone-100 hover:border-stone-500' : 'border-stone-300 bg-white/80 text-stone-800 hover:border-stone-400'}`}
            >
              Get in Touch
            </a>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-md items-center justify-center lg:justify-end">
          <div className="relative h-[440px] w-full max-w-[420px]">
            <div className={`project-stack-glow absolute inset-4 rounded-[2.4rem] border ${isDark ? 'border-stone-800/70 bg-stone-900/55' : 'border-stone-200 bg-stone-50/90'} rotate-[-15deg]`} />
            <div className={`absolute inset-11 rounded-[2.2rem] border ${isDark ? 'border-stone-700/60 bg-stone-900/40' : 'border-stone-200 bg-stone-100/80'} rotate-[12deg]`} />

            <div className="absolute inset-0 z-0">
              <div
                className={`absolute inset-3 rounded-[2rem] border border-dashed opacity-60 ${isDark ? 'border-stone-700 bg-stone-900/30' : 'border-stone-300 bg-stone-100/70'} rotate-[-9deg]`}
              />
              <div
                className={`absolute inset-6 rounded-[2rem] border opacity-75 ${isDark ? 'border-stone-800 bg-stone-900/50' : 'border-stone-200 bg-white/80'} rotate-[10deg]`}
              />
            </div>

            <div
              key={`${activeProject.title}-${isDark}`}
              style={{ '--project-direction': direction > 0 ? 1 : -1 }}
              className={`project-card-shell ${isSwitching ? 'project-card-shell--switching' : ''} absolute inset-0 z-10 flex flex-col overflow-hidden rounded-[2rem] border p-4 shadow-[0_28px_70px_rgba(0,0,0,0.32)] ${isDark ? 'border-stone-800 bg-stone-900/90' : 'border-stone-200 bg-white/90'}`}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className={`rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.22em] ${isDark ? 'border-stone-700 bg-stone-800/80 text-stone-300' : 'border-stone-200 bg-stone-100 text-stone-700'}`}>
                  Featured project
                </span>
                <span className={`text-[10px] font-medium uppercase tracking-[0.24em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  {activeProject.category}
                </span>
              </div>

              <div className="mb-4 overflow-hidden rounded-[1.4rem] border border-stone-700/20">
                <ProjectPreview link={activeProject.link} title={activeProject.title} isDark={isDark} />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    {activeProject.title}
                  </h3>
                </div>

                <p className={`text-sm leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                  {activeProject.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {activeProject.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] ${isDark ? 'border-stone-700 bg-stone-800 text-stone-200' : 'border-stone-200 bg-stone-100 text-stone-700'}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`mt-5 flex items-center justify-between gap-3 border-t pt-4 text-xs uppercase tracking-[0.22em] ${isDark ? 'border-stone-700/60' : 'border-stone-200/80'}`}>
                <div className="flex items-center gap-2">
                  {featuredProjects.map((project, index) => (
                    <button
                      key={project.title}
                      type="button"
                      aria-label={`Show ${project.title}`}
                      onClick={() => goToProject(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex
                        ? isDark ? 'w-8 bg-white' : 'w-8 bg-stone-900'
                        : isDark ? 'w-2.5 bg-stone-700 hover:bg-stone-500' : 'w-2.5 bg-stone-300 hover:bg-stone-500'}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous project"
                    onClick={goToPrevious}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border text-lg leading-none transition duration-200 ${isDark ? 'border-stone-700 bg-stone-800 text-stone-200 hover:border-stone-500' : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'}`}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    aria-label="Next project"
                    onClick={goToNext}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border text-lg leading-none transition duration-200 ${isDark ? 'border-stone-700 bg-stone-800 text-stone-200 hover:border-stone-500' : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'}`}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex justify-start lg:col-span-2">
          <a
            href="#projects"
            className={`group flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] ${isDark ? 'text-stone-400 hover:text-stone-200' : 'text-stone-600 hover:text-stone-900'}`}
            aria-label="Scroll down to projects"
          >
            <span>Scroll</span>
            <span className={`flex h-8 w-5 items-center justify-center rounded-full border ${isDark ? 'border-stone-600' : 'border-stone-300'}`}>
              <span className={`scroll-indicator h-2 w-2 rounded-full ${isDark ? 'bg-stone-100' : 'bg-stone-900'}`} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}