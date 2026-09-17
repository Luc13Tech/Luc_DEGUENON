import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import GlassCard from "./GlassCard";

export default function ServiceCard({
  service,
  index = 0,
}) {
  if (!service) return null;

  const {
    title,
    name,
    description,
    icon,
    price,
  } = service;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
      }}
    >
      <GlassCard className="service-card">
        <div className="service-card__top">
          {icon && (
            <div className="service-card__icon">
              {icon}
            </div>
          )}

          <motion.div
            className="service-card__arrow"
            whileHover={{
              rotate: 45,
              scale: 1.1,
            }}
          >
            <ArrowUpRight size={22} />
          </motion.div>
        </div>

        <h3 className="service-card__title">
          {title || name || "Service"}
        </h3>

        {description && (
          <p className="service-card__description">
            {description}
          </p>
        )}

        {price && (
          <div className="service-card__price">
            {price}
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
}
