export function translate(value, prop = '__locid') {
  return window?.dict?.find(item => item[prop] === value)?.__text || ''
}