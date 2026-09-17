import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import ProjectCard from "../../components/ProjectCard";
import ServiceGrid from "../../components/ServiceGrid";
import SkillGrid from "../../components/SkillGrid";
import Button from "../../components/Button";

export function SkillsPreview({ skills = [] }) {
  return (
    <section className="home-section home-section--skills">
      <Container>
        <SectionTitle
          eyebrow="EXPERTISE"
          title="Mes compétences"
          description="Les technologies utilisées pour concevoir des solutions numériques modernes."
        />

        <SkillGrid skills={skills.slice(0, 6)} />

        {skills.length > 6 && (
          <div className="home-section__action">
            <Button
              to="/about"
              icon={<ArrowRight size={18} />}
            >
              Voir toutes mes compétences
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}

export function ProjectsPreview({
  projects = [],
}) {
  return (
    <section className="home-section home-section--projects">
      <Container>
        <SectionTitle
          eyebrow="RÉALISATIONS"
          title="Quelques projets"
          description="Découvrez une sélection de réalisations développées pour différents besoins."
        />

        {projects.length > 0 ? (
          <div className="projects-grid">
            {projects.slice(0, 6).map((project, index) => (
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
          <p className="home-section__empty">
            Les réalisations seront bientôt disponibles.
          </p>
        )}

        {projects.length > 0 && (
          <div className="home-section__action">
            <Button
              to="/projects"
              icon={<ArrowRight size={18} />}
            >
              Voir toutes les réalisations
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}

export function ServicesPreview({
  services = [],
}) {
  return (
    <section className="home-section home-section--services">
      <Container>
        <SectionTitle
          eyebrow="SERVICES"
          title="Ce que je propose"
          description="Des prestations numériques adaptées aux objectifs de votre projet."
        />

        <ServiceGrid services={services.slice(0, 4)} />

        {services.length > 4 && (
          <div className="home-section__action">
            <Button
              to="/services"
              icon={<ArrowRight size={18} />}
            >
              Découvrir tous les services
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}

export function ProjectLinks({ projects = [] }) {
  const externalProjects = projects.filter(
    (project) =>
      project?.liveUrl ||
      project?.url
  );

  if (externalProjects.length === 0) {
    return null;
  }

  return (
    <section className="home-section home-section--links">
      <Container>
        <SectionTitle
          eyebrow="EN LIGNE"
          title="Mes réalisations sur le web"
          description="Accédez directement aux plateformes et sites réalisés."
        />

        <div className="project-links">
          {externalProjects.slice(0, 8).map(
            (project, index) => {
              const url =
                project.liveUrl ||
                project.url;

              const title =
                project.title ||
                project.name ||
                "Projet";

              return (
                <motion.a
                  key={
                    project._id ||
                    project.id ||
                    index
                  }
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                  whileHover={{ y: -4 }}
                >
                  <span>{title}</span>
                  <ExternalLink size={18} />
                </motion.a>
              );
            }
          )}
        </div>
      </Container>
    </section>
  );
}
