import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AnimatedBackground from "../../components/AnimatedBackground";
import Container from "../../components/Container";
import Button from "../../components/Button";
import SocialLinks from "../../components/SocialLinks";
import SEO from "../../components/SEO";
import "./Home.css";

export default function Home({ profile }) {
  const { t } = useTranslation();

  const name =
    profile?.name ||
    profile?.fullName ||
    "Luc DEGUENON";

  const role =
    profile?.role ||
    profile?.title ||
    t("home.defaultRole");

  const description =
    profile?.bio ||
    profile?.description ||
    t("home.defaultDescription");

  const image =
    profile?.image?.url ||
    profile?.photo ||
    profile?.imageUrl ||
    profile?.avatar;

  return (
    <>
      <SEO
        title={t("nav.home")}
        description={`${name} — ${role}. ${t(
          "home.seoDescription"
        )}`}
      />

      <main className="home">
        <section className="hero">
          <AnimatedBackground />

          <Container className="hero__container">
            <div className="hero__content">
              <motion.span
                className="hero__eyebrow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {t("home.welcome")}
              </motion.span>

              <motion.h1
                className="hero__title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                }}
              >
                {name}
              </motion.h1>

              <motion.h2
                className="hero__role"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                }}
              >
                {role}
              </motion.h2>

              <motion.p
                className="hero__description"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                }}
              >
                {description}
              </motion.p>

              <motion.div
                className="hero__actions"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.4,
                }}
              >
                <Button
                  to="/projects"
                  icon={<ArrowRight size={18} />}
                >
                  {t("home.viewProjects")}
                </Button>

                <Button
                  to="/contact"
                  variant="secondary"
                >
                  {t("common.contactMe")}
                </Button>
              </motion.div>

              <motion.div
                className="hero__social"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.55,
                }}
              >
                <SocialLinks />
              </motion.div>
            </div>

            <motion.div
              className="hero__visual"
              initial={{
                opacity: 0,
                scale: 0.8,
                x: 40,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.25,
              }}
            >
              <div className="hero__halo" />

              <motion.div
                className="hero__image-frame"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 1, 0, -1, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    className="hero__image"
                    loading="eager"
                  />
                ) : (
                  <div
                    className="hero__image-placeholder"
                    aria-label={name}
                  >
                    LD
                  </div>
                )}
              </motion.div>
            </motion.div>
          </Container>

          <motion.a
            href="#about-preview"
            className="hero__scroll"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}
            aria-label={t("home.discover")}
          >
            <ArrowDown size={20} />
          </motion.a>
        </section>

        <section
          id="about-preview"
          className="home__intro"
        >
          <Container>
            <div className="home__intro-content">
              <span className="home__eyebrow">
                {t("home.universe")}
              </span>

              <h2>{t("home.introTitle")}</h2>

              <p>{t("home.introDescription")}</p>

              <Link
                to="/about"
                className="home__text-link"
              >
                {t("home.learnMore")}
                <ArrowRight size={18} />
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
