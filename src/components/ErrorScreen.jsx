import { motion } from "framer-motion";

export default function ErrorScreen({ message, onRetry }) {
  return (
    <main className="error-screen" role="alert">
      <motion.div
        className="error-screen__content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="error-screen__code">ERROR</span>

        <h1>Une erreur est survenue</h1>

        <p>
          {message ||
            "Impossible de charger les données du portfolio."}
        </p>

        {onRetry && (
          <button
            type="button"
            className="error-screen__button"
            onClick={onRetry}
          >
            Réessayer
          </button>
        )}
      </motion.div>
    </main>
  );
}
