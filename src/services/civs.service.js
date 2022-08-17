import dataCiv from "../data/civs.xml.json";

export function getCivs() {
    return dataCiv.civs.civ.filter((item) => +item?.visible !== 0)
}

export function getCivByName(civName) {
    return dataCiv.civs.civ.find((item) => item?.name === civName)
}