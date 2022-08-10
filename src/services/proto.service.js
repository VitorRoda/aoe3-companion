import { blacklistFlags, blackListUnitName, blackListUnitTypes } from '../constants'
import protoData from '../data/protoy.json'
import { translate } from '../utils/translator'

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

const baseFilters = (unit) => {
    const flags = unit?.flag || []
    const unitTypes = unit?.unittype || []

    return unitTypes.includes('Military')
        && !blackListUnitTypes.some(type => unitTypes.includes(type))
        && !blacklistFlags.some(flag => flags.includes(flag))
        && !blackListUnitName.some(namePart => unit._name.includes(namePart))
}

export function getUnitsByFilters(types = [], searchTerm = '') {
    if (!types.length && !searchTerm) return []
    
    return protoData.unit.filter(unit => {
        const unitTypes = unit?.unittype || []
        if (!unitTypes) return false

        const normalizeStr = (str) => str.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        const unitName = normalizeStr(translate(unit?.displaynameid))
        const normalizedSearchTerm = normalizeStr(searchTerm)
        const typesValidation = types.every(type => unitTypes.includes(type))

        if (searchTerm.trim()) {
            return unitName.includes(normalizedSearchTerm) && baseFilters(unit) && typesValidation
        } else {
            return baseFilters(unit) && typesValidation
        }
    }).sort((a, b) => getSortValue(a) - getSortValue(b))
}

export function getUnitById(unitId) {
    return protoData.unit.find(unit => baseFilters(unit) && (unit._id === unitId))
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