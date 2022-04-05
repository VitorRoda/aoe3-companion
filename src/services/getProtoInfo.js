import protoData from '../data/protoy.json'

export function getProtoInfo(id) {
    return protoData.unit.find(unit => 
        String(unit._name).toLowerCase() === String(id).toLocaleLowerCase()
    )
}