import i18n, { I18n, TranslateOptions } from 'i18n';

export class LocaleService {
  i18nProvider: I18n;

  constructor() {
    this.i18nProvider = i18n;
  }

  getCurrentLocale(): string {
    return this.i18nProvider.getLocale();
  }

  /**
   *
   * @returns string[] The list of available locale codes
   */
  getLocales(): string[] {
    return this.i18nProvider.getLocales();
  }

  /**
   *
   * @param locale The locale to set. Must be from the list of available locales.
   */
  setLocale(locale: string): void {
    if (this.getLocales().indexOf(locale) !== -1) {
      return this.i18nProvider.setLocale(locale);
    }
  }

  /**
   *
   * @param string String to translate
   * @param args Extra parameters
   * @returns {string} Translated string
   */
  translate(text: string | TranslateOptions): string {
    return this.i18nProvider.__(text);
  }

  /**
   *
   * @param phrase Object to translate
   * @param count The plural number
   * @returns {string} Translated string
   */
  translatePlurals(phrase, count): string {
    return this.i18nProvider.__n(phrase, count);
  }
}

export default new LocaleService();
