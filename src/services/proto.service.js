import { blacklistFlags, blackListUnitName, blackListUnitTypes } from '../constants'
import protoData from '../data/protoy.json'

export function getProtoInfo(id) {
    return protoData.unit.find(unit =>
        String(unit._name).toLowerCase() === String(id).toLocaleLowerCase()
    )
}

const sortValue = {
    'AbstractConsulateUnit': 4,
    'AbstractNativeWarrior': 3,
    'Mercenary': 2,
    'AbstractOutlaw': 1
}

export function getAllUnitsByTypes(types = []) {
    return protoData.unit.filter(unit => {
        const unitTypes = unit?.unittype || []
        const flags = unit?.flag || []

        if (!unitTypes) return false

        return unitTypes.includes('Military')
            && !blackListUnitTypes.some(type => unitTypes.includes(type))
            && !blacklistFlags.some(flag => flags.includes(flag))
            && !blackListUnitName.some(namePart => unit._name.includes(namePart))
            && types.every(type => unitTypes.includes(type))
    }).sort((a, b) => getSortValue(a) - getSortValue(b))
}

function getSortValue(unit) {
    const unitTypes = unit?.unittype || []
    const keys = Object.keys(sortValue)
    let val = 0

    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        
        if (unitTypes.includes(key)) {
            val = sortValue[key]
            break
        }
    }

    return val
}