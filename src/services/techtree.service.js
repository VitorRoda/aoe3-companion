import techData from "../data/techtreey.json";

export function getTechInfo(value, prop = '_name') {
    return techData.tech.find(item =>
        item?.[prop]?.toLowerCase() === value?.toLowerCase()
    )
}

export function getCardsFromTechEffects(name, revolt = false) {
    let tech = null
    
    if (revolt)
        tech = techData.tech.find(tech => tech.revolutionciv === name)
    else
        tech = techData.tech.find(tech => tech._name === name)

    if (tech) {
        return tech?.effects?.effect.filter(effect => effect?._type === 'AddHomeCityCard')
            .map(({ _tech, _maxcount, _unitcount, ...card }) => ({
                ...card,
                name: _tech,
                maxcount: _maxcount,
                displayunitcount: _unitcount,
                age: -1
            }))
    }

    return []
}

export function getCardsFromPoliticians(age0) {
    const age0Tech = techData.tech.find(tech => tech._name === age0)
    if (age0Tech) {
        const politicians = age0Tech?.effects?.effect.filter(effect => effect?.__text?.includes('Politician'))
        return politicians.flatMap(politician => getCardsFromTechEffects(politician.__text))
    }

    return []
}