import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import ProjectCard from "../../components/ProjectCard";
import ServiceGrid from "../../components/ServiceGrid";
import SkillGrid from "../../components/SkillGrid";
import Button from "../../components/Button";

export function SkillsPreview({ skills = [] }) {
  const { t } = useTranslation();

  return (
    <section className="home-section home-section--skills">
      <Container>
        <SectionTitle
          eyebrow={t("homeSections.skills.eyebrow")}
          title={t("homeSections.skills.title")}
          description={t(
            "homeSections.skills.description"
          )}
        />

        <SkillGrid skills={skills.slice(0, 6)} />

        {skills.length > 6 && (
          <div className="home-section__action">
            <Button
              to="/about"
              icon={<ArrowRight size={18} />}
            >
              {t("homeSections.skills.viewAll")}
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
  const { t } = useTranslation();

  return (
    <section className="home-section home-section--projects">
      <Container>
        <SectionTitle
          eyebrow={t("homeSections.projects.eyebrow")}
          title={t("homeSections.projects.title")}
          description={t(
            "homeSections.projects.description"
          )}
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
            {t("homeSections.projects.empty")}
          </p>
        )}

        {projects.length > 0 && (
          <div className="home-section__action">
            <Button
              to="/projects"
              icon={<ArrowRight size={18} />}
            >
              {t("homeSections.projects.viewAll")}
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
  const { t } = useTranslation();

  return (
    <section className="home-section home-section--services">
      <Container>
        <SectionTitle
          eyebrow={t("homeSections.services.eyebrow")}
          title={t("homeSections.services.title")}
          description={t(
            "homeSections.services.description"
          )}
        />

        <ServiceGrid services={services.slice(0, 4)} />

        {services.length > 4 && (
          <div className="home-section__action">
            <Button
              to="/services"
              icon={<ArrowRight size={18} />}
            >
              {t("homeSections.services.viewAll")}
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}

export function ProjectLinks({ projects = [] }) {
  const { t } = useTranslation();

  const externalProjects = projects.filter(
    (project) =>
      project?.liveUrl ||
      project?.url ||
      project?.website
  );

  if (externalProjects.length === 0) {
    return null;
  }

  return (
    <section className="home-section home-section--links">
      <Container>
        <SectionTitle
          eyebrow={t("homeSections.links.eyebrow")}
          title={t("homeSections.links.title")}
          description={t(
            "homeSections.links.description"
          )}
        />

        <div className="project-links">
          {externalProjects.slice(0, 8).map(
            (project, index) => {
              const url =
                project.liveUrl ||
                project.url ||
                project.website;

              const title =
                project.title ||
                project.name ||
                t(
                  "homeSections.links.projectFallback"
                );

              return (
                <motion.a
                  key={
                    project._id ||
                    project.id ||
                    project.slug ||
                    index
                  }
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                  aria-label={`${title} — ${t(
                    "homeSections.links.openProject"
                  )}`}
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
