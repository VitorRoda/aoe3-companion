import powersData from '../data/powers.xml.json'

export function getUnitPower(powerName = '') {
    return powersData.powers.power.find(power => power['@name'] === powerName)
}