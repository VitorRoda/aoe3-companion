import damageBonusesData from "../data/damagebonuses.json";

export async function getBonusByType(type) {
    const bonus = damageBonusesData.damagebonustypes.damagebonus.find(item => item.unittype === type)

    return bonus
}