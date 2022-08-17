export function translate(value, bySymbol = false) {
  let valueId = value

  if (bySymbol) {
    valueId = `cString${value}`.toLocaleLowerCase()
    return window?.dictSymbolIndexed[valueId]?.['#text'] || ''
  }
  
  return window.dictIndexed[value]?.['#text'] || ''
}