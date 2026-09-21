import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function PageLoader({
  text,
}) {
  const { t } = useTranslation();

  const loadingText =
    text || t("common.loading");

  return (
    <div
      className="page-loader"
      role="status"
      aria-live="polite"
      aria-label={loadingText}
    >
      <motion.div
        className="page-loader__spinner"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
        aria-hidden="true"
      />

      <motion.p
        initial={{
          opacity: 0.4,
        }}
        animate={{
          opacity: [
            0.4,
            1,
            0.4,
          ],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {loadingText}
      </motion.p>
    </div>
  );
}
