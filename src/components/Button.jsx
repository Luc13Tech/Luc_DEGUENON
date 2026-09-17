import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Button({
  children,
  to,
  href,
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
  icon = null,
  className = "",
}) {
  const classes = `button button--${variant} ${className}`.trim();

  const content = (
    <>
      <span className="button__text">{children}</span>

      {icon && (
        <span className="button__icon" aria-hidden="true">
          {icon}
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        <Link to={to} className={classes}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { y: -2 } : undefined}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
    >
      {content}
    </motion.button>
  );
}
