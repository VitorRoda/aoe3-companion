export const selectedCardsInitialState = {
    total: 0,
    age0: [],
    age0Count: 0,
    age1: [],
    age1Count: 0,
    age2: [],
    age2Count: 0,
    age3: [],
    age3Count: 0,
    age4: [],
    age4Count: 0,
}

const sortCards = (a, b) => {
    const [, , valA] = a.id.split('-')
    const [, , valB] = b.id.split('-')

    return +valA - +valB
}

export const selectedCardsReducer = (draft, action) => {
    switch (action.type) {
        case 'addCard':
            const { card } = action
            card.ageKey !== 'age0' && draft.total++
            draft[card.ageKey].push(card)
            draft[`${card.ageKey}Count`]++
            draft[card.ageKey] = draft[card.ageKey].sort(sortCards)
            return
        case 'removeCard':
            const { id, ageKey } = action
            const idx = draft[ageKey].findIndex(item => item.id === id)
            ageKey !== 'age0' && draft.total--
            draft[`${ageKey}Count`]--
            draft[ageKey].splice(idx, 1)
            return
        case 'addBatch':
            const { cards } = action
            cards.forEach((age, idx) => {
                const ageKey = `age${idx + 1}`
                draft.total += age.length
                draft[ageKey] = age.map(item => item.card).sort(sortCards)
                draft[`${ageKey}Count`] += age.length
            });
            return
        case 'addPoliticianCards':
            const { group } = action
            draft[`age0Count`] += 2
            draft['age0'].push(group)
            return
        case 'removePoliticianCards':
            const { idG } = action
            const idxG = draft['age0'].findIndex(item => item?.['@name'] === idG)
            draft[`age0Count`] -= 2
            draft['age0'].splice(idxG, 1)
            return
        case 'reset':
            return selectedCardsInitialState
        default:
            return draft
    }
}