import abilitiesData from '../data/abilities.xml.json'

export function getUnitAbilities(unitName = '') {
    const key = unitName.toLocaleLowerCase()
    if (abilitiesData.abilities.hasOwnProperty(key)) {
        const abilities = abilitiesData.abilities[key]?.ability

        return Array.isArray(abilities) ? abilities : [abilities]
    }

    return []
}