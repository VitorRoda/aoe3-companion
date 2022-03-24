import langEsp from "../data/localization/stringtabley_es.json";
import langEn from "../data/localization/stringtabley_en.json";

export function translate(locId) {
  const langConfig = JSON.parse(localStorage.getItem('langEsp'))
  let dict = langEsp

  if (langConfig === false) {
    dict = langEn
  }

  return dict.language.string.find(item => item.__locid === locId)?.__text
}