import { useEffect } from 'react';
import { useOS } from '@/os/OSContext';
import { WALLPAPERS } from '@/data/portfolio';

export interface ContextState {
  x: number;
  y: number;
}

export default function DesktopContextMenu({ state, onClose }: { state: ContextState | null; onClose: () => void }) {
  const { openApp, setWallpaper, settings } = useOS();

  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [onClose]);

  if (!state) return null;

  const x = Math.min(state.x, window.innerWidth - 230);
  const y = Math.min(state.y, window.innerHeight - 360);

  function cycleWallpaper() {
    const idx = WALLPAPERS.findIndex((w) => w.id === settings.wallpaperId);
    const next = WALLPAPERS[(idx + 1) % WALLPAPERS.length];
    setWallpaper(next.id);
  }

  return (
    <>
      <div className="fixed inset-0 z-[9500]" onClick={onClose} onContextMenu={(e) => { e.preventDefault(); onClose(); }} />
      <div
        className="fixed z-[9600] glass-menu rounded-lg p-1 text-black/85 shadow-xl min-w-[210px] text-[13px] animate-scale-in"
        style={{ left: x, top: y }}
      >
        <Item icon="📁" onClick={() => { onClose(); }}>New Folder</Item>
        <Item icon="📁" onClick={() => { onClose(); }}>New Document</Item>
        <Divider />
        <Item icon="ℹ️" onClick={() => { openApp('about'); onClose(); }}>Get Info</Item>
        <Item icon="🖼️" onClick={cycleWallpaper}>Change Wallpaper</Item>
        <Item icon="🔄" onClick={() => { window.location.reload(); }}>Refresh</Item>
        <Divider />
        <Item icon="⌨️" onClick={() => { openApp('terminal'); onClose(); }}>Open Terminal</Item>
        <Item icon="🖥️" onClick={() => { openApp('about'); onClose(); }}>About This Portfolio</Item>
        <Divider />
        <Item icon="⚙️" onClick={() => { openApp('settings'); onClose(); }}>System Settings…</Item>
      </div>
    </>
  );
}

function Item({ children, onClick, icon }: { children: React.ReactNode; onClick?: () => void; icon?: string }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 text-left px-2.5 py-1 rounded hover:bg-blue-500 hover:text-white transition-colors"
    >
      {icon && <span className="w-4 text-center">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}

function Divider() {
  return <div className="my-1 h-px bg-black/10" />;
}
