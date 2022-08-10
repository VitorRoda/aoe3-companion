export function translate(value, bySymbol = false) {
  let valueId = value

  if (bySymbol) {
    valueId = `cString${value}`
    return window?.dictSymbolIndexed[valueId]?.__text || ''
  }
  
  return window.dictIndexed[value]?.__text || ''
}