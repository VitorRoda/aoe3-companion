import { translate } from "../utils/translator";
import protoData from "../data/protoy.xml.json";
import exactMath from "exact-math";
import { replace_n } from "../utils/replaceN";

const WHITE_LIST_EFFECTS = [
    'Hitpoints',
    'Damage',
    'DamageBonus',
    'FreeHomeCityUnit',
    'WorkRate',
    'WorkRateEspecific',
    'TrainPoints',
    'MaximumVelocity',
]

const NO_ABSTRACT = [
    'Infantry',
    'Cavalry',
    'AbstractWarship',
    'FishingBoat'
]

const TARGETS_MAP = {
    'AbstractCoyoteMan': 'AbstractNameCoyote',
    'LogicalTypeAffectedByVillagerUpgrades': 'AbstractVillager'
}

export function getEffectsTranslations(effects = []) {
    return effects.filter(effect => WHITE_LIST_EFFECTS.includes(effect?.['@subtype'])).map(effect => {
        const mainText = translate(buildSymbolId(effect), true) || ''
        const percentage = exactMath.formula(`((${+effect?.['@amount']}) - 1) * 100`)
        let targetText = ''
        let unitText = ''
        let resourceText = ''
        let params = []

        if (effect?.target) {
            let targetLabel = effect?.target?.['#text'] || ''

            if (targetLabel !== 'AbstractInfantry' && NO_ABSTRACT.some(word => targetLabel.includes(word))) {
                targetLabel = targetLabel.replace('Abstract', '')
            }

            if (TARGETS_MAP.hasOwnProperty(targetLabel)) {
                targetLabel = TARGETS_MAP[targetLabel]
            }

            targetText = translate(targetLabel, true) || getUnitTypeTranslation(targetLabel)
        }

        if (effect?.['@unittype']) {
            unitText = getUnitTypeTranslation(effect?.['@unittype'])
        }

        if (effect?.['@resource']) {
            resourceText = translate(`ResourceName${effect?.['@resource']}`, true)
        }

        if (effect?.['@subtype'] === 'Hitpoints') {
            params = [targetText, percentage]
        } else if (effect?.['@subtype'] === 'Damage') {
            const actionDamage = +effect?.['@allactions'] ? translate('AllActionsEffect', true) : ''
            params = [targetText, actionDamage, percentage]
        } else if (effect?.['@subtype'] === 'FreeHomeCityUnit') {
            params = [parseInt(effect?.['@amount']), unitText]
        } else if (effect?.['@subtype'] === 'TrainPoints') {
            params = [targetText, percentage]
        } else if (effect?.['@subtype'] === 'MaximumVelocity') {
            params = [targetText, percentage]
        } else {
            params = [targetText, effect?.['@action'], unitText, percentage, resourceText]
        }

        const finalText = replace_n(mainText, ...params)

        return finalText
    })
}

function buildSymbolId(effect) {
    let subType = effect?.['@subtype'] || ''
    let operationText = ''

    if (subType.includes('Specific')) {
        subType = subType.replace('Specific', 'EffectSpecific')
    } else {
        subType += 'Effect'
    }

    if (!subType.includes('FreeHomeCity')) {
        operationText = (+effect?.['@amount'] - 1) > 0 ? 'Increase' : 'Decrease'
    }
    if (effect?.['@subtype'] === 'MaximumVelocity') {
        operationText = (+effect?.['@amount'] - 1) > 0 ? 'Increase' : 'Decrease'
        subType = 'SpeedEffect'
    }

    return [operationText, subType].join('')
}

function getUnitTypeTranslation(unitType) {
    const unit = protoData.proto.unit.find(unit => unit?.['@name'] === unitType)
    if (unit) {
        return translate(unit?.displaynameid)
    }
    return ''
}