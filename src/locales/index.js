import en from './en';
import fr from './fr';

const translations = {
  en,
  fr,
};

export default function (locale) {
  return translations[locale] || en;
}
