import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const action = useNavigationType();

  useEffect(() => {
    if (action === "POP") {
      return;
    }

    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);

    document.documentElement.style.scrollBehavior = "";
  }, [pathname, action]);

  return null;
}