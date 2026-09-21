import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import ServiceGrid from "../../components/ServiceGrid";
import SEO from "../../components/SEO";
import "./Services.css";

export default function Services({
  services = [],
}) {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t("services.title")}
        description={t(
          "services.description"
        )}
      />

      <main className="services-page">
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
                {t("services.eyebrow")}
              </span>

              <h1 className="page-hero__title">
                {t("services.title")}
              </h1>

              <p className="page-hero__description">
                {t("services.description")}
              </p>
            </motion.div>
          </Container>
        </section>

        <section className="services-page__content">
          <Container>
            <SectionTitle
              eyebrow={t(
                "services.expertise"
              )}
              title={t(
                "services.expertiseTitle"
              )}
              description={t(
                "services.expertiseDescription"
              )}
            />

            {services.length > 0 ? (
              <ServiceGrid
                services={services}
              />
            ) : (
              <div className="services-empty">
                <p>
                  {t(
                    "services.pricingEmpty"
                  )}
                </p>
              </div>
            )}
          </Container>
        </section>
      </main>
    </>
  );
}
