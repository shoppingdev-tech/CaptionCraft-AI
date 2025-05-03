import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { store } from './redux/store';

import en from '../i18/en.json';
import de from '../i18/de.json';
import fr from '../i18/fr.json';
import es from '../i18/es.json';
import it from '../i18/it.json';

const resources = {
  en: { translation: en },
  de: { translation: de },
  fr: { translation: fr },
  es: { translation: es },
  it: { translation: it },
};

let initialLanguage = 'en';
try {
  const state = store.getState();
  console.log('initialLanguage', state);

  if (state && state.auth && state.auth.language) {
    
    initialLanguage = state.auth.language;
  }
} catch (e) {}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
