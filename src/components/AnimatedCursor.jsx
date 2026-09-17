import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedCursor() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    const updateEnabled = () => {
      setEnabled(mediaQuery.matches);
    };

    updateEnabled();

    mediaQuery.addEventListener("change", updateEnabled);

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateEnabled
      );
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handlePointerMove = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <motion.div
        className="animated-cursor animated-cursor--outer"
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 22,
          mass: 0.35,
        }}
      />

      <motion.div
        className="animated-cursor animated-cursor--inner"
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{
          duration: 0.05,
        }}
      />
    </>
  );
}
