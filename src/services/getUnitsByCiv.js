import { getTechInfo } from "../utils/getTechInfo";
import { getProtoInfo } from "./proto.service"
import { blackListUnitTypes } from "../constants";

export function getUnitsByCiv(civ) {
    const [age0] = civ.agetech
    let keyUnits = age0.tech

    if (keyUnits.includes('YP')) {
        keyUnits += 'Units'
    }

    const data = getTechInfo(keyUnits)

    if (data) {
        return [
            ...data?.effects?.effect?.filter(item => item?.target?.['@type'] === 'ProtoUnit'),
            ...getShadowUnits(data?.effects?.effect)
        ].map((unit, idx) => ({
            ...unit,
            id: `${civ.name}-unit-${unit?.target?.['#text']}-${idx}`,
            ...(!unit.info && { info: getProtoInfo(unit?.target?.['#text'])})
        })).filter(({ info, ...data }) => {
            const unitTypes = info?.unittype
            if (data?.['@subtype'] !== 'Enable') return false
            if (!unitTypes) return false
            if (blackListUnitTypes.some(bUT => unitTypes.includes(bUT))) return false
            return unitTypes.includes('Military')
        }).sort(({ info: infoA }, { info: infoB }) => {
            const [ageA] = infoA.allowedage
            const [ageB] = infoB.allowedage

            if (getValueByUnitType(infoA) > getValueByUnitType(infoB)) return 1
            if (getValueByUnitType(infoA) < getValueByUnitType(infoB)) return -1
            return +ageA - +ageB
        })
    }

    return []
}

function getValueByUnitType(unitInfo) {
    const unitTypes = unitInfo?.unittype
    const hasType = (value) => unitTypes.some(type => type.toLocaleLowerCase().includes(value.toLocaleLowerCase()))

    if (unitInfo?.movementtype === 'water') return 10
    if (hasType('healer')) return 9
    if (hasType('merctype')) return 8
    if (hasType('outlaw')) return 7
    if (hasType('handsiege')) return 6
    if (hasType('artillery')) return 5
    if (hasType('rangedcavalry')) return 4
    if (hasType('heavycavalry')) return 3
    if (hasType('rangedinfantry')) return 2
    if (hasType('heavyinfantry')) return 1
    if (unitInfo?.movementtype === 'land') return 0
    return 0
}

export function getShadowUnits(mainEffects) {
    const shadowUnits = mainEffects
        .filter(mainEffect => mainEffect?.['@type'] === 'TechStatus' && mainEffect?.['@status'] === 'active')
        .flatMap(mainEffect => getTechInfo(mainEffect?.['#text'])?.effects?.effect || [])
        .filter(subEffect => subEffect?.target?.['@type'] === 'ProtoUnit')
        .flatMap(subEffect => ({
            ...subEffect,
            info: getProtoInfo(subEffect?.target?.['#text'])
        }))
        .filter(({ info }) => info?.unittype?.includes('Military'))

    return shadowUnits
}