export const PROFILE = {
  name: 'Siddharth Kushwaha',
  title: 'BCA Student | Developer | AI & Technology Enthusiast',
  shortTitle: 'BCA Student & Developer',
  bio: 'I am a BCA student and developer passionate about building thoughtful software. I love web development, exploring programming languages, and experimenting with AI tools to craft experiences that feel alive.',
  interests: ['Web Development', 'Programming', 'AI & Technology', 'Open Source', 'Problem Solving'],
  location: 'India',
  email: 'siddharth.0563.mun@gmail.com',
  phone: '+91 9721945124',
  links: {
    github: 'https://github.com/sidhutz',
    linkedin: 'https://www.linkedin.com/in/siddharth-kushwaha-775a65387/',
    instagram: 'https://www.instagram.com/sidhutz/?__pwa=1',
  },
};

export type Skill = { name: string; level: number; color: string; icon: string };

export const SKILLS: Skill[] = [
  { name: 'HTML', level: 92, color: '#e34f26', icon: 'code' },
  { name: 'CSS', level: 88, color: '#1572b6', icon: 'palette' },
  { name: 'JavaScript', level: 85, color: '#f7df1e', icon: 'braces' },
  { name: 'React', level: 80, color: '#61dafb', icon: 'atom' },
  { name: 'C', level: 82, color: '#a8b9cc', icon: 'hash' },
  { name: 'C++', level: 78, color: '#00599c', icon: 'plus' },
  { name: 'Python', level: 84, color: '#3776ab', icon: 'terminal' },
  { name: 'SQL', level: 75, color: '#f29111', icon: 'database' },
  { name: 'Git & GitHub', level: 86, color: '#f05032', icon: 'git-branch' },
  { name: 'AI Tools', level: 88, color: '#8b5cf6', icon: 'sparkles' },
];

export type Project = {
  name: string;
  description: string;
  tech: string[];
  gradient: string;
  emoji: string;
  github?: string;
  demo?: string;
};

export const PROJECTS: Project[] = [
  {
    name: 'Jarvis AI Assistant',
    description: 'A voice-first AI assistant that can answer questions, automate tasks, and control smart devices through natural language.',
    tech: ['Python', 'NLP', 'Speech', 'AI'],
    gradient: 'from-violet-500 to-fuchsia-500',
    emoji: '🤖',
    demo:'https://github.com/sidhutz/jarvis_project01',
    github: 'https://github.com/sidhutz',
  },
  {
    name: 'Portfolio Website like IOS UI',
    description: 'A full-featured system for store about my, projects, contects, and skills with a clean admin dashboard.',
    tech: ['React', 'Node', 'SQL', 'Tailwind'],
    gradient: 'from-sky-500 to-blue-600',
    emoji: '🎓',
    github: 'https://github.com/sidhutz',
    demo: 'https://github.com/sidhutz/iso',
  },
  {
    name: 'Glassmorphism Student Form',
    description: 'A beautiful frosted-glass registration form with real-time validation and smooth micro-interactions.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    gradient: 'from-emerald-400 to-teal-500',
    emoji: '🪟',
    github: 'https://github.com/sidhutz',
    demo: 'https://github.com/sidhutz/google_form',
  },
  {
    name: 'Portfolio Website',
    description: 'An interactive macOS-style desktop portfolio with draggable windows, a dock, and a working terminal.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    gradient: 'from-amber-400 to-orange-500',
    emoji: '🖥️',
    github: 'https://github.com/sidhutz',
    demo: 'https://github.com/sidhutz/iso',
  },
  {
    name: 'AI Projects Lab',
    description: 'A collection of experiments with LLMs, image generation, and automation pipelines built to learn and share.',
    tech: ['Python', 'AI', 'APIs'],
    gradient: 'from-rose-500 to-pink-600',
    emoji: '🧠',
    github: 'https://github.com/sidhutz',
  },
];

export type EducationItem = {
  period: string;
  title: string;
  org: string;
  description: string;
  tag: string;
};

