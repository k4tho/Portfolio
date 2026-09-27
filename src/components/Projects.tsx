import { useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import databaseAppImage from '../assets/projects/database-app.png'
import evacuateImage from '../assets/projects/evacuate.png'
import vrelaxExperimentImage from '../assets/projects/vrelax-experiment.png'
import vrelaxGesturePlotImage from '../assets/projects/vrelax-gesture-plot.png'
import vrelaxKitImage from '../assets/projects/vrelax-kit.jpg'
import vrelaxNcurImage from '../assets/projects/vrelax-ncur.jpg'
import { SectionHeading } from './SectionHeading'

type Project = {
  category: string
  title: string
  result: string
  description: string
  role?: string
  contributionsHeading?: string
  contributions: string[]
  pipeline?: string
  publicationLink?: boolean
  gallery?: boolean
  galleryImages?: Array<{
    src: string
    alt: string
    wide?: boolean
  }>
  href?: string
  linkLabel?: string
  image?: string
  visual?: string
  imageAlt: string
}

const projects: Project[] = [
  {
    category: 'Machine Learning · Virtual Reality · Human-Computer Interaction',
    title: 'VRelax',
    result: 'Research Projects',
    description:
      'VRelax is an end-to-end gesture-recognition system that enables users to manipulate virtual objects through natural movement rather than predefined controller gestures. The project investigated how people intuitively perform pan, rotate, and zoom interactions—and whether machine-learning models could recognize those intentions from raw motion data.',
    contributionsHeading: 'Technical Contributions',
    contributions: [
      'Experimentation: Developed the Unity-based VR environment used to conduct experiments and capture 12 variations of pan, rotate, and zoom gestures from more than 40 participants.',
      'Motion tracking: Integrated VR controllers and external sensors to record unconstrained movement trajectories and interaction data.',
      'Data engineering: Built Python workflows with Pandas and NumPy to clean, normalize, transform, and organize raw motion data into model-ready datasets.',
      'Feature engineering: Extracted temporal and spatial characteristics including movement distance, velocity, duration, curvature, and trajectory.',
      'Machine learning: Trained and evaluated Random Forest, XGBoost, and Temporal Convolutional Network models, achieving 88–95% gesture-classification accuracy.',
      'Analysis: Created Plotly visualizations to compare gesture patterns, examine interaction behavior, and evaluate model performance.',
      'Real-time integration: Built a separate Unity testing environment that captured live movement, passed it through a trained model, and applied the predicted pan, rotate, or zoom transformation to a virtual object.',
    ],
    pipeline:
      'Natural gesture → Motion capture → Data processing → Feature extraction → Machine-learning model → Gesture prediction → Unity object transformation',
    publicationLink: true,
    gallery: true,
    galleryImages: [
      {
        src: vrelaxExperimentImage,
        alt: 'Two participants performing gestures during a VRelax VR experiment',
        wide: true,
      },
      {
        src: vrelaxKitImage,
        alt: 'VR headset, controllers, motion sensors, and recording equipment used for VRelax research',
      },
      {
        src: vrelaxNcurImage,
        alt: 'Katie presenting VRelax gesture research at the National Conference on Undergraduate Research',
      },
      {
        src: vrelaxGesturePlotImage,
        alt: 'Three-dimensional plots comparing clockwise rotation gestures across research participants',
        wide: true,
      },
    ],
    image: vrelaxExperimentImage,
    imageAlt: 'Participants using VR headsets and controllers during the VRelax experiment',
  },
  {
    category: 'Game Development',
    title: 'Evacuate',
    result: 'IEEE GameSIG 2025 Competitor & Semi-Finalist',
    description:
      'A survival-horror game combining exploration, puzzle solving, resource management, and combat within an abandoned science facility. Waking up with no memory of how they got there, the player must navigate the zombie-infested facility, strategically manage their inventory, solve puzzles to unlock new areas, and uncover clues about what happened while searching for a way to escape. Production is still underway',
    role: 'Lead Programmer & Team Lead',
    contributions: [
      'Led programming from initial prototyping through milestone delivery, coordinated a five-person development team, and managed Git integration and production builds.',
      'Developed the inventory system that allowed players to collect, organize, and use limited items required for survival, puzzle solving, and exploration.',
      'Implemented environmental interactions connecting object collection, doors, puzzles, animations, and contextual sound effects to player actions.',
      'Created player and enemy systems, including health and sickness statistics, player–enemy interactions, and AI-controlled zombies that pursued and hindered the player.',
      'Developed puzzle and level-progression systems that connected inventory items and environmental actions to unlocking new areas of the facility.',
      'Implemented scene transitions and game-state management to maintain player status, inventory, and progression as players moved between areas of the map.',
    ],
    href: 'https://store.steampowered.com/app/3747610/Evacuate/',
    linkLabel: 'Steam',
    image: evacuateImage,
    imageAlt: 'A dark corridor scene from Evacuate with two characters near a doorway',
  },
  {
    category: 'Data Engineering · Desktop Development',
    title: 'Database App',
    result: 'Freelance Work',
    description:
      'Database App is a desktop data-management system developed for a local business whose records were distributed across disconnected Excel spreadsheets. The application consolidates more than 3,000 records into a centralized relational database, providing a consistent interface for accessing, validating, and reporting on business data.',
    role: 'Desktop Application Developer',
    contributions: [
      'Designed and developed a C# and WPF desktop application backed by MySQL, replacing fragmented spreadsheet workflows with a centralized data-management system.',
      'Examined the company’s existing Excel files and mapped their inconsistent structures into a unified relational database model.',
      'Built Python ETL pipelines to clean, validate, transform, and migrate more than 3,000 records from multiple spreadsheets into MySQL.',
      'Implemented validation logic to identify incomplete or incorrectly formatted data before records were added to the database.',
      'Developed application workflows for retrieving, reviewing, and managing business records through an accessible desktop interface.',
      'Implemented backend queries and reporting functionality that allowed business data to be accessed from a single, consistent source.',
    ],
    href: 'https://github.com/k4tho/TdDatabase',
    linkLabel: 'GitHub',
    image: databaseAppImage,
    imageAlt: 'Parts catalog interface from the database management application',
  },
]

function ProjectVisual({
  image,
  visual,
  alt,
}: {
  image?: string
  visual?: string
  alt: string
}) {
  if (visual === 'gesture') {
    return (
      <div className="project-visual project-visual--gesture" role="img" aria-label={alt}>
        <div className="gesture-points" aria-hidden="true">
          {Array.from({ length: 12 }, (_, index) => <i key={index} />)}
        </div>
        <div className="signal-lines" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
      </div>
    )
  }

  return (
    <div className="project-visual">
      {image ? (
        <img src={image} alt={alt} loading="lazy" decoding="async" />
      ) : null}
    </div>
  )
}

type ProjectView = 'overview' | 'description' | 'gallery'

function ProjectCard({ project }: { project: Project }) {
  const [view, setView] = useState<ProjectView>('overview')
  const isExpanded = view !== 'overview'
  const actionLabel = view === 'overview'
    ? `Read the ${project.title} project description`
    : view === 'gallery'
      ? `Return to the ${project.title} project description`
      : `Return to the ${project.title} project overview`

  const handleCardToggle = () => {
    setView((currentView) => {
      if (currentView === 'overview') return 'description'
      if (currentView === 'gallery') return 'description'
      return 'overview'
    })
  }

  return (
    <article
      className={`project-card${isExpanded ? ' project-card--description' : ''}${
        view === 'gallery' ? ' project-card--gallery' : ''
      }${view === 'description' && project.gallery ? ' project-card--has-next' : ''}`}
    >
      <button
        className="project-card-toggle"
        type="button"
        aria-expanded={isExpanded}
        aria-label={actionLabel}
        onClick={handleCardToggle}
      />

      {view === 'gallery' ? (
        <>
          <ArrowLeft className="project-arrow project-arrow--back" size={24} aria-hidden="true" />
          <div className="project-gallery">
            <p className="project-category">VRelax Research Gallery</p>
            <div className="project-gallery-grid" aria-label="VRelax research images">
              {project.galleryImages?.map((galleryImage) => (
                <figure
                  className={`project-gallery-image${galleryImage.wide ? ' project-gallery-image--wide' : ''}`}
                  key={galleryImage.src}
                >
                  <img src={galleryImage.src} alt={galleryImage.alt} loading="lazy" decoding="async" />
                </figure>
              ))}
            </div>
          </div>
        </>
      ) : view === 'description' ? (
        <>
          <ArrowLeft className="project-arrow project-arrow--back" size={24} aria-hidden="true" />
          <div className="project-description">
            <p className="project-category">{project.category}</p>
            <div className="project-description-heading">
              <h3>{project.title}</h3>
            </div>
            <p className="project-description-text">{project.description}</p>
            {project.contributions ? (
              <div className="project-role">
                <h4>{project.contributionsHeading ?? 'Role & Contributions'}</h4>
                {project.role ? <p>{project.role}</p> : null}
                <ul>
                  {project.contributions.map((contribution) => (
                    <li key={contribution}>{contribution}</li>
                  ))}
                </ul>
                {project.pipeline ? (
                  <div className="project-pipeline">
                    <h4>System Pipeline</h4>
                    <p>{project.pipeline}</p>
                  </div>
                ) : null}
                <div className="project-role-actions">
                  {project.publicationLink ? (
                    <a className="project-publications-link" href="#publications">
                      See publications
                      <ArrowRight size={15} aria-hidden="true" />
                    </a>
                  ) : null}
                  {project.href ? (
                    <a
                      className="project-external-link"
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${project.title} on ${project.linkLabel}`}
                    >
                      View on {project.linkLabel}
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
          {project.gallery ? (
            <button
              className="project-gallery-next"
              type="button"
              aria-label={`View the ${project.title} image gallery`}
              onClick={() => setView('gallery')}
            >
              <ArrowRight size={24} aria-hidden="true" />
            </button>
          ) : null}
        </>
      ) : (
        <>
          <ProjectVisual
            image={project.image}
            visual={project.visual}
            alt={project.imageAlt}
          />
          <div className="project-copy">
            <p className="project-category">{project.category}</p>
            <h3>{project.title}</h3>
            <p className="project-result">{project.result}</p>
          </div>
          <ArrowRight className="project-arrow" size={24} aria-hidden="true" />
        </>
      )}
    </article>
  )
}

export function Projects() {
  return (
    <section
      className="content-section projects"
      id="projects"
      aria-labelledby="projects-title"
    >
      <SectionHeading
        eyebrow="Selected Projects"
        title="Featured Projects"
        titleId="projects-title"
      />

      <div className="project-list">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.title} />
        ))}
      </div>
    </section>
  )
}
