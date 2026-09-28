import { Braces, Cog, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionHeading } from './SectionHeading'

type SkillGroup = {
  title: string
  icon: LucideIcon
  skills: string[]
}

const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    icon: Braces,
    skills: [
      'Python',
      'Java',
      'C#',
      'JavaScript',
      'SQL',
      'MySQL',
      'C++',
      'TypeScript',
      'XML',
      'R',
      'HTML',
      'CSS',
    ],
  },
  {
    title: 'Frameworks',
    icon: Cog,
    skills: [
      'React',
      'Plotly',
      'Matplotlib',
      'Pandas',
      'TensorFlow',
      'PyTorch',
      'Scikit-Learn',
      'Seaborn',
      '.NET',
    ],
  },
  {
    title: 'Technologies & Tools',
    icon: Wrench,
    skills: [
      'GitHub',
      'Bash',
      'Docker',
      'Linux',
      'Unix',
      'Azure DevOps',
      'Excel',
      'Tableau',
      'Alteryx',
      'Unity Engine',
    ],
  },
]

export function Skills() {
  return (
    <section
      className="content-section skills"
      id="skills"
      aria-labelledby="skills-title"
    >
      <SectionHeading
        eyebrow="Technical Skills"
        title="Skills & Technologies"
        titleId="skills-title"
      />

      <div className="skill-groups">
        {skillGroups.map(({ title, icon: Icon, skills }) => (
          <div className="skill-group" key={title}>
            <div className="skill-group-heading">
              <span className="skill-icon" aria-hidden="true">
                <Icon size={25} strokeWidth={1.9} />
              </span>
              <h3>{title}</h3>
            </div>
            <ul className="skill-list" aria-label={`${title} skills`}>
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
