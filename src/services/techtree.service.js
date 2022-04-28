import techData from "../data/techtreey.json";

export function getTechInfo(value, prop = '_name') {
    return techData.tech.find(item =>
        item?.[prop]?.toLowerCase() === value?.toLowerCase()
    )
}

export function getCardsFromTechEffects(name) {
    const tech = techData.tech.find(tech => tech.revolutionciv === name)
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