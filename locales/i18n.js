import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import { I18nManager } from "react-native";
import memoize from "lodash.memoize";

const translationGetters = {
    en: () => require("./en.json"),
    ru: () => require("./ru.json")
};

export const t = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
);

export const setI18nConfig = () => {
    // fallback if no available language fits
    const fallback = { languageTag: "en", isRTL: false };

    const { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

    // clear translation cache
    t.cache.clear();

    // update layout direction
    I18nManager.forceRTL(isRTL);

    i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    i18n.locale = languageTag;
};
