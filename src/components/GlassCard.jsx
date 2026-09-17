import { motion } from "framer-motion";

export default function GlassCard({
  children,
  className = "",
  hover = true,
  onClick,
}) {
  return (
    <motion.div
      className={`glass-card ${className}`.trim()}
      onClick={onClick}
      whileHover={
        hover
          ? {
              y: -6,
            }
          : undefined
      }
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
