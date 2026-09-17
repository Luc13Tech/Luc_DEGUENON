import { motion } from "framer-motion";
import {
  FolderKanban,
  Wrench,
  Code2,
  Image,
  Settings,
  ShieldCheck,
} from "lucide-react";

import Container from "../../components/Container";
import SEO from "../../components/SEO";

export default function AdminDashboard({
  user,
  projects = [],
  skills = [],
  services = [],
}) {
  const cards = [
    {
      title: "Projets",
      value: projects.length,
      icon: FolderKanban,
      to: "/admin/projects",
    },
    {
      title: "Services",
      value: services.length,
      icon: Wrench,
      to: "/admin/services",
    },
    {
      title: "Compétences",
      value: skills.length,
      icon: Code2,
      to: "/admin/skills",
    },
    {
      title: "Médias",
      value: "→",
      icon: Image,
      to: "/admin/media",
    },
    {
      title: "Paramètres",
      value: "→",
      icon: Settings,
      to: "/admin/settings",
    },
    {
      title: "Sécurité",
      value: "→",
      icon: ShieldCheck,
      to: "/admin/audit",
    },
  ];

  return (
    <>
      <SEO
        title="Tableau de bord"
        description="Administration du portfolio Luc DEGUENON."
      />

      <main className="admin-dashboard">
        <Container>
          <motion.header
            className="admin-dashboard__header"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span>ADMINISTRATION</span>

            <h1>
              Bonjour
              {user?.name ? `, ${user.name}` : ""}.
            </h1>

            <p>
              Gérez les contenus, réalisations, services,
              médias et paramètres du portfolio.
            </p>
          </motion.header>

          <div className="admin-dashboard__grid">
            {cards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.a
                  key={card.title}
                  href={card.to}
                  className="admin-dashboard__card"
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.07,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                >
                  <div className="admin-dashboard__card-icon">
                    <Icon size={24} />
                  </div>

                  <div>
                    <strong>{card.value}</strong>
                    <span>{card.title}</span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </Container>
      </main>
    </>
  );
}
