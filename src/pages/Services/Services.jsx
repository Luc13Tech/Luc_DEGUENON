import { motion } from "framer-motion";

import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import ServiceGrid from "../../components/ServiceGrid";
import SEO from "../../components/SEO";

export default function Services({ services = [] }) {
  return (
    <>
      <SEO
        title="Services"
        description="Découvrez les services de développement web, mobile et de solutions numériques proposés par Luc DEGUENON."
      />

      <main className="services-page">
        <section className="page-hero">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="page-hero__eyebrow">
                MES SERVICES
              </span>

              <h1 className="page-hero__title">
                Des solutions adaptées à vos besoins.
              </h1>

              <p className="page-hero__description">
                De la conception au développement, je vous
                accompagne dans la réalisation de vos projets
                numériques.
              </p>
            </motion.div>
          </Container>
        </section>

        <section className="services-page__content">
          <Container>
            <SectionTitle
              eyebrow="EXPERTISE"
              title="Ce que je peux réaliser pour vous"
              description="Des prestations pensées pour créer des produits numériques modernes, accessibles et évolutifs."
            />

            <ServiceGrid services={services} />
          </Container>
        </section>
      </main>
    </>
  );
}
