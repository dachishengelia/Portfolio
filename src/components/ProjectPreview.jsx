import { useState, useEffect } from 'react';

export default function ProjectPreview({ link, title, isDark }) {
  const [screenshotUrl, setScreenshotUrl] = useState(null);
  const [loading, setLoading] = useState(!!link && link !== '#');

  useEffect(() => {
    if (!link || link === '#') return;

    let cancelled = false;

    fetch(`https://api.microlink.io/?url=${encodeURIComponent(link)}&screenshot=true`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data?.data?.screenshot?.url) {
          setScreenshotUrl(data.data.screenshot.url);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [link]);

  if (!link || link === '#') {
    return (
      <div
        className={`mb-4 flex h-44 w-full items-center justify-center rounded-xl text-xs font-medium ${isDark ? 'bg-stone-800 text-stone-600' : 'bg-stone-200 text-stone-500'}`}
      >
        Preview coming soon
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mb-4 h-44 w-full animate-pulse rounded-xl bg-stone-700/50" />
    );
  }

  if (screenshotUrl) {
    return (
      <img
        src={screenshotUrl}
        alt={`${title} preview`}
        className="mb-4 h-44 w-full rounded-xl object-cover"
      />
    );
  }

  return (
    <div
      className={`mb-4 flex h-44 w-full items-center justify-center rounded-xl text-xs font-medium ${isDark ? 'bg-stone-800 text-stone-600' : 'bg-stone-200 text-stone-500'}`}
    >
      Preview coming soon
    </div>
  );
}
