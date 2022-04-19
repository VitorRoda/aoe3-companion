import { blacklistFlags, blackListUnitTypes } from '../constants'
import protoData from '../data/protoy.json'

export function getProtoInfo(id) {
    return protoData.unit.find(unit => 
        String(unit._name).toLowerCase() === String(id).toLocaleLowerCase()
    )
}

export function getAllUnitsByTypes(types = []) {
    return protoData.unit.filter(unit => {
        const unitTypes = unit?.unittype || []
        const flags =  unit?.flag || []
        const blackListName = ['IGC', 'SPC', 'Boneguard', 'Drummer', 'FlagBearerDefault']

        if (!unitTypes) return false
        
        return unitTypes.includes('Military') 
            && !blackListUnitTypes.some(type => unitTypes.includes(type))
            && !blacklistFlags.some(flag => flags.includes(flag))
            && !blackListName.some(namePart => unit._name.includes(namePart))
            && types.every(type => unitTypes.includes(type))
    })
}