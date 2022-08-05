import techData from "../data/techtreey.json";

export function getTechInfo(value, prop = '_name') {
    return techData.tech.find(item =>
        item?.[prop]?.toLowerCase() === value?.toLowerCase()
    )
}

export function getCardsFromTechEffects(name, {
    revolt = false,
    politicianCard = false
}) {
    let tech = null

    if (revolt)
        tech = techData.tech.find(tech => tech.revolutionciv === name)
    else
        tech = techData.tech.find(tech => tech._name === name)

    if (tech) {
        const cards = tech?.effects?.effect.filter(effect => effect?._type === 'AddHomeCityCard')
            .map(({ _tech, _maxcount, _unitcount, ...card }) => ({
                ...card,
                name: _tech,
                maxcount: _maxcount,
                displayunitcount: _unitcount,
                age: -1,
            }))

        if (politicianCard) {
            return {
                ...tech,
                cards,
                isGroup: true,
                isSelected: false
            }
        }

        return cards
    }

    return []
}

export function getCardsFromPoliticians(age0) {
    if (!['Americans', 'Mexicans'].some(el => age0.includes(el))) return []

    const age0Tech = techData.tech.find(tech => tech._name === age0)
    if (age0Tech) {
        const politicians = age0Tech?.effects?.effect.filter(effect => effect?.__text?.includes('Politician'))
        return politicians.map(politician => getCardsFromTechEffects(politician.__text, { politicianCard: true }))
    }

    return []
}