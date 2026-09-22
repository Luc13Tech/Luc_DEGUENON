import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

import GlassCard from "./GlassCard";

export default function ProjectCard({
  project,
  index = 0,
}) {
  const [imageError, setImageError] = useState(false);

  if (!project) {
    return null;
  }

  const {
    title,
    name,
    description,
    image,
    imageUrl,
    imageURL,
    coverImage,
    cover,
    thumbnail,
    featuredImage,
    photo,
    images,
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

  /*
   * Récupération robuste de l'URL de l'image.
   */

  let projectImage = null;

  // image = { url: "..." }
  if (
    image &&
    typeof image === "object" &&
    !Array.isArray(image)
  ) {
    projectImage =
      image.url ||
      image.secure_url ||
      image.src ||
      image.path ||
      null;
  }

  // image = "https://..."
  if (!projectImage && typeof image === "string") {
    projectImage = image;
  }

  // Autres champs possibles
  projectImage =
    projectImage ||
    imageUrl ||
    imageURL ||
    coverImage ||
    cover ||
    thumbnail ||
    featuredImage ||
    photo ||
    null;

  /*
   * Si le backend utilise images[]
   */
  if (!projectImage && Array.isArray(images)) {
    const firstImage = images.find(Boolean);

    if (typeof firstImage === "string") {
      projectImage = firstImage;
    } else if (
      firstImage &&
      typeof firstImage === "object"
    ) {
      projectImage =
        firstImage.url ||
        firstImage.secure_url ||
        firstImage.src ||
        firstImage.path ||
        null;
    }
  }

  const websiteUrl =
    liveUrl ||
    url ||
    website ||
    null;

  const projectTechnologies =
    Array.isArray(technologies)
      ? technologies.filter(Boolean)
      : [];

  /*
   * Vérification simple de l'URL.
   */
  const validImage =
    typeof projectImage === "string" &&
    projectImage.trim().length > 0 &&
    !imageError;

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

        {/* =========================
            IMAGE DU PROJET
        ========================== */}
        <div className="project-card__image-wrapper">

          {validImage ? (
            <motion.img
              src={projectImage}
              alt={projectTitle}
              className="project-card__image"
              loading="lazy"
              decoding="async"
              onError={() => {
                console.error(
                  "❌ Image du projet impossible à charger :",
                  projectImage
                );

                setImageError(true);
              }}
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
              aria-label={`Image indisponible pour ${projectTitle}`}
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

        {/* =========================
            CONTENU
        ========================== */}
        <div className="project-card__content">

          <h3 className="project-card__title">
            {projectTitle}
          </h3>

          {description && (
            <p className="project-card__description">
              {description}
            </p>
          )}

          {/* =========================
              TECHNOLOGIES
          ========================== */}
          {projectTechnologies.length > 0 && (
            <div className="project-card__technologies">
              {projectTechnologies.map(
                (technology, technologyIndex) => (
                  <span
                    key={`${technology}-${technologyIndex}`}
                    className="project-card__technology"
                  >
                    {typeof technology === "object"
                      ? technology.name ||
                        technology.title ||
                        ""
                      : technology}
                  </span>
                )
              )}
            </div>
          )}

          {/* =========================
              LIENS
          ========================== */}
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
