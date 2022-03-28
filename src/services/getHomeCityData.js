import { getTechInfo } from "../utils/getTechInfo";

export async function getHomeCityData(homecity) {
    const data = await import(`../data/homecities/${homecity}.json`)
    const cards = data?.cards?.card?.reduce((cards, card, idx) => {
        const info = getTechInfo(card.name)
        if (info && !card?.hasOwnProperty('revoltcard')) {
            const ageKey = `age${+card?.age + 1}`
            const civ = data?.civ
            cards[ageKey] = [...cards[ageKey], {
                ...card,
                id: `${civ}-${ageKey}-${idx}`.toLocaleLowerCase(),
                ageKey,
                info,
                isSelected: false
            }]
        }

        return cards
    }, { age1: [], age2: [], age3: [], age4: [] })
    

    return { 
        civ: data?.civ, 
        maxcardsperdeck: data?.maxcardsperdeck || 25 , 
        cards
    }
}