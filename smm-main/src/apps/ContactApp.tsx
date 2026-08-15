import { useState } from 'react';
import { Mail, Phone, Github, Linkedin, Instagram, Send, MapPin } from 'lucide-react';
import { PROFILE } from '@/data/portfolio';
import { useOS } from '@/os/OSContext';

export default function ContactApp() {
  const { settings } = useOS();
  const dark = settings.darkMode;
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', message: '' });
    }, 2500);
  }

  const channels = [
    { icon: <Mail size={16} />, label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon: <Phone size={16} />, label: 'Phone', value: PROFILE.phone, href: `tel:${PROFILE.phone}` },
    { icon: <Linkedin size={16} />, label: 'LinkedIn', value: 'siddharthkushwaha', href: PROFILE.links.linkedin },
    { icon: <Github size={16} />, label: 'GitHub', value: 'siddharthkushwaha', href: PROFILE.links.github },
    { icon: <Instagram size={16} />, label: 'Instagram', value: 'siddharth.kushwaha', href: PROFILE.links.instagram },
  ];

  return (
    <div className="p-5">
      <h2 className="text-lg font-bold mb-1">Get in Touch</h2>
      <p className={`text-xs mb-4 ${dark ? 'text-white/60' : 'text-black/55'}`}>I'd love to hear from you.</p>

      <div className="grid grid-cols-2 gap-2 mb-5">
        {channels.map((c, i) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className={`flex items-center gap-2.5 rounded-lg p-2.5 transition-all hover:scale-[1.02] animate-slide-up ${dark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'}`}
            style={{ animationDelay: `${i * 60}ms`, opacity: 0, animationFillMode: 'forwards' }}
          >
            <div className="h-9 w-9 rounded-full flex items-center justify-center text-white shrink-0" style={{ background: 'var(--accent)' }}>
              {c.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] opacity-60">{c.label}</p>
              <p className="text-[12px] font-medium truncate">{c.value}</p>
            </div>
          </a>
        ))}
      </div>

      <form onSubmit={submit} className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <input
            required
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg text-[13px] outline-none border ${dark ? 'bg-white/10 border-white/15 focus:border-white/40 text-white placeholder-white/40' : 'bg-black/5 border-black/10 focus:border-black/30 text-black placeholder-black/40'}`}
          />
          <input
            required
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg text-[13px] outline-none border ${dark ? 'bg-white/10 border-white/15 focus:border-white/40 text-white placeholder-white/40' : 'bg-black/5 border-black/10 focus:border-black/30 text-black placeholder-black/40'}`}
          />
        </div>
        <textarea
          required
          placeholder="Your message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`w-full px-3 py-2 rounded-lg text-[13px] outline-none border resize-none ${dark ? 'bg-white/10 border-white/15 focus:border-white/40 text-white placeholder-white/40' : 'bg-black/5 border-black/10 focus:border-black/30 text-black placeholder-black/40'}`}
        />
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-white text-[13px] font-medium transition-all hover:brightness-110"
          style={{ background: 'var(--accent)' }}
        >
          {sent ? 'Message sent!' : (<><Send size={14} /> Send Message</>)}
        </button>
      </form>

      <div className={`flex items-center justify-center gap-1 mt-3 text-[11px] ${dark ? 'text-white/50' : 'text-black/50'}`}>
        <MapPin size={11} /> {PROFILE.location}
      </div>
    </div>
  );
}
