import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";

export default function ServiceGrid({
  services = [],
}) {
  if (!Array.isArray(services) || services.length === 0) {
    return (
      <div className="service-grid service-grid--empty">
        <p>Aucun service disponible pour le moment.</p>
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
      {services.map((service, index) => (
        <ServiceCard
          key={
            service._id ||
            service.id ||
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
