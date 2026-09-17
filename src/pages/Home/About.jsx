import { motion } from "framer-motion";
import { ArrowRight, Code2, Smartphone, Globe2 } from "lucide-react";

import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import SkillGrid from "../../components/SkillGrid";
import Button from "../../components/Button";
import SEO from "../../components/SEO";

export default function About({
  profile,
  skills = [],
}) {
  const name =
    profile?.name ||
    profile?.fullName ||
    "Luc DEGUENON";

  const bio =
    profile?.bio ||
    profile?.description ||
    "Développeur passionné par la création de solutions numériques modernes et performantes.";

  return (
    <>
      <SEO
        title="À propos"
        description={`Découvrez le parcours, les compétences et l'univers professionnel de ${name}.`}
      />

      <main className="about-page">
        <section className="page-hero">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="page-hero__eyebrow">
                À PROPOS
              </span>

              <h1 className="page-hero__title">
                Construire. Innover. Évoluer.
              </h1>

              <p className="page-hero__description">
                Un parcours orienté vers la création de
                solutions numériques utiles, modernes et
                évolutives.
              </p>
            </motion.div>
          </Container>
        </section>

        <section className="about-page__profile">
          <Container>
            <div className="about-page__grid">
              <motion.div
                className="about-page__content"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 }}
              >
                <span className="section-label">
                  MON PARCOURS
                </span>

                <h2>
                  Bonjour, je suis {name}.
                </h2>

                <p>{bio}</p>

                <p>
                  Je travaille sur des projets web et
                  mobiles en privilégiant une approche
                  moderne, responsive, sécurisée et
                  centrée sur l'expérience utilisateur.
                </p>

                <Button
                  to="/contact"
                  icon={<ArrowRight size={18} />}
                >
                  Parlons de votre projet
                </Button>
              </motion.div>

              <motion.div
                className="about-page__features"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 }}
              >
                <div className="about-feature">
                  <div className="about-feature__icon">
                    <Globe2 size={25} />
                  </div>

                  <div>
                    <h3>Web moderne</h3>
                    <p>
                      Des interfaces rapides, élégantes et
                      adaptées à tous les écrans.
                    </p>
                  </div>
                </div>

                <div className="about-feature">
                  <div className="about-feature__icon">
                    <Smartphone size={25} />
                  </div>

                  <div>
                    <h3>Solutions mobiles</h3>
                    <p>
                      Des expériences pensées pour les
                      utilisateurs mobiles.
                    </p>
                  </div>
                </div>

                <div className="about-feature">
                  <div className="about-feature__icon">
                    <Code2 size={25} />
                  </div>

                  <div>
                    <h3>Technologies</h3>
                    <p>
                      React, React Native, Python,
                      JavaScript et technologies associées.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        <section className="about-page__skills">
          <Container>
            <SectionTitle
              eyebrow="COMPÉTENCES"
              title="Mes compétences techniques"
              description="Les technologies et domaines techniques utilisés dans mes projets."
            />

            <SkillGrid skills={skills} />
          </Container>
        </section>
      </main>
    </>
  );
}
