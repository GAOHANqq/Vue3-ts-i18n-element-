import {createI18n} from 'vue-i18n'
import {lang} from '@/config/globalConfig';
import en from 'element-plus/lib/locale/lang/en';
import zh from 'element-plus/lib/locale/lang/zh-cn';
const messages = {en, zh};
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

export default (app:any)=>{
  app.use(i18n);
};
