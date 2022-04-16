import { translate } from "../utils/translator";

export async function getActionTranslByName(tactickey, name) {
    const data = await import(`../data/tactics/${tactickey.toLowerCase()}.json`)
    const action = data?.tactics?.action?.find(action => action?.name?.['#text'] === name)
    
    if (action) {
        return translate(action?.name?.['@stringid']) || name
    }
    
    return name
}