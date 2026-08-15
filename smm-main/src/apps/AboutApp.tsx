import { useEffect, useState } from 'react';
import { Github, Linkedin, Instagram, Mail, MapPin, Sparkles } from 'lucide-react';
import { PROFILE } from '@/data/portfolio';
import { useOS } from '@/os/OSContext';

const FULL_TEXT = PROFILE.bio;

export default function AboutApp() {
  const { openApp, settings } = useOS();
  const dark = settings.darkMode;
  const [typed, setTyped] = useState('');

  useEffect(() => {
    setTyped('');
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setTyped(FULL_TEXT.slice(0, i));
      if (i >= FULL_TEXT.length) clearInterval(t);
    }, 22);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="p-6 flex flex-col items-center text-center">
      <div className="relative">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center text-5xl font-bold text-white shadow-xl ring-4 ring-white/30">
          SK
        </div>
        <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
        </div>
      </div>

      <h1 className="mt-4 text-2xl font-bold">{PROFILE.name}</h1>
      <p className={`text-sm font-medium mt-0.5 ${dark ? 'text-white/70' : 'text-black/60'}`}>{PROFILE.shortTitle}</p>

      <div className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs ${dark ? 'bg-white/10' : 'bg-black/5'}`}>
        <MapPin size={12} /> {PROFILE.location}
        <span className="opacity-40">·</span>
        <Sparkles size={12} className="text-amber-400" /> Available for opportunities
      </div>

      <p className={`mt-4 text-[13px] leading-relaxed typing-caret min-h-[60px] ${dark ? 'text-white/80' : 'text-black/70'}`}>
        {typed}
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {PROFILE.interests.map((interest) => (
          <span key={interest} className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${dark ? 'bg-white/10 text-white/80' : 'bg-black/5 text-black/70'}`}>
            {interest}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <SocialBtn icon={<Github size={18} />} label="GitHub" onClick={() => openApp('github')} />
        <SocialBtn icon={<Linkedin size={18} />} label="LinkedIn" onClick={() => openApp('linkedin')} />
        <SocialBtn icon={<Instagram size={18} />} label="Instagram" href={PROFILE.links.instagram} />
        <SocialBtn icon={<Mail size={18} />} label="Email" onClick={() => openApp('contact')} />
      </div>

      <button
        onClick={() => openApp('resume')}
        className="mt-5 px-5 py-2 rounded-lg text-white text-sm font-medium shadow-md hover:brightness-110 transition-all"
        style={{ background: 'var(--accent)' }}
      >
        View Resume
      </button>
    </div>
  );
}

function SocialBtn({ icon, label, onClick, href }: { icon: React.ReactNode; label: string; onClick?: () => void; href?: string }) {
  const { settings } = useOS();
  const dark = settings.darkMode;
  const cls = `h-10 w-10 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
    dark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-black/70'
  }`;
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls} title={label}>
        {icon}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls} title={label}>
      {icon}
    </button>
  );
}
