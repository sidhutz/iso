import { useEffect, useRef, useState } from 'react';
import { useOS } from '@/os/OSContext';
import { PROFILE, SKILLS, PROJECTS, EDUCATION } from '@/data/portfolio';

interface Line {
  type: 'input' | 'output';
  text: string;
}

const PROMPT = 'siddharth@portfolio ~ %';

const HELP_TEXT = `Available commands:
  help        Show this help
  about       About Siddharth
  skills      List technical skills
  projects    Show project list
  education   Show education timeline
  contact     Show contact details
  resume      Open resume app
  github      Open GitHub app
  linkedin    Open LinkedIn app
  clear       Clear the terminal
  whoami      Who am I?
  date        Show current date
  echo        Print text
  sudo        Try it...`;

export default function TerminalApp() {
  const { openApp } = useOS();
  const [lines, setLines] = useState<Line[]>([
    { type: 'output', text: `Last login: ${new Date().toLocaleString()}` },
    { type: 'output', text: "Welcome to Siddharth's Portfolio Terminal. Type 'help' to begin." },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  function runCommand(raw: string) {
    const cmd = raw.trim();
    const out: string[] = [];
    const [base, ...args] = cmd.split(/\s+/);

    switch (base) {
      case 'help':
        out.push(HELP_TEXT);
        break;
      case 'about':
        out.push(`${PROFILE.name}\n${PROFILE.title}\n${PROFILE.bio}`);
        break;
      case 'skills':
        out.push('Technical Skills:\n' + SKILLS.map((s) => `  ${s.name.padEnd(16)} ${s.level}%`).join('\n'));
        break;
      case 'projects':
        out.push('Projects:\n' + PROJECTS.map((p) => `  ${p.emoji} ${p.name} — ${p.tech.join(', ')}`).join('\n'));
        break;
      case 'education':
        out.push('Education:\n' + EDUCATION.map((e) => `  ${e.period}  ${e.title} (${e.org})`).join('\n'));
        break;
      case 'contact':
        out.push(`Email: ${PROFILE.email}\nPhone: ${PROFILE.phone}\nGitHub: ${PROFILE.links.github}\nLinkedIn: ${PROFILE.links.linkedin}`);
        break;
      case 'resume':
        out.push('Opening Resume...');
        openApp('resume');
        break;
      case 'github':
        out.push('Opening GitHub...');
        openApp('github');
        break;
      case 'linkedin':
        out.push('Opening LinkedIn...');
        openApp('linkedin');
        break;
      case 'whoami':
        out.push(PROFILE.name);
        break;
      case 'date':
        out.push(new Date().toString());
        break;
      case 'echo':
        out.push(args.join(' '));
        break;
      case 'sudo':
        out.push("Nice try! You're not getting root on this machine. 😏");
        break;
      case 'clear':
        setLines([]);
        return;
      case '':
        break;
      default:
        out.push(`zsh: command not found: ${base}. Type 'help' for available commands.`);
    }

    setLines((prev) => [...prev, { type: 'input', text: cmd }, ...out.map((t) => ({ type: 'output' as const, text: t }))]);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      runCommand(input);
      if (input.trim()) setHistory((prev) => [...prev, input]);
      setInput('');
      setHistIdx(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length) {
        const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
        setHistIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx !== -1 && histIdx < history.length - 1) {
        const idx = histIdx + 1;
        setHistIdx(idx);
        setInput(history[idx]);
      } else {
        setHistIdx(-1);
        setInput('');
      }
    }
  }

  return (
    <div
      ref={scrollRef}
      className="h-full overflow-y-auto scrollbar-thin font-mono text-[12.5px] leading-relaxed p-3 cursor-text"
      style={{ background: 'rgba(20,20,24,0.92)', color: '#e4e4e7' }}
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap break-words">
          {line.type === 'input' ? (
            <div><span className="text-green-400">{PROMPT}</span> {line.text}</div>
          ) : (
            <div className="text-zinc-300">{line.text}</div>
          )}
        </div>
      ))}
      <div className="flex items-center">
        <span className="text-green-400 shrink-0">{PROMPT}&nbsp;</span>
        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 bg-transparent outline-none text-zinc-100 caret-green-400"
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
        />
      </div>
    </div>
  );
}
