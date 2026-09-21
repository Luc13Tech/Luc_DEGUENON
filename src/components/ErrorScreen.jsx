import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function ErrorScreen({
  message,
  onRetry,
}) {
  const { t } = useTranslation();

  return (
    <main
      className="error-screen"
      role="alert"
      aria-live="assertive"
    >
      <motion.div
        className="error-screen__content"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <span className="error-screen__code">
          ERROR
        </span>

        <h1>
          {t("common.errorTitle")}
        </h1>

        <p>
          {message ||
            t("common.errorMessage")}
        </p>

        {onRetry && (
          <button
            type="button"
            className="error-screen__button"
            onClick={onRetry}
          >
            {t("common.retry")}
          </button>
        )}
      </motion.div>
    </main>
  );
}
