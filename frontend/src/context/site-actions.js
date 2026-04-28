import { createContext, useCallback, useContext, useState } from "react";

const SiteActionsContext = createContext(null);

export const SiteActionsProvider = ({ children }) => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openContactInfo = useCallback(() => {
    setIsContactOpen(true);
  }, []);

  const closeContactInfo = useCallback(() => {
    setIsContactOpen(false);
  }, []);

  return (
    <SiteActionsContext.Provider value={{ openContactInfo, closeContactInfo, isContactOpen, setIsContactOpen }}>
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
