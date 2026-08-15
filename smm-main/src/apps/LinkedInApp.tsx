import { Award, Briefcase } from 'lucide-react';
import { PROFILE, LINKEDIN } from '@/data/portfolio';
import { useOS } from '@/os/OSContext';

export default function LinkedInApp() {
  const { settings } = useOS();
  const dark = settings.darkMode;

  return (
    <div className="p-5">
      {/* Banner + profile */}
      <div className="rounded-xl overflow-hidden mb-4 border" style={{ borderColor: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
        <div className="h-20 bg-gradient-to-r from-blue-600 to-blue-800" />
        <div className="p-3 -mt-10">
          <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-lg">
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-xl font-bold text-white">
              SK
            </div>
          </div>
          <h2 className="text-lg font-bold mt-2">{PROFILE.name}</h2>
          <p className={`text-[12px] ${dark ? 'text-white/65' : 'text-black/60'}`}>{PROFILE.title}</p>
          <p className={`text-[11px] mt-0.5 ${dark ? 'text-white/50' : 'text-black/50'}`}>{PROFILE.location}</p>
          <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" className="inline-block mt-2 px-3 py-1.5 rounded-full text-[12px] font-semibold text-white" style={{ background: '#0a66c2' }}>
            Visit Profile
          </a>
        </div>
      </div>

      {/* About */}
      <Section title="About" dark={dark}>
        <p className={`text-[12px] leading-relaxed ${dark ? 'text-white/70' : 'text-black/65'}`}>{LINKEDIN.about}</p>
      </Section>

      {/* Skills */}
      <Section title="Skills" dark={dark}>
        <div className="flex flex-wrap gap-1.5">
          {LINKEDIN.skills.map((s) => (
            <span key={s} className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${dark ? 'bg-white/10' : 'bg-black/5'}`}>{s}</span>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section title="Experience" dark={dark} icon={<Briefcase size={13} />}>
        {LINKEDIN.experience.map((exp) => (
          <div key={exp.role} className="mb-2">
            <p className="text-[13px] font-semibold">{exp.role}</p>
            <p className={`text-[11px] ${dark ? 'text-white/55' : 'text-black/55'}`}>{exp.period}</p>
            <p className={`text-[12px] leading-snug ${dark ? 'text-white/65' : 'text-black/60'}`}>{exp.desc}</p>
          </div>
        ))}
      </Section>

      {/* Certifications */}
      <Section title="Certifications" dark={dark} icon={<Award size={13} />}>
        {LINKEDIN.certifications.map((c) => (
          <div key={c} className={`flex items-center gap-2 mb-1.5 text-[12px] ${dark ? 'text-white/70' : 'text-black/65'}`}>
            <Award size={13} className="text-amber-500 shrink-0" />
            {c}
          </div>
        ))}
      </Section>
    </div>
  );
}

function Section({ title, children, dark, icon }: { title: string; children: React.ReactNode; dark: boolean; icon?: React.ReactNode }) {
  return (
    <div className={`rounded-xl p-3 mb-3 ${dark ? 'bg-white/5' : 'bg-black/5'}`}>
      <h3 className="text-[13px] font-bold mb-2 flex items-center gap-1.5">{icon}{title}</h3>
      {children}
    </div>
  );
}
