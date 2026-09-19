import { useEffect, useRef, useState } from 'react';
import { projects } from '../data/portfolioData';
import ProjectPreview from './ProjectPreview';

const desktopPositions = [
  { x: 79, y: 18 },
  { x: 81, y: 79 },
  { x: 19, y: 79 },
  { x: 17, y: 18 },
  { x: 50, y: 50 },
];

const compactPositions = [
  { x: 50, y: 13 },
  { x: 50, y: 34 },
  { x: 50, y: 55 },
  { x: 50, y: 76 },
  { x: 50, y: 90 },
];

function ProjectIcon({ category }) {
  if (category === 'Backend') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5.5" rx="7" ry="2.8" />
        <path d="M5 5.5v13c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8v-13" />
        <path d="M5 12c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8" />
      </svg>
    );
  }

  if (category === 'Frontend') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18" />
        <path d="M6.5 6.5h.01M9.5 6.5h.01" />
        <path d="M8 14l2 2 6-6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 3v4M16 3v4M4.5 7h15M4.5 12h15M4.5 17h15" />
      <path d="M8 21v-4M16 21v-4" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 3H3.5A1.5 1.5 0 0 0 2 4.5v8A1.5 1.5 0 0 0 3.5 14h8a1.5 1.5 0 0 0 1.5-1.5V10" />
      <path d="M8 8h6v6M14 8L7 15" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <path d="M3 3l10 10M13 3L3 13" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 3L5 8l5 5" />
    </svg>
  );
}

