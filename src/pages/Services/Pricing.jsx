import { motion } from "framer-motion";
import { Check } from "lucide-react";

import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";

export default function Pricing({ services = [] }) {
  const pricedServices = services.filter(
    (service) =>
      service?.price ||
      service?.pricing ||
      service?.amount
  );

  return (
    <section className="pricing-section">
      <Container>
        <SectionTitle
          eyebrow="TARIFS"
          title="Des prestations adaptées à votre projet"
          description="Les prestations et tarifs sont présentés selon les informations configurées dans la plateforme."
        />

        {pricedServices.length > 0 ? (
          <div className="pricing-grid">
            {pricedServices.map((service, index) => {
              const title =
                service.title ||
                service.name ||
                "Prestation";

              const price =
                service.price ||
                service.pricing ||
                service.amount;

              const features = Array.isArray(
                service.features
              )
                ? service.features
                : [];

              return (
                <motion.article
                  key={
                    service._id ||
                    service.id ||
                    index
                  }
                  className="pricing-card"
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                  }}
                >
                  <h3>{title}</h3>

                  <div className="pricing-card__price">
                    {price}
                  </div>

                  {service.description && (
                    <p>
                      {service.description}
                    </p>
                  )}

                  {features.length > 0 && (
                    <ul>
                      {features.map(
                        (feature, featureIndex) => (
                          <li key={featureIndex}>
                            <Check size={17} />
                            <span>{feature}</span>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div className="pricing-empty">
            <p>
              Les tarifs seront affichés ici dès qu'ils
              seront configurés dans l'administration.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
