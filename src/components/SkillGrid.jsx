import { motion } from "framer-motion";
import SkillCard from "./SkillCard";

export default function SkillGrid({
  skills = [],
}) {
  if (!Array.isArray(skills) || skills.length === 0) {
    return (
      <div className="skill-grid skill-grid--empty">
        <p>Aucune compétence disponible pour le moment.</p>
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
      {skills.map((skill, index) => (
        <SkillCard
          key={
            skill._id ||
            skill.id ||
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