export default function Projects({ isDark, mode = 'featured', onOpenAll, onBackToFeatured, isSystemView = false, onToggleSystemView }) {
  const isAllView = mode === 'all';
  const scrollRef = useRef(null);
  const [hasScrolledRight, setHasScrolledRight] = useState(false);
  const [isAtRightEnd, setIsAtRightEnd] = useState(false);
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [isCompact, setIsCompact] = useState(false);
  const positions = isCompact ? compactPositions : desktopPositions;

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;

    const handleScroll = () => {
      const maxScrollLeft = node.scrollWidth - node.clientWidth;
      setHasScrolledRight(node.scrollLeft > 12);
      setIsAtRightEnd(node.scrollLeft >= maxScrollLeft - 12);
    };

    handleScroll();
    node.addEventListener('scroll', handleScroll);

    return () => node.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateLayout = () => setIsCompact(mediaQuery.matches);

    updateLayout();
    mediaQuery.addEventListener('change', updateLayout);

    return () => mediaQuery.removeEventListener('change', updateLayout);
  }, []);

  const handleNodeKeyDown = (event, index) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowDown' && event.key !== 'ArrowLeft' && event.key !== 'ArrowUp') return;

    event.preventDefault();
    const direction = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
    const nextIndex = (index + direction + projects.length) % projects.length;
    setSelectedProject(projects[nextIndex]);
  };

  if (isAllView) {
    return (
      <section id="all-projects" className="mx-auto max-w-5xl px-6 py-16">
        {isSystemView ? (
          <div className="project-system">
            <div className="project-system__header">
              <div className="project-system__intro">
                <p className="project-system__eyebrow">Interactive work map</p>
                <h2 className="project-system__title">The system</h2>
                <p className="project-system__description">
                  A connected view of the products, platforms, and backend systems I build.
                </p>
              </div>

              <div className="project-system__actions">
                <button
                  type="button"
                  onClick={onBackToFeatured}
                  className="project-system__button project-system__button--secondary"
                >
                  <ArrowLeftIcon />
                  <span>Back to featured</span>
                </button>

                <button
                  type="button"
                  onClick={onToggleSystemView}
                  className="project-system__button project-system__button--primary"
                  aria-pressed="true"
                >
                  <span className="project-system__button-icon" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span>View as list</span>
                </button>
              </div>
            </div>

            <div className={`project-system__layout ${isCompact ? 'project-system__layout--compact' : ''}`}>
              <div className="project-system__stage">
                <div className="project-system__grid" aria-hidden="true" />
                <div className="project-system__glow project-system__glow--one" aria-hidden="true" />
                <div className="project-system__glow project-system__glow--two" aria-hidden="true" />

                <svg className="project-system__connectors" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">
                  {projects.map((project, index) => {
                    const position = positions[index] ?? { x: 50, y: 50 };

                    return (
                      <line
                        key={`connector-${project.title}`}
                        className={`project-system__connector ${selectedProject?.title === project.title ? 'project-system__connector--active' : ''}`}
                        style={{ '--connector-accent': project.accent }}
                        x1="50%"
                        y1="50%"
                        x2={`${position.x}%`}
                        y2={`${position.y}%`}
                      />
                    );
                  })}
                </svg>

                <div className="project-system__core" aria-label="Dachi Shengelia, full-stack developer">
                  <span className="project-system__core-glow" aria-hidden="true" />
                  <span className="project-system__core-mark">DS</span>
                  <span className="project-system__core-copy">
                    <strong>Dachi Shengelia</strong>
                    <span>Full-stack developer</span>
                  </span>
                </div>

                {projects.map((project, index) => {
                  const position = positions[index] ?? { x: 50, y: 50 };
                  const isSelected = selectedProject?.title === project.title;

                  return (
                    <button
                      key={`system-${project.title}`}
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      onKeyDown={(event) => handleNodeKeyDown(event, index)}
                      aria-pressed={isSelected}
                      aria-label={`View ${project.title} details`}
                      className={`project-system__node ${isSelected ? 'project-system__node--selected' : ''}`}
                      style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`,
                        '--project-accent': project.accent,
                        '--node-delay': `${index * 90}ms`,
                      }}
                    >
                      <span className="project-system__node-ring" aria-hidden="true" />
                      <span className="project-system__node-icon">
                        <ProjectIcon category={project.category} />
                      </span>
                      <span className="project-system__node-copy">
                        <span className="project-system__node-meta">
                          <span>{project.category}</span>
                          <span className={`project-system__status project-system__status--${project.status.toLowerCase()}`}>
                            <span aria-hidden="true" />
                            {project.status}
                          </span>
                        </span>
                        <strong>{project.title}</strong>
                        <span className="project-system__node-tags">{project.tags.slice(0, 2).join(' + ')}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <aside className={`project-system__panel ${selectedProject ? 'project-system__panel--open' : ''}`} aria-live="polite">
                {selectedProject && (
                  <>
                    <button
                      type="button"
                      className="project-system__panel-close"
                      onClick={() => setSelectedProject(null)}
                      aria-label="Close project details"
                    >
                      <CloseIcon />
                    </button>

                    <div className="project-system__panel-accent" style={{ '--project-accent': selectedProject.accent }} aria-hidden="true" />

                    <div className="project-system__panel-heading">
                      <span className="project-system__panel-category">{selectedProject.category}</span>
                      <span className={`project-system__panel-status project-system__status--${selectedProject.status.toLowerCase()}`}>
                        <span aria-hidden="true" />
                        {selectedProject.status}
                      </span>
                    </div>

                    <h3 className="project-system__panel-title">{selectedProject.title}</h3>
                    <p className="project-system__panel-summary">{selectedProject.summary}</p>
                    <p className="project-system__panel-description">{selectedProject.description}</p>

                    <div className="project-system__panel-tags" aria-label="Technologies">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    <div className="project-system__panel-impact">
                      <span className="project-system__panel-label">Why it matters</span>
                      <p>{selectedProject.impact}</p>
                    </div>

                    {selectedProject.link === '#' ? (
                      <span className="project-system__panel-private">Private project · case study available on request</span>
                    ) : (
                      <a
                        className="project-system__panel-link"
                        href={selectedProject.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${selectedProject.title} in a new tab`}
                      >
                        <span>Open project</span>
                        <ExternalLinkIcon />
                      </a>
                    )}
                  </>
                )}

                {!selectedProject && (
                  <div className="project-system__panel-empty">
                    <span className="project-system__panel-empty-icon" aria-hidden="true">↗</span>
                    <h3>Select a project</h3>
                    <p>Choose a node to explore the work, stack, and story behind it.</p>
                  </div>
                )}
              </aside>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className={`text-xs font-medium uppercase tracking-[0.28em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  All work
                </p>
                <h2 className={`mt-3 text-3xl font-semibold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                  Projects
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onBackToFeatured}
                  className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition duration-200 ${isDark ? 'border-stone-700 bg-stone-900 text-stone-200 hover:border-stone-500 hover:text-white' : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:text-stone-900'}`}
                >
                  Back to featured
                </button>
              </div>
            </div>

            {projects.map((project, index) => (
              <article
                key={`${project.title}-${index}`}
                className={`flex flex-col gap-6 rounded-3xl border p-6 transition duration-200 md:flex-row ${isDark ? 'border-stone-800 bg-stone-900/80 hover:border-stone-700' : 'border-stone-200 bg-white/80 hover:border-stone-300'}`}
              >
                <div className="md:w-[280px] md:flex-shrink-0">
                  <ProjectPreview link={project.link} title={project.title} isDark={isDark} />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                      {project.title}
                    </h3>
                    <span className={`rounded-full border px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] ${isDark ? 'border-stone-700 text-stone-400' : 'border-stone-200 text-stone-600'}`}>
                      {project.category}
                    </span>
                  </div>

                  <p className={`mb-5 text-sm leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                    {project.description}
                  </p>

                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.tags.map((tag, tIndex) => (
                      <span
                        key={tIndex}
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${isDark ? 'border-stone-700 bg-stone-800 text-stone-200' : 'border-stone-200 bg-stone-100 text-stone-700'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1.5 text-sm font-medium transition duration-200 ${isDark ? 'text-stone-200 hover:text-white' : 'text-stone-800 hover:text-stone-900'}`}
                  >
                    <span>Live Preview</span>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={`flex-shrink-0 ${isDark ? 'text-stone-200' : 'text-stone-800'}`}>
                      <path d="M3 3L12 3M12 3L12 12M12 3L3 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    );
  }

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className={`text-xs font-medium uppercase tracking-[0.28em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
            Selected work
          </p>
          <h2 className={`mt-3 text-3xl font-semibold ${isDark ? 'text-white' : 'text-stone-900'}`}>
            Featured Projects
          </h2>
        </div>

        <button
          type="button"
          onClick={onOpenAll}
          className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition duration-200 ${isDark ? 'border-stone-700 bg-stone-900 text-stone-200 hover:border-stone-500 hover:text-white' : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:text-stone-900'}`}
        >
          See all
        </button>
      </div>

      <div className="relative">
        <div
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r transition-opacity duration-300 ${hasScrolledRight ? 'opacity-100' : 'opacity-0'} ${isDark ? 'from-stone-950 to-transparent' : 'from-white to-transparent'} md:w-12`}
        />
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l transition-opacity duration-300 ${isAtRightEnd ? 'opacity-0' : 'opacity-100'} ${isDark ? 'from-stone-950 to-transparent' : 'from-white to-transparent'} md:w-12`}
        />
        <div
          ref={scrollRef}
          className="projects-scroll relative flex gap-6 overflow-x-auto scroll-px-6 snap-x snap-mandatory pb-2"
          style={{
            '--scroll-thumb': isDark ? 'rgba(251, 251, 251, 0.8)' : 'rgba(107, 114, 128, 0.85)',
            '--scroll-thumb-hover': isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(107, 114, 128, 0.95)',
          }}
        >
          {projects.map((project, index) => (
            <article
              key={index}
              className={`flex-shrink-0 flex flex-col min-h-[320px] w-80 snap-start rounded-[2rem] border p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition duration-300 ${isDark ? 'border-stone-800 bg-stone-900/80 hover:border-stone-700' : 'border-stone-200 bg-white/80 hover:border-stone-300'}`}
            >
              <ProjectPreview link={project.link} title={project.title} isDark={isDark} />

              <div className="mb-5 flex items-center justify-between gap-3">
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                  {project.title}
                </h3>
                <span className={`rounded-full border px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] ${isDark ? 'border-stone-700 text-stone-400' : 'border-stone-200 text-stone-600'}`}>
                  {project.category}
                </span>
              </div>

              <p className={`mb-6 text-sm leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                {project.description}
              </p>

              <div className="mt-auto">
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag, tIndex) => (
                    <span
                      key={tIndex}
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${isDark ? 'border-stone-700 bg-stone-800 text-stone-200' : 'border-stone-200 bg-stone-100 text-stone-700'}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-1.5 text-sm font-medium transition duration-200 ${isDark ? 'text-stone-200 hover:text-white' : 'text-stone-800 hover:text-stone-900'}`}
                >
                  <span>Live Preview</span>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={`flex-shrink-0 ${isDark ? 'text-stone-200' : 'text-stone-800'}`}>
                    <path d="M3 3L12 3M12 3L12 12M12 3L3 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
