export const fixPath = (value, toLowerCase = false) => {
    if (!value) return ''
    
    let _value = value.replace(/\\/g, '/')

    if (toLowerCase)
        _value = _value.toLowerCase()

    if (_value[0] === '/')
        _value = _value.slice(1)
    
    return `/${_value}`
}