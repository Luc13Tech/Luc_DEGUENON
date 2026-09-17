import { motion } from "framer-motion";

import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import ProjectCard from "../../components/ProjectCard";
import SEO from "../../components/SEO";

export default function Projects({ projects = [] }) {
  return (
    <>
      <SEO
        title="Réalisations"
        description="Découvrez les projets web, mobiles et solutions numériques réalisés par Luc DEGUENON."
      />

      <main className="projects-page">
        <section className="page-hero">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="page-hero__eyebrow">
                MES RÉALISATIONS
              </span>

              <h1 className="page-hero__title">
                Des projets qui prennent vie.
              </h1>

              <p className="page-hero__description">
                Découvrez une sélection de réalisations
                numériques conçues et développées avec une
                approche moderne.
              </p>
            </motion.div>
          </Container>
        </section>

        <section className="projects-page__content">
          <Container>
            <SectionTitle
              eyebrow="PORTFOLIO"
              title="Mes projets"
              description="Une sélection de projets issus de différents secteurs et besoins."
            />

            {projects.length > 0 ? (
              <div className="projects-grid">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={
                      project._id ||
                      project.id ||
                      project.slug ||
                      index
                    }
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="projects-empty">
                <p>
                  Les réalisations seront bientôt
                  disponibles.
                </p>
              </div>
            )}
          </Container>
        </section>
      </main>
    </>
  );
}
