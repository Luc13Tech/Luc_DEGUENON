import { motion } from "framer-motion";

export default function PageLoader({ text = "Chargement..." }) {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <motion.div
        className="page-loader__spinner"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.p
        initial={{ opacity: 0.4 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.p>
    </div>
  );
}
