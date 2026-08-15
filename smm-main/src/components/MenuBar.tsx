import { useEffect, useState } from 'react';
import { Wifi, Battery, Search, Volume2, Bluetooth, Sun, Moon } from 'lucide-react';
import { useOS } from '@/os/OSContext';
import { PROFILE } from '@/data/portfolio';

const MENUS = ['File', 'Edit', 'View', 'Go', 'Window', 'Help'];

export default function MenuBar() {
  const { settings, openApp } = useOS();
  const [now, setNow] = useState(new Date());
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: !settings.clock24h,
  });

  function handleMenuClick(menu: string) {
    setOpenMenu((cur) => (cur === menu ? null : menu));
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 h-7 z-[10000] flex items-center px-2 text-[13px] text-white"
      style={{
        background: 'rgba(0,0,0,0.28)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
      onMouseLeave={() => setOpenMenu(null)}
    >
      {/* Apple-style logo */}
      <button
        className="px-2 py-0.5 rounded hover:bg-white/20 transition-colors flex items-center"
        onClick={() => handleMenuClick('apple')}
        title="Apple menu"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-label="Apple logo" role="img">
          <path d="M17.05 12.04c-.03-2.6 2.13-3.85 2.23-3.91-1.21-1.77-3.1-2.01-3.77-2.04-1.6-.16-3.13.94-3.95.94-.82 0-2.07-.92-3.41-.89-1.76.03-3.39 1.02-4.3 2.6-1.83 3.18-.47 7.9 1.32 10.49.88 1.27 1.92 2.69 3.28 2.64 1.32-.05 1.82-.85 3.41-.85 1.59 0 2.05.85 3.43.82 1.42-.03 2.31-1.29 3.17-2.56 1-1.47 1.41-2.9 1.43-2.97-.03-.01-2.74-1.05-2.77-4.16zM14.6 4.59c.72-.88 1.21-2.09 1.08-3.31-1.04.04-2.31.7-3.06 1.57-.67.77-1.26 2.01-1.1 3.2 1.16.09 2.35-.59 3.08-1.46z"/>
        </svg>
      </button>

      <button
        className="px-2 py-0.5 rounded font-semibold hover:bg-white/20 transition-colors"
        onClick={() => handleMenuClick('portfolio')}
      >
        {PROFILE.name}
      </button>

      {MENUS.map((m) => (
        <button
          key={m}
          className={`px-2 py-0.5 rounded hover:bg-white/20 transition-colors ${openMenu === m ? 'bg-white/25' : ''}`}
          onClick={() => handleMenuClick(m)}
          onMouseEnter={() => openMenu && setOpenMenu(m)}
        >
          {m}
        </button>
      ))}

      <div className="flex-1" />

      {/* Right side system icons */}
      <div className="flex items-center gap-1.5 px-1">
        <button
          className="p-1 rounded hover:bg-white/20 transition-colors"
          onClick={() => openApp('settings')}
          title="Appearance"
        >
          {settings.darkMode ? <Moon size={14} /> : <Sun size={14} />}
        </button>
        <Bluetooth size={13} className="opacity-80" />
        <Volume2 size={14} className="opacity-90" />
        <Search size={14} className="opacity-90" />
        <Wifi size={14} className="opacity-90" />
        <div className="flex items-center gap-1">
          <Battery size={16} className="opacity-90" />
          <span className="text-[11px] opacity-80">87%</span>
        </div>
        <div className="px-1.5 text-[12px] leading-none flex flex-col items-end">
          <span>{timeStr}</span>
        </div>
        <span className="text-[12px] opacity-90 pr-1">{dateStr}</span>
      </div>

      {/* Dropdown panel for apple menu */}
      {openMenu === 'apple' && (
        <div
          className="absolute top-7 left-1 w-56 glass-menu rounded-lg p-1 text-black/85 shadow-xl"
          onMouseLeave={() => setOpenMenu(null)}
        >
          <DropdownItem onClick={() => { openApp('about'); setOpenMenu(null); }}>About This Portfolio</DropdownItem>
          <DropdownItem onClick={() => { openApp('settings'); setOpenMenu(null); }}>System Settings…</DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={() => { openApp('terminal'); setOpenMenu(null); }}>Open Terminal</DropdownItem>
          <DropdownItem disabled>Lock Screen</DropdownItem>
        </div>
      )}
      {openMenu === 'portfolio' && (
        <div
          className="absolute top-7 left-10 w-56 glass-menu rounded-lg p-1 text-black/85 shadow-xl"
          onMouseLeave={() => setOpenMenu(null)}
        >
          <DropdownItem onClick={() => { openApp('about'); setOpenMenu(null); }}>About Me</DropdownItem>
          <DropdownItem onClick={() => { openApp('projects'); setOpenMenu(null); }}>My Projects</DropdownItem>
          <DropdownItem onClick={() => { openApp('resume'); setOpenMenu(null); }}>My Resume</DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={() => { openApp('github'); setOpenMenu(null); }}>GitHub Profile</DropdownItem>
          <DropdownItem onClick={() => { openApp('linkedin'); setOpenMenu(null); }}>LinkedIn Profile</DropdownItem>
        </div>
      )}
      {openMenu === 'Help' && (
        <div
          className="absolute top-7 right-2 w-52 glass-menu rounded-lg p-1 text-black/85 shadow-xl"
          onMouseLeave={() => setOpenMenu(null)}
        >
          <DropdownItem onClick={() => { openApp('terminal'); setOpenMenu(null); }}>Terminal Help</DropdownItem>
          <DropdownItem onClick={() => { openApp('about'); setOpenMenu(null); }}>About Siddharth</DropdownItem>
        </div>
      )}
      {['File', 'Edit', 'View', 'Go', 'Window'].includes(openMenu || '') && (
        <div
          className="absolute top-7 left-32 w-52 glass-menu rounded-lg p-1 text-black/85 shadow-xl"
          onMouseLeave={() => setOpenMenu(null)}
        >
          <DropdownItem disabled>{openMenu} — portfolio demo</DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={() => { openApp('about'); setOpenMenu(null); }}>Open About</DropdownItem>
          <DropdownItem onClick={() => { openApp('projects'); setOpenMenu(null); }}>Open Projects</DropdownItem>
          <DropdownItem onClick={() => { openApp('settings'); setOpenMenu(null); }}>Open Settings</DropdownItem>
        </div>
      )}
    </div>
  );
}

function DropdownItem({ children, onClick, disabled }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full text-left px-2.5 py-1 rounded text-[13px] hover:bg-blue-500 hover:text-white transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-inherit"
    >
      {children}
    </button>
  );
}

function DropdownDivider() {
  return <div className="my-1 h-px bg-black/10" />;
}
