import { motion } from "framer-motion";

export default function StatCard({
  value,
  label,
  description,
  icon = null,
}) {
  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5 }}
    >
      {icon && (
        <div className="stat-card__icon" aria-hidden="true">
          {icon}
        </div>
      )}

      <div className="stat-card__value">
        {value}
      </div>

      <div className="stat-card__label">
        {label}
      </div>

      {description && (
        <p className="stat-card__description">
          {description}
        </p>
      )}
    </motion.div>
  );
}
