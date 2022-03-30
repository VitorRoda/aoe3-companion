import techData from "../data/techtreey.json";

export function getTechInfo(value, prop = '_name') {
    return techData.tech.find(item => item?.[prop] === value)
}