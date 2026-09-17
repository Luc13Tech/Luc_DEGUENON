import { motion } from "framer-motion";

import useScrollProgress from "../hooks/useScrollProgress";

import "./ScrollProgress.css";

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="scroll-progress"
      style={{
        scaleX: progress / 100,
        transformOrigin: "left center",
      }}
      aria-hidden="true"
    />
  );
}
