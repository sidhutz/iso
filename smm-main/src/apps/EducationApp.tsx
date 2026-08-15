import { useEffect, useState } from 'react';
import { EDUCATION } from '@/data/portfolio';
import { useOS } from '@/os/OSContext';

export default function EducationApp() {
  const { settings } = useOS();
  const dark = settings.darkMode;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-lg font-bold mb-1">Education & Certifications</h2>
      <p className={`text-xs mb-5 ${dark ? 'text-white/60' : 'text-black/55'}`}>My academic journey and achievements.</p>

      <div className="relative pl-6">
        <div className={`absolute left-2 top-2 bottom-2 w-0.5 ${dark ? 'bg-white/15' : 'bg-black/15'}`} />
        {EDUCATION.map((item, i) => (
          <div
            key={item.title}
            className="relative mb-5 animate-slide-up"
            style={{ animationDelay: `${i * 120}ms`, opacity: visible ? 1 : 0, animationFillMode: 'forwards' }}
          >
            <div
              className="absolute -left-[18px] top-1.5 h-3 w-3 rounded-full border-2 border-white shadow"
              style={{ background: 'var(--accent)' }}
            />
            <div className={`rounded-lg p-3 ${dark ? 'bg-white/5' : 'bg-black/5'}`}>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ background: 'var(--accent)', color: 'white' }}>
                  {item.tag}
                </span>
                <span className={`text-[11px] ${dark ? 'text-white/50' : 'text-black/50'}`}>{item.period}</span>
              </div>
              <h3 className="font-semibold text-[14px] mt-2">{item.title}</h3>
              <p className="text-[12px] font-medium" style={{ color: 'var(--accent)' }}>{item.org}</p>
              <p className={`text-[12px] leading-relaxed mt-1 ${dark ? 'text-white/65' : 'text-black/60'}`}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
