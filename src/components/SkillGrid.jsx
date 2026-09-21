import { motion } from "framer-motion";

import SkillCard from "./SkillCard";
import "./SkillGrid.css";

export default function SkillGrid({
  skills = [],
}) {
  const validSkills = Array.isArray(skills)
    ? skills.filter(Boolean)
    : [];

  if (validSkills.length === 0) {
    return (
      <div
        className="skill-grid skill-grid--empty"
        role="status"
      >
        <p>
          Aucune compétence disponible pour le moment.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="skill-grid"
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.1,
      }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
    >
      {validSkills.map((skill, index) => (
        <SkillCard
          key={
            skill._id ||
            skill.id ||
            skill.slug ||
            skill.name ||
            index
          }
          skill={skill}
          index={index}
        />
      ))}
    </motion.div>
  );
}
