export const cardsInitialState = {
    age1: [],
    age2: [],
    age3: [],
    age4: []
}


export const cardsReducer = (draft, action) => {
    switch (action.type) {
        case 'toggleSelected':
            const { id, ageKey } = action
            const idx = draft[ageKey].findIndex(item => item.id === id)
            draft[ageKey][idx].isSelected = !draft[ageKey][idx].isSelected
            return
        case 'update':
            return action.data
        case 'reset':
            return cardsInitialState
        default:
            return draft
    }
}