import { Github, ExternalLink } from 'lucide-react';
import { PROJECTS } from '@/data/portfolio';
import { useOS } from '@/os/OSContext';

export default function ProjectsApp() {
  const { settings } = useOS();
  const dark = settings.darkMode;

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold">Projects</h2>
          <p className={`text-xs ${dark ? 'text-white/60' : 'text-black/55'}`}>{PROJECTS.length} projects — Finder view</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {PROJECTS.map((p, i) => (
          <div
            key={p.name}
            className={`rounded-xl overflow-hidden border animate-slide-up hover:shadow-lg transition-all ${dark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}
            style={{ animationDelay: `${i * 80}ms`, opacity: 0, animationFillMode: 'forwards' }}
          >
            <div className={`h-24 bg-gradient-to-br ${p.gradient} flex items-center justify-center text-4xl relative overflow-hidden`}>
              <span className="drop-shadow-lg">{p.emoji}</span>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-[13px]">{p.name}</h3>
              <p className={`text-[11px] leading-snug mt-1 line-clamp-2 ${dark ? 'text-white/60' : 'text-black/55'}`}>{p.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {p.tech.map((t) => (
                  <span key={t} className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${dark ? 'bg-white/10' : 'bg-black/10'}`}>{t}</span>
                ))}
              </div>
              <div className="flex gap-2 mt-3">
                {p.github && (
                  <a href={p.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-black/80 text-white hover:bg-black transition-colors">
                    <Github size={11} /> Code
                  </a>
                )}
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium text-white transition-colors" style={{ background: 'var(--accent)' }}>
                    <ExternalLink size={11} /> Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
