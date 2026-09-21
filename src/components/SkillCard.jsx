import { motion } from "framer-motion";

import GlassCard from "./GlassCard";

export default function SkillCard({
  skill,
  index = 0,
}) {
  if (!skill) {
    return null;
  }

  const {
    name,
    title,
    level,
    percentage,
    description,
    icon,
  } = skill;

  const skillName =
    name ||
    title ||
    "Compétence";

  const numericPercentage =
    typeof percentage === "number"
      ? percentage
      : typeof level === "number"
        ? level
        : null;

  const progress =
    numericPercentage !== null
      ? Math.min(
          100,
          Math.max(0, numericPercentage)
        )
      : null;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: "easeOut",
      }}
    >
      <GlassCard className="skill-card">
        <div className="skill-card__header">
          <div className="skill-card__identity">
            {icon && (
              <div
                className="skill-card__icon"
                aria-hidden="true"
              >
                {icon}
              </div>
            )}

            <h3 className="skill-card__name">
              {skillName}
            </h3>
          </div>

          {progress !== null && (
            <span className="skill-card__percentage">
              {progress}%
            </span>
          )}
        </div>

        {description && (
          <p className="skill-card__description">
            {description}
          </p>
        )}

        {progress !== null && (
          <div
            className="skill-card__progress"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label={`${skillName}: ${progress}%`}
          >
            <motion.div
              className="skill-card__progress-bar"
              initial={{
                width: 0,
              }}
              whileInView={{
                width: `${progress}%`,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1,
                delay: index * 0.06 + 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
}
