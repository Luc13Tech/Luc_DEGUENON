import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

import GlassCard from "./GlassCard";

export default function ProjectCard({
  project,
  index = 0,
}) {
  if (!project) {
    return null;
  }

  const {
    title,
    name,
    description,
    image,
    imageUrl,
    category,
    technologies = [],
    url,
    liveUrl,
    website,
    githubUrl,
  } = project;

  const projectTitle =
    title ||
    name ||
    "Projet";

  const projectImage =
    image?.url ||
    imageUrl ||
    image;

  const websiteUrl =
    liveUrl ||
    url ||
    website;

  const projectTechnologies =
    Array.isArray(technologies)
      ? technologies.filter(Boolean)
      : [];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: "easeOut",
      }}
    >
      <GlassCard className="project-card">
        <div className="project-card__image-wrapper">
          {projectImage ? (
            <motion.img
              src={projectImage}
              alt={projectTitle}
              className="project-card__image"
              loading="lazy"
              whileHover={{
                scale: 1.05,
              }}
              transition={{
                duration: 0.5,
              }}
            />
          ) : (
            <div
              className="project-card__image-placeholder"
              aria-label={projectTitle}
            >
              <span>LD</span>
            </div>
          )}

          {category && (
            <span className="project-card__category">
              {category}
            </span>
          )}
        </div>

        <div className="project-card__content">
          <h3 className="project-card__title">
            {projectTitle}
          </h3>

          {description && (
            <p className="project-card__description">
              {description}
            </p>
          )}

          {projectTechnologies.length > 0 && (
            <div className="project-card__technologies">
              {projectTechnologies.map(
                (technology, technologyIndex) => (
                  <span
                    key={`${technology}-${technologyIndex}`}
                    className="project-card__technology"
                  >
                    {technology}
                  </span>
                )
              )}
            </div>
          )}

          {(websiteUrl || githubUrl) && (
            <div className="project-card__actions">
              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__link"
                  aria-label={`Voir le projet ${projectTitle}`}
                >
                  <ExternalLink size={18} />
                  <span>Voir le projet</span>
                </a>
              )}

              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__link project-card__link--secondary"
                  aria-label={`Voir le code source de ${projectTitle}`}
                >
                  <Github size={18} />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}
