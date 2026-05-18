import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationENCommon from "../public/locales/en/common.json";
import translationPTCommon from "../public/locales/pt/common.json";

import translationENNavbar from "../public/locales/en/navbar.json";
import translationPTNavbar from "../public/locales/pt/navbar.json";

import enHero from "../public/locales/en/hero.json";
import ptHero from "../public/locales/pt/hero.json";

const resources = {
  en: {
    common: translationENCommon,
    navbar: translationENNavbar,
    hero: enHero,
  },
  pt: {
    common: translationPTCommon,
    navbar: translationPTNavbar,
    hero: ptHero,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // IMPORTANT: force SSR consistency
    fallbackLng: "en",

    ns: ["common", "navbar", "hero"],
    defaultNS: "common",

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;