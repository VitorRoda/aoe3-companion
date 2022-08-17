import techData from "../data/techtreey.xml.json";

export function getTechInfo(value, prop = '@name') {
    const data = techData.techtree.tech.find(item =>
        item?.[prop]?.toLowerCase() === value?.toLowerCase()
    )
    const costs = data?.cost

    return {
        ...data,
        ...(costs && !Array.isArray(costs) && { cost: [costs] })
    }
}

export function getCardsFromTechEffects(name, {
    revolt = false,
    politicianCard = false
}) {
    let tech = null

    if (revolt)
        tech = techData.techtree.tech.find(tech => tech.revolutionciv === name)
    else
        tech = techData.techtree.tech.find(tech => tech?.['@name'] === name)

    if (tech) {
        const cards = tech?.effects?.effect.filter(effect => effect?.['@type'] === 'AddHomeCityCard')
            .map(({ '@tech': tech, '@maxcount': maxcount, '@unitcount': unitcount, ...card }) => ({
                ...card,
                name: tech,
                maxcount: maxcount,
                displayunitcount: unitcount,
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

    const age0Tech = techData.techtree.tech.find(tech => tech?.['@name'] === age0)
    if (age0Tech) {
        const politicians = age0Tech?.effects?.effect.filter(effect => effect?.['#text']?.includes('Politician'))
        return politicians.map(politician => getCardsFromTechEffects(politician?.['#text'], { politicianCard: true }))
    }

    return []
}