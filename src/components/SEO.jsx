import { useEffect } from "react";

const DEFAULT_TITLE = "Luc DEGUENON — Portfolio";
const DEFAULT_DESCRIPTION =
  "Portfolio officiel de Luc DEGUENON — Développement web, mobile et solutions numériques.";

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
}) {
  useEffect(() => {
    document.title = title
      ? `${title} | Luc DEGUENON`
      : DEFAULT_TITLE;

    setMeta("description", description);
  }, [title, description]);

  return null;
}

function setMeta(name, content) {
  if (!content) return;

  let element = document.head.querySelector(
    `meta[name="${name}"]`
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}
