import { useEffect, useMemo, useState } from 'react';
import { Star, GitFork, Users, BookMarked } from 'lucide-react';
import { REPOS, PROFILE, CONTRIBUTION_WEEKS, CONTRIBUTION_DAYS } from '@/data/portfolio';
import { useOS } from '@/os/OSContext';

export default function GitHubApp() {
  const { settings } = useOS();
  const dark = settings.darkMode;
  const [contrib, setContrib] = useState<number[][]>([]);

  useEffect(() => {
    const grid: number[][] = [];
    let seed = 7;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let w = 0; w < CONTRIBUTION_WEEKS; w++) {
      const col: number[] = [];
      for (let d = 0; d < CONTRIBUTION_DAYS; d++) {
        const r = rand();
        col.push(r < 0.3 ? 0 : r < 0.55 ? 1 : r < 0.78 ? 2 : r < 0.92 ? 3 : 4);
      }
      grid.push(col);
    }
    setContrib(grid);
  }, []);

  const totalStars = useMemo(() => REPOS.reduce((a, r) => a + r.stars, 0), []);
  const totalForks = useMemo(() => REPOS.reduce((a, r) => a + r.forks, 0), []);

  const levelColors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];

  return (
    <div className="p-5">
      {/* Profile header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
          SK
        </div>
        <div>
          <h2 className="text-lg font-bold">{PROFILE.name}</h2>
          <p className={`text-[12px] ${dark ? 'text-white/60' : 'text-black/55'}`}>Siddharth kushwaha</p>
          <div className="flex items-center gap-3 mt-1 text-[11px]">
            <span className="flex items-center gap-1"><Users size={11} /> 1 followers</span>
            <span className="flex items-center gap-1"><BookMarked size={11} /> 1 following</span>
          </div>
        </div>
        <a href={PROFILE.links.github} target="_blank" rel="noreferrer" className="ml-auto px-3 py-1.5 rounded-lg text-[12px] font-medium text-white" style={{ background: 'var(--accent)' }}>
          View Profile
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        <StatCard label="Repositories" value={REPOS.length} dark={dark} />
        <StatCard label="Stars" value={totalStars} dark={dark} />
        <StatCard label="Forks" value={totalForks} dark={dark} />
      </div>

      {/* Contribution graph */}
      <div className={`rounded-lg p-3 mb-5 ${dark ? 'bg-white/5' : 'bg-black/5'}`}>
        <p className="text-[11px] font-medium mb-2">Contributions in the last year</p>
        <div className="flex gap-[3px] overflow-hidden">
          {contrib.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((lvl, di) => (
                <div
                  key={di}
                  className="w-[10px] h-[10px] rounded-[2px]"
                  style={{ background: dark ? levelColors[lvl] : ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'][lvl] }}
                  title={`${lvl} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Repos */}
      <p className="text-[12px] font-semibold mb-2">Pinned repositories</p>
      <div className="grid grid-cols-2 gap-2">
        {REPOS.map((r) => (
          <div key={r.name} className={`rounded-lg p-3 border ${dark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
            <a href={PROFILE.links.github} target="_blank" rel="noreferrer" className="text-[13px] font-semibold hover:underline" style={{ color: 'var(--accent)' }}>
              {r.name}
            </a>
            <p className={`text-[11px] mt-1 leading-snug ${dark ? 'text-white/60' : 'text-black/55'}`}>{r.description}</p>
            <div className="flex items-center gap-3 mt-2 text-[11px]">
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: r.color }} />
                {r.language}
              </span>
              <span className="flex items-center gap-1 opacity-70"><Star size={11} /> {r.stars}</span>
              <span className="flex items-center gap-1 opacity-70"><GitFork size={11} /> {r.forks}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, dark }: { label: string; value: number; dark: boolean }) {
  return (
    <div className={`rounded-lg p-2.5 text-center ${dark ? 'bg-white/5' : 'bg-black/5'}`}>
      <p className="text-lg font-bold tabular-nums">{value}</p>
      <p className={`text-[10px] ${dark ? 'text-white/55' : 'text-black/55'}`}>{label}</p>
    </div>
  );
}
