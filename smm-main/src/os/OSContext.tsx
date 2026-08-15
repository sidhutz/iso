import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { WALLPAPERS } from '@/data/portfolio';

export type AppId =
  | 'about' | 'contact' | 'education' | 'skills' | 'experience'
  | 'opportunities' | 'projects' | 'resume' | 'github' | 'linkedin'
  | 'terminal' | 'settings';

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  prevRect?: { x: number; y: number; width: number; height: number };
}

export interface OSSettings {
  wallpaperId: string;
  darkMode: boolean;
  accentColor: string;
  clock24h: boolean;
  iconSize: 'sm' | 'md' | 'lg';
}

const DEFAULT_SETTINGS: OSSettings = {
  wallpaperId: 'sonoma',
  darkMode: true,
  accentColor: '#0a84ff',
  clock24h: false,
  iconSize: 'md',
};

interface OSContextValue {
  windows: WindowState[];
  settings: OSSettings;
  activeId: string | null;
  wallpaperUrl: string;
  openApp: (appId: AppId, title?: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, width: number, height: number) => void;
  updateSettings: (patch: Partial<OSSettings>) => void;
  setWallpaper: (id: string) => void;
}

const OSContext = createContext<OSContextValue | null>(null);

const APP_TITLES: Record<AppId, string> = {
  about: 'About Me',
  contact: 'Contact',
  education: 'Education',
  skills: 'Skills',
  experience: 'Experience',
  opportunities: 'Opportunities',
  projects: 'Projects',
  resume: 'Resume',
  github: 'GitHub',
  linkedin: 'LinkedIn',
  terminal: 'Terminal',
  settings: 'System Settings',
};

const DEFAULT_SIZES: Record<AppId, { width: number; height: number }> = {
  about: { width: 560, height: 580 },
  contact: { width: 620, height: 600 },
  education: { width: 640, height: 560 },
  skills: { width: 680, height: 600 },
  experience: { width: 600, height: 520 },
  opportunities: { width: 600, height: 520 },
  projects: { width: 820, height: 600 },
  resume: { width: 640, height: 720 },
  github: { width: 760, height: 620 },
  linkedin: { width: 680, height: 640 },
  terminal: { width: 640, height: 420 },
  settings: { width: 660, height: 540 },
};

let zCounter = 10;

export function OSProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [settings, setSettings] = useState<OSSettings>(DEFAULT_SETTINGS);
  const [activeId, setActiveId] = useState<string | null>(null);

  const focusWindow = useCallback((id: string) => {
    zCounter += 1;
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: zCounter, minimized: false } : w)));
    setActiveId(id);
  }, []);

  const openApp = useCallback((appId: AppId) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.appId === appId);
      if (existing) {
        zCounter += 1;
        setActiveId(existing.id);
        return prev.map((w) => (w.id === existing.id ? { ...w, minimized: false, zIndex: zCounter } : w));
      }
      const size = DEFAULT_SIZES[appId];
      zCounter += 1;
      const id = `${appId}-${Date.now()}`;
      const offset = prev.length * 28;
      const vw = typeof window !== 'undefined' ? window.innerWidth : 1280;
      const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
      const x = Math.max(20, Math.min((vw - size.width) / 2 + offset, vw - size.width - 20));
      const y = Math.max(40, Math.min((vh - size.height) / 2 - 30 + offset, vh - size.height - 80));
      setActiveId(id);
      return [
        ...prev,
        {
          id,
          appId,
          title: APP_TITLES[appId],
          x,
          y,
          width: size.width,
          height: size.height,
          zIndex: zCounter,
          minimized: false,
          maximized: false,
        },
      ];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setActiveId((cur) => (cur === id ? null : cur));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
    setActiveId((cur) => (cur === id ? null : cur));
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        if (w.maximized && w.prevRect) {
          return { ...w, maximized: false, ...w.prevRect };
        }
        const vw = typeof window !== 'undefined' ? window.innerWidth : 1280;
        const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
        return {
          ...w,
          maximized: true,
          prevRect: { x: w.x, y: w.y, width: w.width, height: w.height },
          x: 0,
          y: 28,
          width: vw,
          height: vh - 28,
        };
      })
    );
  }, []);

  const moveWindow = useCallback((id: string, x: number, y: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }, []);

  const resizeWindow = useCallback((id: string, width: number, height: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, width, height } : w)));
  }, []);

  const updateSettings = useCallback((patch: Partial<OSSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const setWallpaper = useCallback((id: string) => {
    setSettings((prev) => ({ ...prev, wallpaperId: id }));
  }, []);

  const wallpaperUrl = useMemo(() => {
    return WALLPAPERS.find((w) => w.id === settings.wallpaperId)?.url ?? WALLPAPERS[0].url;
  }, [settings.wallpaperId]);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', settings.accentColor);
  }, [settings.accentColor]);

  const value: OSContextValue = {
    windows,
    settings,
    activeId,
    wallpaperUrl,
    openApp,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    focusWindow,
    moveWindow,
    resizeWindow,
    updateSettings,
    setWallpaper,
  };

  return <OSContext.Provider value={value}>{children}</OSContext.Provider>;
}

// Context hooks must be exported alongside their provider so consumers can access it.
// eslint-disable-next-line react-refresh/only-export-components
export function useOS() {
  const ctx = useContext(OSContext);
  if (!ctx) throw new Error('useOS must be used within OSProvider');
  return ctx;
}
