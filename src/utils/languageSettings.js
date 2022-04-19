export const DEFAULT_LANG = {
  id: 'es',
  text: 'ESP'
}

export const DISPLAY_TEXT_LIST = [
  {id: 'es', text: 'ESP'},
  {id: 'en', text: 'ENG'},
  {id: 'zh', text: '繁體中文'}
]

export const langToText = (lang) => {
  if (lang) {
      const { text } = DISPLAY_TEXT_LIST.find(({ id }) => id === lang)
      return text
  }
  return DEFAULT_LANG.text
}
