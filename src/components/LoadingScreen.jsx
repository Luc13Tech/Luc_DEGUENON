import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function LoadingScreen() {
  const { t } = useTranslation();

  return (
    <div
      className="loading-screen"
      role="status"
      aria-live="polite"
      aria-label={t("common.loading")}
    >
      <motion.div
        className="loading-screen__content"
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <motion.div
          className="loading-screen__halo"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [
              0.35,
              0.7,
              0.35,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="loading-screen__logo"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
          }}
          aria-hidden="true"
        >
          LD
        </motion.div>

        <p>{t("common.loading")}</p>
      </motion.div>
    </div>
  );
}
