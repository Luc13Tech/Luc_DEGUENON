import { motion } from "framer-motion";

export default function GlassCard({
  children,
  className = "",
  hover = true,
  onClick,
  role,
  ariaLabel,
}) {
  const classes = [
    "glass-card",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.div
      className={classes}
      onClick={onClick}
      role={role}
      aria-label={ariaLabel}
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
