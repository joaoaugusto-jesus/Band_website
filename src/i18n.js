import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "../public/locales/en/common.json";
import ptCommon from "../public/locales/pt/common.json";
import enNavbar from "../public/locales/en/navbar.json";
import ptNavbar from "../public/locales/pt/navbar.json";
import enHero from "../public/locales/en/hero.json";
import ptHero from "../public/locales/pt/hero.json";
import enAbout from "../public/locales/en/about.json";
import ptAbout from "../public/locales/pt/about.json";
import enLogin from "../public/locales/en/login.json";
import ptLogin from "../public/locales/pt/login.json";
import enStore from "../public/locales/en/store.json";
import ptStore from "../public/locales/pt/store.json";
import enAgenda from "../public/locales/en/agenda.json";
import ptAgenda from "../public/locales/pt/agenda.json";
import enCard from "../public/locales/en/card.json";
import ptCard from "../public/locales/pt/card.json";
import enMedia from "../public/locales/en/media.json";
import ptMedia from "../public/locales/pt/media.json";
import enContactus from "../public/locales/en/contactus.json";
import ptContactus from "../public/locales/pt/contactus.json";
import enBooking from "../public/locales/en/booking.json";
import ptBooking from "../public/locales/pt/booking.json";
import enSubscribe from "../public/locales/en/subscribe.json";
import ptSubscribe from "../public/locales/pt/subscribe.json";  
import enFooter from "../public/locales/en/footer.json";
import ptFooter from "../public/locales/pt/footer.json";

const resources = {
  en: {
    common: enCommon,
    navbar: enNavbar,
    hero: enHero,
    about: enAbout,
    login: enLogin,
    store: enStore,
    agenda: enAgenda,
    card: enCard,
    media: enMedia,
    contactus: enContactus,
    booking: enBooking,
    subscribe: enSubscribe,
    footer: enFooter,
  },
  pt: {
    common: ptCommon,
    navbar: ptNavbar,
    hero: ptHero,
    about: ptAbout,
    login: ptLogin,
    store: ptStore,
    agenda: ptAgenda,
    card: ptCard,
    media: ptMedia,
    contactus: ptContactus,
    booking: ptBooking,
    subscribe: ptSubscribe,
    footer: ptFooter,
  },
};

// ✅ INIT ONCE ONLY
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",

    ns: ["common", "navbar", "hero", "about", "login", "store", "agenda", "card", "media", "contactus", "booking", "subscribe", "footer"],
    defaultNS: "common",

    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
}

export default i18n;