export function translate(value, bySymbol = false) {
  let propId = '__locid'
  let valueId = value

  if (bySymbol) {
    propId = '_symbol'
    valueId = `cString${value}`
    return window?.dict?.find(item => item[propId] === valueId)?.__text || ''
  }
  
  return window.dictIndexed[value]?.__text || ''
}