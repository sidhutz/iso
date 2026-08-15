import { useState } from 'react';
import { OSProvider, useOS } from '@/os/OSContext';
import MenuBar from '@/components/MenuBar';
import DesktopIcons from '@/components/DesktopIcons';
import Dock from '@/components/Dock';
import WindowManager from '@/components/WindowManager';
import DesktopContextMenu, { type ContextState } from '@/components/DesktopContextMenu';
import MobileView from '@/components/MobileView';

function Desktop() {
  const { wallpaperUrl } = useOS();
  const [ctx, setCtx] = useState<ContextState | null>(null);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${wallpaperUrl})` }}
      />
      {/* Subtle dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/10" />

      <MenuBar />

      {/* Desktop area */}
      <div
        className="absolute inset-0 top-7"
        onContextMenu={(e) => {
          e.preventDefault();
          setCtx({ x: e.clientX, y: e.clientY });
        }}
      >
        <DesktopIcons onContext={() => {}} />
      </div>

      <WindowManager />
      <Dock />
      <DesktopContextMenu state={ctx} onClose={() => setCtx(null)} />
    </div>
  );
}

function Responsive() {
  return (
    <>
      <div className="hidden md:block w-full h-full">
        <Desktop />
      </div>
      <div className="md:hidden w-full h-full">
        <MobileView />
      </div>
    </>
  );
}

export default function App() {
  return (
    <OSProvider>
      <Responsive />
    </OSProvider>
  );
}
