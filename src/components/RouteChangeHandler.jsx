import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RouteChangeHandler() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-route",
      pathname
    );

    window.dispatchEvent(
      new CustomEvent("portfolio-route-change", {
        detail: { pathname },
      })
    );
  }, [pathname]);

  return null;
}
