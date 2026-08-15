import { useEffect, useRef, useState } from 'react';
import { useOS, type AppId } from '@/os/OSContext';
import { DESKTOP_ICONS } from '@/data/desktopIcons';

const SIZE_MAP = { sm: 64, md: 80, lg: 96 } as const;

export default function DesktopIcons({ onContext }: { onContext: (e: React.MouseEvent) => void }) {
  const { openApp, settings } = useOS();
  const [selected, setSelected] = useState<string | null>(null);
  const [clickTimer, setClickTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [contextFor, setContextFor] = useState<{ appId: AppId; x: number; y: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onGlobalClick() {
      setSelected(null);
      setContextFor(null);
    }
    window.addEventListener('click', onGlobalClick);
    return () => window.removeEventListener('click', onGlobalClick);
  }, []);

  function handleClick(appId: AppId) {
    if (clickTimer) {
      clearTimeout(clickTimer);
      setClickTimer(null);
      openApp(appId);
    } else {
      setSelected(appId);
      const t = setTimeout(() => setClickTimer(null), 280);
      setClickTimer(t);
    }
  }

  const size = SIZE_MAP[settings.iconSize];

  return (
    <div
      ref={ref}
      className="absolute top-9 left-2 bottom-16 flex flex-col flex-wrap gap-1 p-2 z-10"
      onContextMenu={onContext}
      onClick={(e) => {
        if (e.target === ref.current || (e.target as HTMLElement).dataset.bg === 'desktop') {
          setSelected(null);
        }
      }}
    >
      {DESKTOP_ICONS.map((icon) => (
        <button
          key={icon.appId}
          data-bg="icon"
          className={`group flex flex-col items-center gap-1 rounded-lg p-1.5 transition-all duration-150 ${
            selected === icon.appId ? 'bg-white/20' : 'hover:bg-white/10'
          }`}
          style={{ width: size + 8 }}
          onClick={(e) => {
            e.stopPropagation();
            handleClick(icon.appId);
          }}
          onDoubleClick={() => openApp(icon.appId)}
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setContextFor({ appId: icon.appId, x: e.clientX, y: e.clientY });
          }}
        >
          <div
            className={`flex items-center justify-center rounded-2xl bg-gradient-to-br ${icon.gradient} shadow-lg group-hover:scale-110 group-active:scale-95 transition-transform duration-150`}
            style={{ width: size, height: size, fontSize: size * 0.42 }}
          >
            <span className="drop-shadow-sm">{icon.emoji}</span>
          </div>
          <span
            className="text-[11px] text-white font-medium px-1 rounded leading-tight max-w-full truncate"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}
          >
            {icon.label}
          </span>
        </button>
      ))}

      {/* Icon context menu */}
      {contextFor && (
        <div
          className="fixed z-[9000] glass-menu rounded-lg p-1 text-black/85 shadow-xl min-w-[180px] text-[13px]"
          style={{ left: contextFor.x, top: contextFor.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <CtxItem onClick={() => { openApp(contextFor.appId); setContextFor(null); }}>Open</CtxItem>
          <CtxItem onClick={() => { openApp(contextFor.appId); setContextFor(null); }}>Open in New Window</CtxItem>
          <div className="my-1 h-px bg-black/10" />
          <CtxItem onClick={() => setContextFor(null)}>Get Info</CtxItem>
          <CtxItem onClick={() => setContextFor(null)}>Rename</CtxItem>
        </div>
      )}
    </div>
  );
}

function CtxItem({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-2.5 py-1 rounded hover:bg-blue-500 hover:text-white transition-colors"
    >
      {children}
    </button>
  );
}
