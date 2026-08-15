import { useEffect, useState } from 'react';
import { SKILLS, type Skill } from '@/data/portfolio';
import { useOS } from '@/os/OSContext';

const ICONS: Record<string, string> = {
  code: '</>',
  palette: '🎨',
  braces: '{ }',
  atom: '⚛',
  hash: '#',
  plus: 'C++',
  terminal: '>_',
  database: '🗄',
  'git-branch': '⎇',
  sparkles: '✦',
};

export default function SkillsApp() {
  const { settings } = useOS();
  const dark = settings.darkMode;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-lg font-bold mb-1">Skills Dashboard</h2>
      <p className={`text-xs mb-4 ${dark ? 'text-white/60' : 'text-black/55'}`}>Technologies I work with and my proficiency.</p>

      {/* Circular indicators row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {SKILLS.slice(0, 3).map((s, i) => (
          <CircleSkill key={s.name} skill={s} delay={i * 120} visible={visible} />
        ))}
      </div>

      {/* Progress bars */}
      <div className="space-y-2.5">
        {SKILLS.map((skill, i) => (
          <BarSkill key={skill.name} skill={skill} index={i} visible={visible} dark={dark} />
        ))}
      </div>
    </div>
  );
}

function CircleSkill({ skill, delay, visible }: { skill: Skill; delay: number; visible: boolean }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const offset = visible ? c - (skill.level / 100) * c : c;
  return (
    <div className="flex flex-col items-center">
      <svg width="70" height="70" viewBox="0 0 70 70" style={{ transitionDelay: `${delay}ms` }}>
        <circle cx="35" cy="35" r={r} fill="none" stroke="rgba(128,128,128,0.2)" strokeWidth="5" />
        <circle
          cx="35"
          cy="35"
          r={r}
          fill="none"
          stroke={skill.color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform="rotate(-90 35 35)"
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1)' }}
        />
        <text x="35" y="39" textAnchor="middle" fontSize="14" fontWeight="700" fill="currentColor">{skill.level}</text>
      </svg>
      <span className="text-[11px] font-medium mt-1">{skill.name}</span>
    </div>
  );
}

function BarSkill({ skill, index, visible, dark }: { skill: Skill; index: number; visible: boolean; dark: boolean }) {
  return (
    <div className="flex items-center gap-3 animate-slide-up" style={{ animationDelay: `${index * 60}ms`, opacity: 0, animationFillMode: 'forwards' }}>
      <div
        className="h-9 w-9 rounded-lg flex items-center justify-center text-[11px] font-bold text-white shrink-0 shadow"
        style={{ background: skill.color }}
      >
        {ICONS[skill.icon] ?? '◆'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between text-[12px] mb-1">
          <span className="font-medium">{skill.name}</span>
          <span className={`tabular-nums ${dark ? 'text-white/60' : 'text-black/55'}`}>{skill.level}%</span>
        </div>
        <div className={`h-2 rounded-full overflow-hidden ${dark ? 'bg-white/10' : 'bg-black/10'}`}>
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: visible ? `${skill.level}%` : '0%',
              background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc)`,
              transitionDelay: `${index * 60}ms`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
