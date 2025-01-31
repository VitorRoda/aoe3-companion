export const cardsInitialState = {
    age0: [],
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
        case 'toggleSelectedPoliticanCards':
            const { idG } = action
            const idxG = draft['age0'].findIndex(item => item?.['@name'] === idG)
            draft['age0'][idxG].isSelected = !draft['age0'][idxG].isSelected
            return
        case 'update':
            return action.data
        case 'reset':
            return cardsInitialState
        case 'unSelectAll':
            const unSelectAll = (item) => { item.isSelected = false }
            draft.age0.forEach(unSelectAll)
            draft.age1.forEach(unSelectAll)
            draft.age2.forEach(unSelectAll)
            draft.age3.forEach(unSelectAll)
            draft.age4.forEach(unSelectAll)
            return 
        case 'batchSelected':
            const { selections } = action
            selections.forEach((age, ageIdx) => {
                age.forEach(item => {
                    const ageKey = `age${ageIdx+1}`
                    draft[ageKey][item.idx].isSelected = true
                })
            })
            return
        default:
            return draft
    }
}