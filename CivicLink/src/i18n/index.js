import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ig from "./ig.json";
import yo from "./yo.json";
import ha from "./ha.json";

i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      ha: { translation: ha },
      yo: { translation: yo },
      ig: { translation: ig },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });
  export default i18n;