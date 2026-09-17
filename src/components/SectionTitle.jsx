import { motion } from "framer-motion";

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
}) {
  return (
    <motion.div
      className={`section-title section-title--${align}`}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      {eyebrow && (
        <span className="section-title__eyebrow">
          {eyebrow}
        </span>
      )}

      <h2 className="section-title__heading">
        {title}
      </h2>

      {description && (
        <p className="section-title__description">
          {description}
        </p>
      )}
    </motion.div>
  );
}
