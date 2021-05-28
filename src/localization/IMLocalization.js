import memoize from 'lodash.memoize'; // Use for caching/memoize for better performance
import i18n from 'i18n-js';
import * as Localization from 'react-native-localize';
import { I18nManager } from 'react-native';
export const translationGetters = {
  'ar-IQ': () => require('../translations/ar.json'),
  'en-US': () => require('../translations/en.json'),
  'fr-FR': () => require('../translations/fr.json'),
};
export const IMLocalized = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);
export const init = (language) => {

  let localeLanguageTag = language;
  // let isRTL = Localization.isRTL;
  IMLocalized.cache.clear();
  // update layout direction
  // I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = {
    [localeLanguageTag]: translationGetters[localeLanguageTag](),
  };
  i18n.locale = localeLanguageTag;
};