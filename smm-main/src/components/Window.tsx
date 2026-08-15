import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useOS, type WindowState } from '@/os/OSContext';

interface WindowProps {
  win: WindowState;
  children: ReactNode;
  sidebar?: ReactNode;
  toolbar?: ReactNode;
}

export default function Window({ win, children, sidebar, toolbar }: WindowProps) {
  const { settings, activeId, focusWindow, closeWindow, minimizeWindow, toggleMaximize, moveWindow, resizeWindow } = useOS();
  const dark = settings.darkMode;
  const isActive = activeId === win.id;
  const [closing, setClosing] = useState(false);
  const dragState = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const resizeState = useRef<{ startX: number; startY: number; origW: number; origH: number } | null>(null);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (dragState.current) {
        const dx = e.clientX - dragState.current.startX;
        const dy = e.clientY - dragState.current.startY;
        const nx = Math.max(-win.width + 80, dragState.current.origX + dx);
        const ny = Math.max(28, dragState.current.origY + dy);
        moveWindow(win.id, nx, Math.min(ny, window.innerHeight - 60));
      } else if (resizeState.current) {
        const dw = e.clientX - resizeState.current.startX;
        const dh = e.clientY - resizeState.current.startY;
        resizeWindow(win.id, Math.max(360, resizeState.current.origW + dw), Math.max(280, resizeState.current.origH + dh));
      }
    }
    function onUp() {
      dragState.current = null;
      resizeState.current = null;
      document.body.classList.remove('dragging-active');
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [win.id, win.width, moveWindow, resizeWindow]);

  function startDrag(e: React.MouseEvent) {
    if (win.maximized) return;
    focusWindow(win.id);
    dragState.current = { startX: e.clientX, startY: e.clientY, origX: win.x, origY: win.y };
    document.body.classList.add('dragging-active');
  }

  function startResize(e: React.MouseEvent) {
    e.stopPropagation();
    focusWindow(win.id);
    resizeState.current = { startX: e.clientX, startY: e.clientY, origW: win.width, origH: win.height };
    document.body.classList.add('dragging-active');
  }

  function handleClose() {
    setClosing(true);
    setTimeout(() => closeWindow(win.id), 160);
  }

  if (win.minimized) return null;

  return (
    <div
      className={`absolute flex flex-col overflow-hidden rounded-xl ${
        dark ? 'glass-strong-dark window-shadow-dark text-white/90' : 'glass-strong window-shadow text-black/85'
      } ${closing ? 'animate-window-close' : 'animate-window-open'} ${
        isActive ? 'ring-1 ring-black/5' : 'opacity-95'
      }`}
      style={{ left: win.x, top: win.y, width: win.width, height: win.height, zIndex: win.zIndex }}
      onMouseDown={() => focusWindow(win.id)}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-3 h-9 shrink-0 select-none"
        style={{ cursor: win.maximized ? 'default' : 'grab' }}
        onMouseDown={startDrag}
        onDoubleClick={() => toggleMaximize(win.id)}
      >
        <div className="flex items-center gap-2 group/controls">
          <button
            aria-label="Close"
            onClick={handleClose}
            className="h-3 w-3 rounded-full bg-macos-red flex items-center justify-center text-[8px] text-black/40 hover:brightness-95"
          >
            <span className="opacity-0 group-hover/controls:opacity-100 leading-none">×</span>
          </button>
          <button
            aria-label="Minimize"
            onClick={() => minimizeWindow(win.id)}
            className="h-3 w-3 rounded-full bg-macos-yellow flex items-center justify-center text-[8px] text-black/40 hover:brightness-95"
          >
            <span className="opacity-0 group-hover/controls:opacity-100 leading-none">−</span>
          </button>
          <button
            aria-label="Zoom"
            onClick={() => toggleMaximize(win.id)}
            className="h-3 w-3 rounded-full bg-macos-green flex items-center justify-center text-[8px] text-black/40 hover:brightness-95"
          >
            <span className="opacity-0 group-hover/controls:opacity-100 leading-none">+</span>
          </button>
        </div>
        <div className={`flex-1 text-center text-[13px] font-medium truncate ${dark ? 'text-white/70' : 'text-black/60'}`}>
          {win.title}
        </div>
        <div className="w-[52px]" />
      </div>

      {toolbar}

      {/* Body */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {sidebar ? (
          <div className="flex h-full">
            <div className={`w-44 shrink-0 overflow-y-auto scrollbar-thin ${dark ? 'scrollbar-thin-dark' : ''} border-r ${dark ? 'border-white/10' : 'border-black/10'}`}>
              {sidebar}
            </div>
            <div className={`flex-1 overflow-y-auto scrollbar-thin ${dark ? 'scrollbar-thin-dark' : ''}`}>{children}</div>
          </div>
        ) : (
          <div className={`h-full overflow-y-auto scrollbar-thin ${dark ? 'scrollbar-thin-dark' : ''}`}>{children}</div>
        )}
      </div>

      {/* Resize handle */}
      {!win.maximized && (
        <div
          className="absolute bottom-0 right-0 h-4 w-4 cursor-se-resize"
          onMouseDown={startResize}
        />
      )}
    </div>
  );
}
