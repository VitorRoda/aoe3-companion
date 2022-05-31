import powersData from '../data/powers.json'

export function getUnitPower(powerName = '') {
    return powersData.powers.power.find(power => power['@name'] === powerName)
}