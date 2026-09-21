import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Smartphone,
  Globe2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import SkillGrid from "../../components/SkillGrid";
import Button from "../../components/Button";
import SEO from "../../components/SEO";
import "./About.css";

export default function About({
  profile,
  skills = [],
}) {
  const { t } = useTranslation();

  const name =
    profile?.name ||
    profile?.fullName ||
    "Luc DEGUENON";

  const bio =
    profile?.bio ||
    profile?.description ||
    t("about.defaultBio");

  return (
    <>
      <SEO
        title={t("about.seoTitle")}
        description={t("about.seoDescription", {
          name,
        })}
      />

      <main className="about-page">
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
                {t("about.eyebrow")}
              </span>

              <h1 className="page-hero__title">
                {t("about.title")}
              </h1>

              <p className="page-hero__description">
                {t("about.description")}
              </p>
            </motion.div>
          </Container>
        </section>

        <section className="about-page__profile">
          <Container>
            <div className="about-page__grid">
              <motion.div
                className="about-page__content"
                initial={{
                  opacity: 0,
                  x: -40,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.7,
                }}
              >
                <span className="section-label">
                  {t("about.journey")}
                </span>

                <h2>
                  {t("about.greeting", {
                    name,
                  })}
                </h2>

                <p>{bio}</p>

                <p>
                  {t("about.paragraph")}
                </p>

                <Button
                  to="/contact"
                  icon={
                    <ArrowRight size={18} />
                  }
                >
                  {t("about.contactButton")}
                </Button>
              </motion.div>

              <motion.div
                className="about-page__features"
                initial={{
                  opacity: 0,
                  x: 40,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.7,
                }}
              >
                <div className="about-feature">
                  <div className="about-feature__icon">
                    <Globe2 size={25} />
                  </div>

                  <div>
                    <h3>
                      {t(
                        "about.features.web.title"
                      )}
                    </h3>

                    <p>
                      {t(
                        "about.features.web.description"
                      )}
                    </p>
                  </div>
                </div>

                <div className="about-feature">
                  <div className="about-feature__icon">
                    <Smartphone size={25} />
                  </div>

                  <div>
                    <h3>
                      {t(
                        "about.features.mobile.title"
                      )}
                    </h3>

                    <p>
                      {t(
                        "about.features.mobile.description"
                      )}
                    </p>
                  </div>
                </div>

                <div className="about-feature">
                  <div className="about-feature__icon">
                    <Code2 size={25} />
                  </div>

                  <div>
                    <h3>
                      {t(
                        "about.features.technologies.title"
                      )}
                    </h3>

                    <p>
                      {t(
                        "about.features.technologies.description"
                      )}
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
              eyebrow={t("about.skillsEyebrow")}
              title={t("about.skills")}
              description={t(
                "about.skillsDescription"
              )}
            />

            <SkillGrid skills={skills} />
          </Container>
        </section>
      </main>
    </>
  );
}
