import { motion } from "framer-motion";

import ServiceCard from "./ServiceCard";

export default function ServiceGrid({
  services = [],
}) {
  const validServices = Array.isArray(services)
    ? services.filter(Boolean)
    : [];

  if (validServices.length === 0) {
    return (
      <div
        className="service-grid service-grid--empty"
        role="status"
      >
        <p>
          Aucun service disponible pour le moment.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="service-grid"
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.1,
      }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
    >
      {validServices.map((service, index) => (
        <ServiceCard
          key={
            service._id ||
            service.id ||
            service.slug ||
            service.name ||
            service.title ||
            index
          }
          service={service}
          index={index}
        />
      ))}
    </motion.div>
  );
}
