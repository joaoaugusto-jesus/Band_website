import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "../public/locales/en/common.json";
import ptCommon from "../public/locales/pt/common.json";
import enNavbar from "../public/locales/en/navbar.json";
import ptNavbar from "../public/locales/pt/navbar.json";
import enHero from "../public/locales/en/hero.json";
import ptHero from "../public/locales/pt/hero.json";

const resources = {
  en: {
    common: enCommon,
    navbar: enNavbar,
    hero: enHero,
  },
  pt: {
    common: ptCommon,
    navbar: ptNavbar,
    hero: ptHero,
  },
};

// ✅ INIT ONCE ONLY
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",

    ns: ["common", "navbar", "hero"],
    defaultNS: "common",

    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
}

export default i18n;