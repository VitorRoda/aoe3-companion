import { getCardsFromTechEffects, getTechInfo } from "./techtree.service";
import { blacklistCards } from "../constants";

function getCardData(card, { idx, civ, includeRevolt = false }) {
    const info = getTechInfo(card.name)
    const ageKey = `age${+card?.age + 1}`
    const revoltValidation = includeRevolt ? true : !card?.hasOwnProperty('revoltcard')

    if (info && revoltValidation) {
        return {
            ...card,
            id: `${civ}-${ageKey}-${idx}`.toLocaleLowerCase(),
            ageKey,
            info,
            isSelected: false,
        }
    }

    return null
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
        if (isExcludedCard(card, homecityName)) {
            return cards
        }

        const ageKey = `age${+card?.age + 1}`
        const count = cards[ageKey].length
        const cardData = getCardData(card, { idx: count, civ: data?.civ })
        cardData && cards[ageKey].push(cardData)

        return cards
    }, { age1: [], age2: [], age3: [], age4: [] })

    const revoltDecks = data?.decks?.revoltdeck

    return {
        civ: data?.civ,
        maxcardsperdeck: data?.maxcardsperdeck || 25,
        cards,
        revolts: Array.isArray(revoltDecks) ? revoltDecks.filter(r => r?._civ) : []
    }
}

export async function getRevoltCards(homecity, revName, revoltCards) {
    const homecityName = homecity.replace('.xml', '')
    const { cards, civ } = await import(`../data/homecities/${homecityName}.json`)
    const effectCards = getCardsFromTechEffects(revName).map((eC, idx) => getCardData(eC, { idx, civ, includeRevolt: true }))

    return revoltCards.reduce((revCards, cardName) => {
        const card = cards.card.find(c => c.name === cardName)

        if (card) {
            const ageKey = `age${+card?.age + 1}`
            const count = revCards[`${ageKey}Count`]
            const cardData = getCardData(card, {idx: count, civ, includeRevolt: true })
            cardData && revCards[ageKey].push(cardData)
            ++revCards[`${ageKey}Count`]
            ++revCards.total
        }

        return revCards
    }, {
        total: effectCards.length,
        age0: effectCards,
        age0Count: effectCards.length,
        age1: [],
        age1Count: 0,
        age2: [],
        age2Count: 0,
        age3: [],
        age3Count: 0,
        age4: [],
        age4Count: 0,
    })
}