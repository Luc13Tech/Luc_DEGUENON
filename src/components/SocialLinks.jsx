import { Github, Linkedin, Mail, Globe } from "lucide-react";

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
}) {
  return (
    <div className="social-links">
      {links.map((item) => {
        if (!item?.href) return null;

        const Icon = item.icon || Globe;

        return (
          <a
            key={item.key || item.label}
            href={item.href}
            className="social-links__item"
            target={
              item.href.startsWith("mailto:")
                ? undefined
                : "_blank"
            }
            rel={
              item.href.startsWith("mailto:")
                ? undefined
                : "noopener noreferrer"
            }
            aria-label={item.label}
          >
            <Icon size={20} aria-hidden="true" />

            {showLabels && (
              <span>{item.label}</span>
            )}
          </a>
        );
      })}
    </div>
  );
}