export const EDUCATION: EducationItem[] = [
  {
    period: '2025 — 2028',
    title: 'Bachelor of Computer Applications (BCA)',
    org: 'Ashoka Institute of Technology and Management',
    description: 'Pursuing a degree in computer applications with a focus on software development, data structures, and modern web technologies.',
    tag: 'Under Graduate',
  },
  {
    period: '2026',
    title: 'Microsoft Learn Certificates',
    org: 'Microsoft',
    description: 'Completed multiple Microsoft Learn modules covering Azure fundamentals, AI concepts, and modern development practices.',
    tag: 'Certification',
  },
  {
    period: '2026',
    title: 'Web Development Bootcamp',
    org: 'Online',
    description: 'Intensive hands-on program covering HTML, CSS, JavaScript, React, and full-stack fundamentals with real projects.',
    tag: 'Certification',
  },
  {
    period: '2025',
    title: 'Higher Secondary (12th)',
    org: 'CBSE Board',
    description: 'Completed higher secondary education with a focus on science and mathematics, building a strong analytical foundation.',
    tag: 'Education',
  },
];

export type Repo = { name: string; description: string; language: string; stars: number; forks: number; color: string };

export const REPOS: Repo[] = [
  { name: 'jarvis-ai-assistant', description: 'Voice-first AI assistant with NLP and task automation', language: 'Python', stars: 142, forks: 23, color: '#3776ab' },
  { name: 'student-management-system', description: 'Full-stack student records & attendance dashboard', language: 'TypeScript', stars: 89, forks: 12, color: '#3178c6' },
  { name: 'glassmorphism-form', description: 'Frosted-glass registration form with validation', language: 'JavaScript', stars: 56, forks: 8, color: '#f7df1e' },
  { name: 'macos-portfolio', description: 'Interactive macOS desktop portfolio experience', language: 'TypeScript', stars: 210, forks: 34, color: '#3178c6' },
  { name: 'ai-projects-lab', description: 'Experiments with LLMs, image gen, and automation', language: 'Python', stars: 73, forks: 9, color: '#3776ab' },
  { name: 'leetcode-solutions', description: 'My solutions to DSA problems in C++ and Python', language: 'C++', stars: 41, forks: 5, color: '#00599c' },
];

export const CONTRIBUTION_WEEKS = 52;
export const CONTRIBUTION_DAYS = 7;

export const LINKEDIN = {
  about: 'BCA student and developer focused on building clean, user-friendly software. I enjoy turning ideas into working products and learning new technologies along the way.',
  skills: ['Web Development', 'JavaScript', 'React', 'Python', 'C++', 'SQL', 'Problem Solving', 'Teamwork'],
  certifications: ['Microsoft Learn — Azure Fundamentals', 'Microsoft Learn — AI Fundamentals', 'Web Development Bootcamp'],
  experience: [
    { role: 'Freelance Developer', period: '2025 — Present', desc: 'Building websites and small applications for clients and personal projects.' },
    { role: 'Open Source Contributor', period: '2024 — Present', desc: 'Contributing to and maintaining personal projects on GitHub.' },
  ],
};

export const WALLPAPERS = [
  { id: 'sonoma', name: 'Sonoma Sunrise', url: 'https://images.pexels.com/photos/675251/pexels-photo-675251.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { id: 'peaks', name: 'Quiet Peaks', url: 'https://images.pexels.com/photos/1295212/pexels-photo-1295212.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { id: 'dusk', name: 'Mountain Dusk', url: 'https://images.pexels.com/photos/5661213/pexels-photo-5661213.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { id: 'golden', name: 'Golden Hour', url: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { id: 'sunset', name: 'Alpine Sunset', url: 'https://images.pexels.com/photos/6335993/pexels-photo-6335993.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { id: 'twilight', name: 'Twilight Ridge', url: 'https://images.pexels.com/photos/1809644/pexels-photo-1809644.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { id: 'aurora', name: 'Aurora Night', url: 'https://images.pexels.com/photos/1819660/pexels-photo-1819660.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { id: 'moody', name: 'Moody Range', url: 'https://images.pexels.com/photos/25365022/pexels-photo-25365022.jpeg?auto=compress&cs=tinysrgb&w=1920' },
];

export const ACCENT_COLORS = [
  { id: 'blue', name: 'Blue', value: '#0a84ff' },
  { id: 'purple', name: 'Purple', value: '#bf5af2' },
  { id: 'pink', name: 'Pink', value: '#ff375f' },
  { id: 'red', name: 'Red', value: '#ff453a' },
  { id: 'orange', name: 'Orange', value: '#ff9f0a' },
  { id: 'yellow', name: 'Yellow', value: '#ffd60a' },
  { id: 'green', name: 'Green', value: '#32d74b' },
  { id: 'graphite', name: 'Graphite', value: '#8e8e93' },
];
