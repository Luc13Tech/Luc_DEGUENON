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
  ariaLabel,
}) {
  const classes = [
    "button",
    `button--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className="button__text">
        {children}
      </span>

      {icon && (
        <span
          className="button__icon"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <motion.div
        className="button-wrapper"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        <Link
          to={to}
          className={classes}
          aria-label={ariaLabel}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.div
        className="button-wrapper"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        <a
          href={href}
          className={classes}
          aria-label={ariaLabel}
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
      aria-label={ariaLabel}
      whileHover={
        !disabled
          ? { y: -2 }
          : undefined
      }
      whileTap={
        !disabled
          ? { scale: 0.97 }
          : undefined
      }
      transition={{
        duration: 0.2,
      }}
    >
      {content}
    </motion.button>
  );
}
