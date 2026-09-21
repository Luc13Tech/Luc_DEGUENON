import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

import Container from "../components/Container";
import Button from "../components/Button";
import SEO from "../components/SEO";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t("notFound.title")}
        description={t(
          "notFound.description"
        )}
      />

      <main className="not-found">
        <Container>
          <motion.div
            className="not-found__content"
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <span className="not-found__code">
              404
            </span>

            <h1>
              {t("notFound.title")}
            </h1>

            <p>
              {t("notFound.description")}
            </p>

            <Button
              to="/"
              icon={
                <ArrowLeft size={18} />
              }
            >
              {t("notFound.backHome")}
            </Button>
          </motion.div>
        </Container>
      </main>
    </>
  );
}
