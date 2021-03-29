import {createI18n} from 'vue-i18n'
import {lang} from '@/config/globalConfig';
import elementEnLocale from 'element-plus/lib/locale/lang/en';
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn';
import enLocale from './en';
import zhLocale from './zh';

const messages = {
  en: Object.assign(enLocale, elementEnLocale),
  zh: Object.assign(zhLocale, elementZhLocale)
};
const getLanguage = () => {
  const navigator:any = window.navigator;
  const language:string = (navigator.language || navigator.userLanguage|| navigator.browserLanguage).toLowerCase();
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale;
    }
  }
  return lang;
};
const i18n = createI18n({
  locale: getLanguage(),
  messages
});


// ElementLocale.i18n((path: string, option?: any) => i18n.global.t(path, option))
export default (app:any)=>{
  app.use(i18n);
};
