import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationENCommon from "../public/locales/en/common.json";
import translationPTCommon from "../public/locales/pt/common.json";
import translationENNavbar from "../public/locales/en/navbar.json";
import translationPTNavbar from "../public/locales/pt/navbar.json";
import enCard from "../public/locales/en/card.json";
import ptCard from "../public/locales/pt/card.json";
import enHero from "../public/locales/en/hero.json";
import ptHero from "../public/locales/pt/hero.json";
import enlogin from "../public/locales/en/login.json";
import ptlogin from "../public/locales/pt/login.json";
import enStore from "../public/locales/en/store.json";
import ptStore from "../public/locales/pt/store.json";
import musiciansEN from "../public/locales/en/musicians.json";
import musiciansPT from "../public/locales/pt/musicians.json";
import agendaEN from "../public/locales/en/agenda.json";
import agendaPT from "../public/locales/pt/agenda.json";
import aboutEN from "../public/locales/en/about.json";
import aboutPT from "../public/locales/pt/about.json";


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: translationENCommon,
        navbar: translationENNavbar,
        card: enCard,
        hero: enHero,
        login: enlogin,
        store: enStore,
        modal: musiciansEN,
        agenda: agendaEN,
        about: aboutEN
      },
      pt: {
        common: translationPTCommon,
        navbar: translationPTNavbar,
        card: ptCard,
        hero: ptHero,
        login: ptlogin,
        store: ptStore,
        modal: musiciansPT,
        agenda: agendaPT,
        about: aboutPT

      },
    },
    fallbackLng: "en",
    ns: ["common", "navbar", "card", "hero", "login", "store", "modal", "agenda", "about"],
    defaultNS: "common",

    interpolation: { escapeValue: false },
  });

export default i18n;
