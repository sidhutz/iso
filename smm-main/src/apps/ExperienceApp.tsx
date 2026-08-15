import { Briefcase, TrendingUp } from 'lucide-react';
import { useOS } from '@/os/OSContext';

const EXPERIENCE = [
  { role: 'Freelance Developer', period: '2024 — Present', desc: 'Building websites and small applications for clients. Focused on clean, responsive frontends and reliable backends.' },
  { role: 'Open Source Contributor', period: '2023 — Present', desc: 'Maintaining personal projects on GitHub, contributing fixes and improvements to community repos.' },
  { role: 'Web Development Intern', period: 'Summer 2024', desc: 'Hands-on experience building and deploying web apps using React and modern tooling.' },
];

const OPPORTUNITIES = [
  { title: 'Open to Internships', desc: 'Looking for software development internships to grow my skills.', icon: '🚀' },
  { title: 'Collaborations', desc: 'Happy to collaborate on open source and student projects.', icon: '🤝' },
  { title: 'Freelance Work', desc: 'Available for small freelance web development projects.', icon: '💼' },
  { title: 'Mentorship', desc: 'Eager to learn from experienced developers and mentors.', icon: '🎓' },
];

export function ExperienceApp() {
  const { settings } = useOS();
  const dark = settings.darkMode;
  return (
    <div className="p-5">
      <h2 className="text-lg font-bold mb-1 flex items-center gap-2"><Briefcase size={18} /> Experience</h2>
      <p className={`text-xs mb-5 ${dark ? 'text-white/60' : 'text-black/55'}`}>My journey so far.</p>
      <div className="relative pl-6">
        <div className={`absolute left-2 top-2 bottom-2 w-0.5 ${dark ? 'bg-white/15' : 'bg-black/15'}`} />
        {EXPERIENCE.map((e, i) => (
          <div key={e.role} className="relative mb-4 animate-slide-up" style={{ animationDelay: `${i * 120}ms`, opacity: 0, animationFillMode: 'forwards' }}>
            <div className="absolute -left-[18px] top-1.5 h-3 w-3 rounded-full border-2 border-white shadow" style={{ background: 'var(--accent)' }} />
            <div className={`rounded-lg p-3 ${dark ? 'bg-white/5' : 'bg-black/5'}`}>
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-[13px]">{e.role}</h3>
                <span className={`text-[11px] ${dark ? 'text-white/50' : 'text-black/50'}`}>{e.period}</span>
              </div>
              <p className={`text-[12px] leading-relaxed mt-1 ${dark ? 'text-white/65' : 'text-black/60'}`}>{e.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OpportunitiesApp() {
  const { settings } = useOS();
  const dark = settings.darkMode;
  return (
    <div className="p-5">
      <h2 className="text-lg font-bold mb-1 flex items-center gap-2"><TrendingUp size={18} /> Opportunities</h2>
      <p className={`text-xs mb-5 ${dark ? 'text-white/60' : 'text-black/55'}`}>What I'm currently open to.</p>
      <div className="grid grid-cols-2 gap-3">
        {OPPORTUNITIES.map((o, i) => (
          <div key={o.title} className={`rounded-xl p-3 animate-slide-up ${dark ? 'bg-white/5' : 'bg-black/5'}`} style={{ animationDelay: `${i * 80}ms`, opacity: 0, animationFillMode: 'forwards' }}>
            <div className="text-2xl mb-1">{o.icon}</div>
            <h3 className="font-semibold text-[13px]">{o.title}</h3>
            <p className={`text-[11px] leading-snug mt-1 ${dark ? 'text-white/60' : 'text-black/55'}`}>{o.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
