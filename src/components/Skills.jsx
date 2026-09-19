import { techStack, currentLearning, funFacts } from '../data/portfolioData';

export default function Skills({ isDark }) {
  return (
    <section id="skills" className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.2fr_0.8fr]">
      <div>
        <p className={`text-xs font-medium uppercase tracking-[0.28em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
          Stack
        </p>
        <h2 className={`mt-3 mb-6 text-3xl font-semibold ${isDark ? 'text-white' : 'text-stone-900'}`}>
          Tools I use
        </h2>

        <div className="flex flex-wrap gap-2.5">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className={`rounded-full border px-3.5 py-2 text-sm ${isDark ? 'border-stone-700 bg-stone-900 text-stone-200' : 'border-stone-200 bg-white text-stone-700'}`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className={`mb-4 text-xl font-semibold ${isDark ? 'text-white' : 'text-stone-900'}`}>
            What I&apos;m learning
          </h2>
          <ul className={`space-y-3 text-sm ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
            {currentLearning.map((item, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <span className={isDark ? 'text-stone-200' : 'text-stone-800'}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={`mb-4 text-xl font-semibold ${isDark ? 'text-white' : 'text-stone-900'}`}>
            Fun facts
          </h2>
          <ul className={`space-y-3 text-sm ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
            {funFacts.map((fact, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <span className={isDark ? 'text-stone-200' : 'text-stone-800'}>•</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}