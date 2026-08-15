import { Download, Printer, ExternalLink } from 'lucide-react';
import { PROFILE, SKILLS, EDUCATION, PROJECTS } from '@/data/portfolio';
import { useOS } from '@/os/OSContext';

export default function ResumeApp() {
  const { settings } = useOS();
  const dark = settings.darkMode;

  function handlePrint() {
    window.print();
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className={`flex items-center gap-2 px-3 py-2 border-b ${dark ? 'border-white/10' : 'border-black/10'}`}>
        <button onClick={handlePrint} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-medium hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
          <Printer size={13} /> Print
        </button>
        <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-medium hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
          <ExternalLink size={13} /> Open in New Tab
        </button>
        <div className="flex-1" />
        <button className="flex items-center gap-1.5 px-3 py-1 rounded-md text-[12px] font-medium text-white transition-all hover:brightness-110" style={{ background: 'var(--accent)' }}>
          <Download size={13} /> Download
        </button>
      </div>

      {/* Resume page */}
      <div className="flex-1 overflow-y-auto scrollbar-thin bg-white text-black p-8" style={{ boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)' }}>
        <div className="max-w-[620px] mx-auto">
          <div className="border-b-2 border-gray-200 pb-4">
            <h1 className="text-3xl font-bold tracking-tight">{PROFILE.name}</h1>
            <p className="text-sm text-gray-600 mt-1">{PROFILE.title}</p>
            <p className="text-xs text-gray-500 mt-2">
              {PROFILE.email} · {PROFILE.phone} · {PROFILE.location}
            </p>
          </div>

          <Section title="Summary">
            <p className="text-[13px] leading-relaxed text-gray-700">{PROFILE.bio}</p>
          </Section>

          <Section title="Skills">
            <div className="grid grid-cols-2 gap-x-6 gap-y-1">
              {SKILLS.map((s) => (
                <div key={s.name} className="flex justify-between text-[12px]">
                  <span className="font-medium text-gray-800">{s.name}</span>
                  <span className="text-gray-500">{s.level}%</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Education">
            {EDUCATION.map((e) => (
              <div key={e.title} className="mb-2">
                <div className="flex justify-between">
                  <span className="text-[13px] font-semibold text-gray-800">{e.title}</span>
                  <span className="text-[11px] text-gray-500">{e.period}</span>
                </div>
                <p className="text-[12px] text-gray-600">{e.org}</p>
                <p className="text-[12px] text-gray-500 leading-snug">{e.description}</p>
              </div>
            ))}
          </Section>

          <Section title="Projects">
            {PROJECTS.map((p) => (
              <div key={p.name} className="mb-2">
                <span className="text-[13px] font-semibold text-gray-800">{p.name}</span>
                <p className="text-[12px] text-gray-600 leading-snug">{p.description}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Tech: {p.tech.join(', ')}</p>
              </div>
            ))}
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h2 className="text-[13px] font-bold uppercase tracking-wider text-gray-700 border-b border-gray-200 pb-1 mb-2">{title}</h2>
      {children}
    </div>
  );
}
