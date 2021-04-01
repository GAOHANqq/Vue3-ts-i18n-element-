import {createI18n} from 'vue-i18n'
import {lang} from '@/config/globalConfig';
import en from 'element-plus/lib/locale/lang/en';
import zh from 'element-plus/lib/locale/lang/zh-cn';
const messages = {en, zh};
const getLanguage = () => {
  if(lang) return lang;
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
export const availableLocales = i18n.global.availableLocales
export const mergeLanguage = (localObj:any): void =>{
  for (const key in localObj) {
    if(availableLocales.indexOf(key) !== -1){
      i18n.global.mergeLocaleMessage(key,localObj[key])
    }
  }
  console.log(i18n.global.getLocaleMessage('zh'));
  console.log(i18n.global.getLocaleMessage('en'));
}

export default (app:any)=>{
  app.use(i18n);
};
