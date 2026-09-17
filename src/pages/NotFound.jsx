import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import Container from "../components/Container";
import Button from "../components/Button";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page introuvable"
        description="La page demandée n'existe pas."
      />

      <main className="not-found">
        <Container>
          <motion.div
            className="not-found__content"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="not-found__code">
              404
            </span>

            <h1>Page introuvable</h1>

            <p>
              La page que vous recherchez n'existe pas,
              a été déplacée ou n'est plus disponible.
            </p>

            <Button
              to="/"
              icon={<ArrowLeft size={18} />}
            >
              Retour à l'accueil
            </Button>
          </motion.div>
        </Container>
      </main>
    </>
  );
}
