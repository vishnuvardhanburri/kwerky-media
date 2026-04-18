import { createContext, useCallback, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SiteActionsContext = createContext(null);

export const SiteActionsProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const openContactInfo = useCallback(() => {
    if (location.pathname === "/services") {
      const target = document.getElementById("contact-info-section");
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    navigate("/services#contact-info-section");
    window.setTimeout(() => {
      document.getElementById("contact-info-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }, [location.pathname, navigate]);

  return (
    <SiteActionsContext.Provider value={{ openContactInfo }}>
      {children}
    </SiteActionsContext.Provider>
  );
};

export const useSiteActions = () => {
  const context = useContext(SiteActionsContext);
  if (!context) {
    throw new Error("useSiteActions must be used within a SiteActionsProvider");
  }
  return context;
};
