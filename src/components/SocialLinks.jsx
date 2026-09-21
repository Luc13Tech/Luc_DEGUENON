import {
  Github,
  Linkedin,
  Mail,
  Globe,
} from "lucide-react";

const defaultLinks = [
  {
    key: "github",
    label: "GitHub",
    href: "https://github.com/Luc13Tech",
    icon: Github,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: Linkedin,
  },
  {
    key: "email",
    label: "Email",
    href: "mailto:contact@lucdeguenon.com",
    icon: Mail,
  },
];

export default function SocialLinks({
  links = defaultLinks,
  showLabels = false,
  className = "",
}) {
  const validLinks = Array.isArray(links)
    ? links.filter(
        (item) => item?.href
      )
    : [];

  if (validLinks.length === 0) {
    return null;
  }

  const classes = [
    "social-links",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav
      className={classes}
      aria-label="Réseaux sociaux"
    >
      {validLinks.map((item) => {
        const Icon = item.icon || Globe;

        const isMail =
          item.href.startsWith("mailto:");

        return (
          <a
            key={
              item.key ||
              item.label ||
              item.href
            }
            href={item.href}
            className="social-links__item"
            target={
              isMail
                ? undefined
                : "_blank"
            }
            rel={
              isMail
                ? undefined
                : "noopener noreferrer"
            }
            aria-label={
              item.label || "Lien externe"
            }
          >
            <Icon
              size={20}
              aria-hidden="true"
            />

            {showLabels && (
              <span>
                {item.label}
              </span>
            )}
          </a>
        );
      })}
    </nav>
  );
}
