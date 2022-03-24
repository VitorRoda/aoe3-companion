import techData from "../data/techtreey.json";

export function getTechInfo(techName) {
    return techData.tech.find(item => item?._name === techName)
}