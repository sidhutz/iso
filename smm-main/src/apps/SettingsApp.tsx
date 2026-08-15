import { useOS } from '@/os/OSContext';
import { ACCENT_COLORS } from '@/data/portfolio';
import { WALLPAPERS } from '@/data/portfolio';

const SIZE_OPTIONS = [
  { id: 'sm', label: 'Small' },
  { id: 'md', label: 'Medium' },
  { id: 'lg', label: 'Large' },
] as const;

export default function SettingsApp() {
  const { settings, updateSettings, setWallpaper } = useOS();
  const dark = settings.darkMode;

  return (
    <div className="p-5">
      <h2 className="text-lg font-bold mb-4">System Settings</h2>

      {/* Appearance */}
      <Section title="Appearance" dark={dark}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => updateSettings({ darkMode: false })}
            className={`flex-1 rounded-lg p-3 border-2 transition-all ${!dark ? 'border-blue-500' : 'border-transparent'} ${dark ? 'bg-white/5' : 'bg-white/60'}`}
          >
            <div className="h-12 rounded-md bg-gradient-to-br from-gray-100 to-gray-300 mb-2" />
            <p className="text-[12px] font-medium">Light</p>
          </button>
          <button
            onClick={() => updateSettings({ darkMode: true })}
            className={`flex-1 rounded-lg p-3 border-2 transition-all ${dark ? 'border-blue-500' : 'border-transparent'} ${dark ? 'bg-white/5' : 'bg-black/5'}`}
          >
            <div className="h-12 rounded-md bg-gradient-to-br from-gray-700 to-gray-900 mb-2" />
            <p className="text-[12px] font-medium">Dark</p>
          </button>
        </div>
      </Section>

      {/* Accent color */}
      <Section title="Accent Color" dark={dark}>
        <div className="flex flex-wrap gap-2">
          {ACCENT_COLORS.map((c) => (
            <button
              key={c.id}
              onClick={() => updateSettings({ accentColor: c.value })}
              className={`h-8 w-8 rounded-full transition-all hover:scale-110 ${settings.accentColor === c.value ? 'ring-2 ring-offset-2 ring-blue-400 ring-offset-transparent' : ''}`}
              style={{ background: c.value }}
              title={c.name}
            />
          ))}
        </div>
      </Section>

      {/* Wallpaper */}
      <Section title="Wallpaper" dark={dark}>
        <div className="grid grid-cols-4 gap-2">
          {WALLPAPERS.map((w) => (
            <button
              key={w.id}
              onClick={() => setWallpaper(w.id)}
              className={`rounded-lg overflow-hidden border-2 transition-all ${settings.wallpaperId === w.id ? 'border-blue-500' : 'border-transparent hover:border-white/30'}`}
            >
              <img src={w.url} alt={w.name} className="h-14 w-full object-cover" loading="lazy" />
              <p className="text-[10px] py-0.5 truncate px-1">{w.name}</p>
            </button>
          ))}
        </div>
      </Section>

      {/* Clock format */}
      <Section title="Clock" dark={dark}>
        <div className="flex items-center justify-between">
          <span className="text-[13px]">24-hour format</span>
          <Toggle on={settings.clock24h} onChange={(v) => updateSettings({ clock24h: v })} />
        </div>
      </Section>

      {/* Icon size */}
      <Section title="Desktop Icon Size" dark={dark}>
        <div className="flex gap-2">
          {SIZE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => updateSettings({ iconSize: opt.id })}
              className={`flex-1 py-2 rounded-lg text-[12px] font-medium transition-all ${settings.iconSize === opt.id ? 'text-white' : dark ? 'bg-white/10 hover:bg-white/15' : 'bg-black/5 hover:bg-black/10'}`}
              style={settings.iconSize === opt.id ? { background: 'var(--accent)' } : undefined}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children, dark }: { title: string; children: React.ReactNode; dark: boolean }) {
  return (
    <div className={`rounded-xl p-3 mb-3 ${dark ? 'bg-white/5' : 'bg-black/5'}`}>
      <h3 className="text-[13px] font-bold mb-2">{title}</h3>
      {children}
    </div>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="relative h-6 w-10 rounded-full transition-colors"
      style={{ background: on ? 'var(--accent)' : 'rgba(128,128,128,0.4)' }}
    >
      <span
        className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform"
        style={{ transform: on ? 'translateX(18px)' : 'translateX(2px)' }}
      />
    </button>
  );
}
