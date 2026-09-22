import { motion } from "framer-motion";

import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import ProjectCard from "../../components/ProjectCard";
import SEO from "../../components/SEO";
import "./Projects.css";

export default function Projects({
  projects = [],
}) {
  /*
   * Sécurité :
   * on s'assure toujours d'avoir un tableau.
   */
  const projectList = Array.isArray(projects)
    ? projects.filter(Boolean)
    : [];

  return (
    <>
      <SEO
        title="Réalisations"
        description="Découvrez les projets web, mobiles et solutions numériques réalisés par Luc DEGUENON."
      />

      <main className="projects-page">

        {/* =========================
            HERO
        ========================== */}
        <section className="page-hero">
          <Container>
            <motion.div
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
              <span className="page-hero__eyebrow">
                MES RÉALISATIONS
              </span>

              <h1 className="page-hero__title">
                Des projets qui prennent vie.
              </h1>

              <p className="page-hero__description">
                Découvrez une sélection de
                réalisations numériques conçues
                et développées avec une approche
                moderne.
              </p>
            </motion.div>
          </Container>
        </section>

        {/* =========================
            PROJETS
        ========================== */}
        <section className="projects-page__content">
          <Container>

            <SectionTitle
              eyebrow="PORTFOLIO"
              title="Mes projets"
              description="Une sélection de projets issus de différents secteurs et besoins."
            />

            {projectList.length > 0 ? (
              <div className="projects-grid">

                {projectList.map(
                  (project, index) => {
                    /*
                     * Sécurité pour les clés React.
                     */
                    const projectKey =
                      project?._id ||
                      project?.id ||
                      project?.slug ||
                      `project-${index}`;

                    return (
                      <ProjectCard
                        key={projectKey}
                        project={project}
                        index={index}
                      />
                    );
                  }
                )}

              </div>
            ) : (
              <motion.div
                className="projects-empty"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                }}
              >
                <p>
                  Les réalisations seront bientôt
                  disponibles.
                </p>
              </motion.div>
            )}

          </Container>
        </section>

      </main>
    </>
  );
}
