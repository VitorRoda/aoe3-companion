import dataCiv from "../data/civs.json";

export function getCivs() {
    return dataCiv.civ.filter((item) => +item?.visible !== 0)
}

export function getCivByName(civName) {
    return dataCiv.civ.find((item) => item?.name === civName)
}