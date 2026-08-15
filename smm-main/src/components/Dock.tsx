import { useRef, useState } from 'react';
import { useOS, type AppId } from '@/os/OSContext';

interface DockItem {
  appId: AppId;
  label: string;
  emoji: string;
  gradient: string;
}

const DOCK_ITEMS: DockItem[] = [
  { appId: 'about', label: 'Finder', emoji: '🗂️', gradient: 'from-sky-400 to-blue-500' },
  { appId: 'about', label: 'About', emoji: '👤', gradient: 'from-sky-400 to-blue-500' },
  { appId: 'skills', label: 'Skills', emoji: '💻', gradient: 'from-violet-500 to-purple-500' },
  { appId: 'projects', label: 'Projects', emoji: '🚀', gradient: 'from-fuchsia-500 to-pink-500' },
  { appId: 'resume', label: 'Resume', emoji: '📄', gradient: 'from-slate-400 to-slate-600' },
  { appId: 'github', label: 'GitHub', emoji: '🔗', gradient: 'from-gray-700 to-gray-900' },
  { appId: 'linkedin', label: 'LinkedIn', emoji: '💼', gradient: 'from-blue-500 to-blue-700' },
  { appId: 'contact', label: 'Contact', emoji: '📞', gradient: 'from-emerald-400 to-green-500' },
  { appId: 'terminal', label: 'Terminal', emoji: '⌨️', gradient: 'from-zinc-700 to-black' },
];

const BASE = 48;
const MAX = 78;

export default function Dock() {
  const { openApp, windows } = useOS();
  const [mouseX, setMouseX] = useState<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function getScale(index: number): number {
    if (mouseX === null) return 1;
    const el = itemRefs.current[index];
    if (!el) return 1;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const dist = Math.abs(mouseX - center);
    const maxDist = 140;
    if (dist > maxDist) return 1;
    const t = 1 - dist / maxDist;
    return 1 + t * (MAX / BASE - 1);
  }

  const openAppIds = new Set(windows.map((w) => w.appId));

  return (
    <div className="fixed bottom-1 left-1/2 -translate-x-1/2 z-[9000] flex items-end justify-center pointer-events-none">
      <div
        ref={dockRef}
        className="pointer-events-auto flex items-end gap-1.5 px-2.5 py-1.5 rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.22)',
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.22)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.28), inset 0 0 0 0.5px rgba(255,255,255,0.1)',
        }}
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => setMouseX(null)}
      >
        {DOCK_ITEMS.map((item, i) => {
          const scale = getScale(i);
          const isOpen = openAppIds.has(item.appId);
          return (
            <div key={i} className="flex flex-col items-center">
              <button
                ref={(el) => { itemRefs.current[i] = el; }}
                className="dock-icon relative group flex flex-col items-center"
                style={{ transform: `scale(${scale})`, transformOrigin: 'bottom center' }}
                onClick={() => openApp(item.appId)}
                title={item.label}
              >
                <div
                  className={`flex items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} shadow-md`}
                  style={{ width: BASE, height: BASE, fontSize: 24 }}
                >
                  <span className="drop-shadow-sm">{item.emoji}</span>
                </div>
                <span className="absolute -top-7 px-2 py-0.5 rounded-md text-[11px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm pointer-events-none">
                  {item.label}
                </span>
              </button>
              <div className={`h-1 w-1 rounded-full mt-0.5 transition-opacity ${isOpen ? 'bg-black/70 opacity-100' : 'opacity-0'}`} />
            </div>
          );
        })}
        {/* Divider */}
        <div className="self-stretch w-px bg-white/25 mx-0.5" />
        <button
          className="dock-icon relative group flex flex-col items-center"
          onClick={() => openApp('settings')}
          title="System Settings"
        >
          <div
            className="flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-400 to-gray-600 shadow-md"
            style={{ width: BASE, height: BASE, fontSize: 24 }}
          >
            ⚙️
          </div>
          <span className="absolute -top-7 px-2 py-0.5 rounded-md text-[11px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm pointer-events-none">
            Settings
          </span>
        </button>
      </div>
    </div>
  );
}

