import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Resets scroll position when navigating to a new route, preventing users
    // from landing at the bottom of the checkout page if they clicked from the bottom of the cart.
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}