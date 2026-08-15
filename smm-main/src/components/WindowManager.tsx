import { useOS, type AppId } from '@/os/OSContext';
import Window from '@/components/Window';
import AboutApp from '@/apps/AboutApp';
import SkillsApp from '@/apps/SkillsApp';
import ProjectsApp from '@/apps/ProjectsApp';
import EducationApp from '@/apps/EducationApp';
import ResumeApp from '@/apps/ResumeApp';
import ContactApp from '@/apps/ContactApp';
import GitHubApp from '@/apps/GitHubApp';
import LinkedInApp from '@/apps/LinkedInApp';
import TerminalApp from '@/apps/TerminalApp';
import SettingsApp from '@/apps/SettingsApp';
import { ExperienceApp, OpportunitiesApp } from '@/apps/ExperienceApp';

const APP_COMPONENTS: Record<AppId, React.ComponentType> = {
  about: AboutApp,
  skills: SkillsApp,
  projects: ProjectsApp,
  education: EducationApp,
  resume: ResumeApp,
  contact: ContactApp,
  github: GitHubApp,
  linkedin: LinkedInApp,
  terminal: TerminalApp,
  settings: SettingsApp,
  experience: ExperienceApp,
  opportunities: OpportunitiesApp,
};

export default function WindowManager() {
  const { windows } = useOS();

  return (
    <>
      {windows.map((win) => {
        const App = APP_COMPONENTS[win.appId];
        return (
          <Window key={win.id} win={win}>
            <App />
          </Window>
        );
      })}
    </>
  );
}
