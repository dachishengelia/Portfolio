import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import { personalInfo } from './data/portfolioData';

const socialLinks = [
  { label: 'Email', href: `mailto:${personalInfo.email}`, value: personalInfo.email },
  { label: 'Discord', href: personalInfo.socials.discord, value: 'discord.gg/nerooooooooooo' },
  { label: 'Facebook', href: personalInfo.socials.facebook, value: 'facebook.com/dachi.shengelia.248212' },
  { label: 'Instagram', href: personalInfo.socials.instagram, value: '@dachiishengelia' },
  { label: 'GitHub', href: personalInfo.socials.github, value: 'github.com/dachishengelia' },
  { label: 'YouTube', href: personalInfo.socials.youtube, value: '@neroneornoeroo' },
];

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [projectView, setProjectView] = useState('featured');
  const [isSystemView, setIsSystemView] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [projectView]);

  useEffect(() => {
    const root = document.documentElement;
    const thumb = isDark ? 'rgba(250, 250, 249, 0.78)' : 'rgba(82, 82, 91, 0.72)';
    const thumbHover = isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(63, 63, 70, 0.9)';
    const track = isDark ? 'rgba(24, 24, 27, 0.28)' : 'rgba(255, 255, 255, 0.4)';

    root.style.setProperty('--scrollbar-thumb', thumb);
    root.style.setProperty('--scrollbar-thumb-hover', thumbHover);
    root.style.setProperty('--scrollbar-track', track);
    root.style.colorScheme = isDark ? 'dark' : 'light';
  }, [isDark]);

  const palette = isDark
    ? 'bg-stone-950 text-stone-100'
    : 'bg-white text-stone-900';

  const showAllProjects = projectView === 'all';

  return (
    <div key={isDark ? 'dark' : 'light'} className={`theme-shell min-h-screen transition-[background-color,color,box-shadow,filter] duration-700 ease-out ${palette}`}>
      <div className="mx-auto max-w-6xl">
        <Navbar isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />

        {showAllProjects ? (
          <Projects
            isDark={isDark}
            mode="all"
            isSystemView={isSystemView}
            onToggleSystemView={() => setIsSystemView((current) => !current)}
            onBackToFeatured={() => {
              setProjectView('featured');
              setIsSystemView(false);
            }}
          />
        ) : (
          <>
            <Hero isDark={isDark} />
            <Projects
              isDark={isDark}
              mode="featured"
              onOpenAll={() => setProjectView('all')}
            />
            <Skills isDark={isDark} />

            <section id="contact" className="px-6 py-20">
              <div className={`rounded-3xl border p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)] ${isDark ? 'border-stone-800 bg-stone-900/80' : 'border-stone-200 bg-white/80'}`}>
                <div className="mb-8 flex items-end justify-between gap-4">
                  <div>
                    <p className={`text-xs font-medium uppercase tracking-[0.28em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                      Contact
                    </p>
                    <h2 className={`mt-3 text-3xl font-semibold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                      Let&apos;s connect
                    </h2>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`rounded-2xl border p-4 transition duration-200 ${isDark ? 'border-stone-800 bg-stone-950/60 text-stone-300 hover:border-stone-600 hover:text-white' : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300 hover:text-stone-900'}`}
                    >
                      <div className={`text-[10px] font-medium uppercase tracking-[0.24em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                        {link.label}
                      </div>
                      <div className="mt-2 break-all text-sm md:text-base">{link.value}</div>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </div>

      <footer className={`border-t py-8 text-center text-sm ${isDark ? 'border-stone-800 text-stone-500' : 'border-stone-200 text-stone-600'}`}>
        <p>with React & Tailwind CSS ;) </p>
      </footer>
    </div>
  );
}