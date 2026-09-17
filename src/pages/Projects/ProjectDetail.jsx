import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

import Container from "../../components/Container";
import Button from "../../components/Button";
import SEO from "../../components/SEO";

export default function ProjectDetail({
  projects = [],
}) {
  const { slug } = useParams();

  const project = projects.find(
    (item) =>
      item?.slug === slug ||
      item?._id === slug ||
      item?.id === slug
  );

  if (!project) {
    return (
      <>
        <SEO title="Projet introuvable" />

        <main className="project-detail project-detail--not-found">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span>404</span>

              <h1>Projet introuvable</h1>

              <p>
                Cette réalisation n'existe pas ou n'est plus
                disponible.
              </p>

              <Button
                to="/projects"
                icon={<ArrowLeft size={18} />}
              >
                Retour aux réalisations
              </Button>
            </motion.div>
          </Container>
        </main>
      </>
    );
  }

  const title =
    project.title ||
    project.name ||
    "Projet";

  const description =
    project.description ||
    project.longDescription ||
    "";

  const image =
    project.image?.url ||
    project.imageUrl ||
    project.image;

  const website =
    project.liveUrl ||
    project.url;

  const github =
    project.githubUrl;

  const technologies =
    Array.isArray(project.technologies)
      ? project.technologies
      : [];

  return (
    <>
      <SEO
        title={title}
        description={description}
      />

      <main className="project-detail">
        <section className="project-detail__hero">
          <Container>
            <Link
              to="/projects"
              className="project-detail__back"
            >
              <ArrowLeft size={18} />
              Retour aux réalisations
            </Link>

            <motion.div
              className="project-detail__header"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {project.category && (
                <span className="project-detail__category">
                  {project.category}
                </span>
              )}

              <h1>{title}</h1>

              {description && (
                <p>{description}</p>
              )}
            </motion.div>
          </Container>
        </section>

        <section className="project-detail__content">
          <Container>
            {image && (
              <motion.div
                className="project-detail__image-wrapper"
                initial={{
                  opacity: 0,
                  scale: 0.96,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <img
                  src={image}
                  alt={title}
                  className="project-detail__image"
                />
              </motion.div>
            )}

            <div className="project-detail__grid">
              <div className="project-detail__description">
                {project.longDescription &&
                  project.longDescription !==
                    description && (
                    <>
                      <h2>À propos du projet</h2>
                      <p>
                        {project.longDescription}
                      </p>
                    </>
                  )}
              </div>

              <aside className="project-detail__sidebar">
                {technologies.length > 0 && (
                  <div>
                    <h3>Technologies</h3>

                    <div className="project-detail__technologies">
                      {technologies.map(
                        (technology, index) => (
                          <span
                            key={`${technology}-${index}`}
                          >
                            {technology}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

                <div className="project-detail__actions">
                  {website && (
                    <Button
                      href={website}
                      icon={
                        <ExternalLink size={18} />
                      }
                    >
                      Visiter le projet
                    </Button>
                  )}

                  {github && (
                    <Button
                      href={github}
                      variant="secondary"
                      icon={<Github size={18} />}
                    >
                      Voir le code
                    </Button>
                  )}
                </div>
              </aside>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
