import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Github,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import Container from "../../components/Container";
import Button from "../../components/Button";
import SEO from "../../components/SEO";

export default function ProjectDetail({
  projects = [],
}) {
  const { t } = useTranslation();
  const { slug } = useParams();

  const project = projects.find(
    (item) =>
      String(item?.slug || "") === String(slug) ||
      String(item?._id || "") === String(slug) ||
      String(item?.id || "") === String(slug)
  );

  if (!project) {
    return (
      <>
        <SEO
          title={t("projects.notFound")}
          description={t(
            "projects.notFoundDescription"
          )}
        />

        <main className="project-detail project-detail--not-found">
          <Container>
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <span>404</span>

              <h1>
                {t("projects.notFound")}
              </h1>

              <p>
                {t(
                  "projects.notFoundDescription"
                )}
              </p>

              <Button
                to="/projects"
                icon={<ArrowLeft size={18} />}
              >
                {t("projects.backToProjects")}
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
    t("homeSections.links.projectFallback");

  const description =
    project.description ||
    project.longDescription ||
    "";

  const image =
    project.image?.url ||
    project.imageUrl ||
    (typeof project.image === "string"
      ? project.image
      : "");

  const website =
    project.liveUrl ||
    project.website ||
    project.url ||
    "";

  const github =
    project.githubUrl ||
    project.github ||
    "";

  const technologies = Array.isArray(
    project.technologies
  )
    ? project.technologies
    : [];

  const longDescription =
    project.longDescription || "";

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
              {t(
                "projects.backToProjects"
              )}
            </Link>

            <motion.div
              className="project-detail__header"
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
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
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.7,
                }}
              >
                <img
                  src={image}
                  alt={title}
                  className="project-detail__image"
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.display =
                      "none";
                  }}
                />
              </motion.div>
            )}

            <div className="project-detail__grid">
              <div className="project-detail__description">
                {longDescription ? (
                  <>
                    <h2>
                      {t(
                        "projects.aboutProject"
                      )}
                    </h2>

                    <p>
                      {longDescription}
                    </p>
                  </>
                ) : description ? (
                  <>
                    <h2>
                      {t(
                        "projects.aboutProject"
                      )}
                    </h2>

                    <p>
                      {description}
                    </p>
                  </>
                ) : null}
              </div>

              <aside className="project-detail__sidebar">
                {technologies.length > 0 && (
                  <div>
                    <h3>
                      {t(
                        "projects.technologies"
                      )}
                    </h3>

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
                      {t("projects.visit")}
                    </Button>
                  )}

                  {github && (
                    <Button
                      href={github}
                      variant="secondary"
                      icon={
                        <Github size={18} />
                      }
                    >
                      {t(
                        "projects.sourceCode"
                      )}
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
