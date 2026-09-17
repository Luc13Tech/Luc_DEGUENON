import { motion } from "framer-motion";

const variants = {
  up: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },

  down: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },

  left: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },

  right: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },

  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
};

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.15,
  className = "",
}) {
  const animation =
    variants[direction] || variants.up;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount,
      }}
      variants={animation}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
