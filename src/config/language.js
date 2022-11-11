export const DEFAULT_LANG = {
  code: 'es',
  text: 'ESP'
}

export const DISPLAY_TEXT_LIST = [
  {code: 'es', text: 'ESP'},
  {code: 'en', text: 'ENG'},
  {code: 'zh', text: '繁體中文'},
  {code: 'pt_br', text: 'Português Brasileiro'}
]

export const langToText = (lang) => {
  if (lang) {
      const { text } = DISPLAY_TEXT_LIST.find(({ code }) => code === lang)
      return text
  }
  return DEFAULT_LANG.text
}
