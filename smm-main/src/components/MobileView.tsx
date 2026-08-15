import { useEffect, useState } from 'react';
import { Wifi, Battery, Signal, X, ChevronLeft } from 'lucide-react';
import { useOS, type AppId } from '@/os/OSContext';
import { DESKTOP_ICONS } from '@/data/desktopIcons';
import AboutApp from '@/apps/AboutApp';
import SkillsApp from '@/apps/SkillsApp';
import ProjectsApp from '@/apps/ProjectsApp';
import EducationApp from '@/apps/EducationApp';
import ResumeApp from '@/apps/ResumeApp';
import ContactApp from '@/apps/ContactApp';
import GitHubApp from '@/apps/GitHubApp';
import LinkedInApp from '@/apps/LinkedInApp';
import TerminalApp from '@/apps/TerminalApp';
import SettingsApp from '@/apps/SettingsApp';
import { ExperienceApp, OpportunitiesApp } from '@/apps/ExperienceApp';

const APP_COMPONENTS: Record<AppId, React.ComponentType> = {
  about: AboutApp, skills: SkillsApp, projects: ProjectsApp, education: EducationApp,
  resume: ResumeApp, contact: ContactApp, github: GitHubApp, linkedin: LinkedInApp,
  terminal: TerminalApp, settings: SettingsApp, experience: ExperienceApp, opportunities: OpportunitiesApp,
};

export default function MobileView() {
  const { settings, openApp, wallpaperUrl } = useOS();
  const [active, setActive] = useState<AppId | null>(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: !settings.clock24h });

  const dockApps: AppId[] = ['about', 'projects', 'skills', 'resume', 'github', 'linkedin', 'contact', 'terminal'];

  function open(appId: AppId) {
    setActive(appId);
    openApp(appId);
  }

  const ActiveApp = active ? APP_COMPONENTS[active] : null;

  return (
    <div className="md:hidden relative w-full h-full overflow-hidden" style={{ background: '#000' }}>
      {/* Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${wallpaperUrl})` }}
      />

      {/* Status bar */}
      <div className="absolute top-0 left-0 right-0 h-10 z-50 flex items-center justify-between px-5 text-white text-[13px] font-semibold">
        <span>{time}</span>
        <div className="flex items-center gap-1.5">
          <Signal size={14} />
          <Wifi size={14} />
          <Battery size={16} />
        </div>
      </div>

      {/* App grid */}
      {!active && (
        <div className="absolute inset-0 pt-14 pb-20 px-5 overflow-y-auto scrollbar-thin">
          <div className="grid grid-cols-4 gap-3 gap-y-5">
            {DESKTOP_ICONS.map((icon) => (
              <button key={icon.appId} onClick={() => open(icon.appId)} className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${icon.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                  {icon.emoji}
                </div>
                <span className="text-[10px] text-white font-medium truncate w-full text-center" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>
                  {icon.label}
                </span>
              </button>
            ))}
            <button onClick={() => open('terminal')} className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-zinc-700 to-black flex items-center justify-center text-2xl shadow-lg">⌨️</div>
              <span className="text-[10px] text-white font-medium" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>Terminal</span>
            </button>
            <button onClick={() => open('settings')} className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-2xl shadow-lg">⚙️</div>
              <span className="text-[10px] text-white font-medium" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>Settings</span>
            </button>
          </div>
        </div>
      )}

      {/* Active app full screen */}
      {active && ActiveApp && (
        <div className="absolute inset-0 z-50 flex flex-col animate-fade-in" style={{ background: settings.darkMode ? '#1c1c1e' : '#f5f5f7' }}>
          <div className={`h-12 flex items-center justify-between px-3 shrink-0 ${settings.darkMode ? 'text-white' : 'text-black'}`}>
            <button onClick={() => setActive(null)} className="flex items-center gap-1 text-[14px] font-medium" style={{ color: 'var(--accent)' }}>
              <ChevronLeft size={20} /> Back
            </button>
            <span className="text-[14px] font-semibold">{DESKTOP_ICONS.find((d) => d.appId === active)?.label ?? 'App'}</span>
            <button onClick={() => setActive(null)} style={{ color: 'var(--accent)' }}>
              <X size={20} />
            </button>
          </div>
          <div className={`flex-1 overflow-y-auto scrollbar-thin ${settings.darkMode ? 'scrollbar-thin-dark' : ''}`}>
            <ActiveApp />
          </div>
        </div>
      )}

      {/* Dock */}
      {!active && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-40 flex items-end gap-1 px-2.5 py-2 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(28px) saturate(180%)', WebkitBackdropFilter: 'blur(28px) saturate(180%)', border: '1px solid rgba(255,255,255,0.22)' }}
        >
          {dockApps.map((appId) => {
            const icon = DESKTOP_ICONS.find((d) => d.appId === appId);
            if (!icon) return null;
            return (
              <button key={appId} onClick={() => open(appId)} className="active:scale-90 transition-transform">
                <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${icon.gradient} flex items-center justify-center text-lg shadow-md`}>
                  {icon.emoji}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
