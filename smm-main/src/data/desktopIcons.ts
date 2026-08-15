import type { AppId } from '@/os/OSContext';

export interface DesktopIconDef {
  appId: AppId;
  label: string;
  emoji: string;
  gradient: string;
}

export const DESKTOP_ICONS: DesktopIconDef[] = [
  { appId: 'about', label: 'About Me', emoji: '👤', gradient: 'from-sky-400 to-blue-500' },
  { appId: 'contact', label: 'Contact', emoji: '📞', gradient: 'from-emerald-400 to-green-500' },
  { appId: 'education', label: 'Education', emoji: '🎓', gradient: 'from-amber-400 to-orange-500' },
  { appId: 'skills', label: 'Skills', emoji: '💻', gradient: 'from-violet-500 to-purple-500' },
  { appId: 'experience', label: 'Experience', emoji: '📅', gradient: 'from-rose-400 to-pink-500' },
  { appId: 'opportunities', label: 'Opportunities', emoji: '🗺️', gradient: 'from-teal-400 to-cyan-500' },
  { appId: 'projects', label: 'Projects', emoji: '🚀', gradient: 'from-fuchsia-500 to-pink-500' },
  { appId: 'resume', label: 'Resume', emoji: '📄', gradient: 'from-slate-400 to-slate-600' },
  { appId: 'github', label: 'GitHub', emoji: '🔗', gradient: 'from-gray-700 to-gray-900' },
  { appId: 'linkedin', label: 'LinkedIn', emoji: '💼', gradient: 'from-blue-500 to-blue-700' },
];
