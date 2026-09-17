import { motion } from "framer-motion";

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  size: 2 + (index % 3),
  left: `${(index * 37) % 100}%`,
  top: `${(index * 61) % 100}%`,
  duration: 4 + (index % 5),
  delay: (index % 6) * 0.4,
}));

export default function AnimatedBackground() {
  return (
    <div className="animated-background" aria-hidden="true">
      <motion.div
        className="animated-background__glow animated-background__glow--one"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 25, 0],
          scale: [1, 1.12, 0.95, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="animated-background__glow animated-background__glow--two"
        animate={{
          x: [0, -35, 25, 0],
          y: [0, 25, -20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="animated-background__particles">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="animated-background__particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, -35, 0],
              opacity: [0.15, 0.8, 0.15],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
