import { getTechInfo } from "../utils/getTechInfo";
import { blacklistCards, injectedCards } from "../constants";

function injectCards(cards, homecity, age, civ) {
    const count = cards.length
    const { order, homecities, ...card } = injectedCards.find(card => 
        (card.order - 1) === count && 
        card.homecity === homecity &&
        card.age === age
    ) || {}
    if (card) {
        return appendCard(cards, card, civ, 'dbid')
    }
    return cards
}

function appendCard(cards, card, civ, prop = undefined) {
    const val = prop ? card[prop] : card.name
    const info = getTechInfo(val, prop)
    const ageCount = cards.length
    const ageKey = `age${+card?.age + 1}`
    
    if (info && !card?.hasOwnProperty('revoltcard')) { 
        return [...cards,  {
            ...card,
            id: `${civ}-${ageKey}-${ageCount + 1}`.toLocaleLowerCase(),
            ageKey,
            info,
            isSelected: false,
        }]
    }

    return cards
}

function isExcludedCard(card, homecity) {
    const item = blacklistCards.find(blCard => {
        const isSameCard = blCard.id === card.name
        if (blCard.civs)
            return isSameCard && blCard.civs.includes(homecity)
        return isSameCard
    }) 
    return !!item
}

export async function getHomeCityData(homecity) {
    const homecityName = homecity.replace('.xml', '')
    const data = await import(`../data/homecities/${homecityName}.json`)
    const cards = data?.cards?.card?.reduce((cards, card) => {
        if (isExcludedCard(card, homecityName)) { return cards}

        const ageKey = `age${+card?.age + 1}`
        const civ = data?.civ

        cards[ageKey] = injectCards(cards[ageKey], homecityName, +card?.age, civ)
        cards[ageKey] = appendCard(cards[ageKey], card, civ)

        return cards
    }, { age1: [], age2: [], age3: [], age4: [] })
    

    return { 
        civ: data?.civ, 
        maxcardsperdeck: data?.maxcardsperdeck || 25 , 
        cards
    }
}