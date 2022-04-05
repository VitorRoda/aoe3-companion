import { getTechInfo } from "../utils/getTechInfo";
import { getProtoInfo } from "./getProtoInfo"
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
            ...data?.effects?.effect?.filter(item => item?.target?._type === 'ProtoUnit'),
            ...getShadowUnits(data?.effects?.effect)
        ].map((unit, idx) => ({
            ...unit,
            id: `${civ.name}-unit-${unit?.target?.__text}-${idx}`,
            ...(!unit.info && { info: getProtoInfo(unit?.target?.__text)})
        })).filter(({ info, ...data }) => {
            const unitTypes = info?.unittype
            if (data?._subtype !== 'Enable') return false
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
        .filter(mainEffect => mainEffect?._type === 'TechStatus' && mainEffect?._status === 'active')
        .flatMap(mainEffect => getTechInfo(mainEffect?.__text)?.effects?.effect || [])
        .filter(subEffect => subEffect?.target?._type === 'ProtoUnit')
        .flatMap(subEffect => ({
            ...subEffect,
            info: getProtoInfo(subEffect?.target?.__text)
        }))
        .filter(({ info }) => info?.unittype?.includes('Military'))

    return shadowUnits
}