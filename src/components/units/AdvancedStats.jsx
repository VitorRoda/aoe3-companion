import React from 'react'
import exactMath from "exact-math";
import { replace_n } from "../../utils/replaceN";
import { UnitActionTransl } from './UnitActionTransl';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import { StatIcon } from './StatIcon';
import { StatBonus } from './StatBonus';
import { translate } from '../../utils/translator';


const mapValueDamageType = {
    'Ranged': 1,
    'Hand': 2,
    'Siege': 3
}

const mapTranslDamageType = {
    'Ranged': '68850',
    'Hand': '68851',
    'Siege': '44114'
}

const mapValueDamageMode = {
    'Volley': 1,
    'Stagger': 2,
    'Melee': 3,
    'Cover': 4,
    'Defend': 5
}

const getValueByDamageMode = (value) => {
    const mode = Object.keys(mapValueDamageMode).find((mode) => value.includes(mode))
    if (mode) return mapValueDamageMode[mode]
    return 99
}

export const AdvancedStats = ({ tactics, protoaction }) => {
    const actions = !Array.isArray(protoaction) ? [protoaction] : protoaction
    return (<Box>{
        actions
            .filter(item => item?.name?.includes('Attack'))
            .sort((a, b) => {
                const damageTypeA = a?.damagetype
                const damageTypeB = b?.damagetype

                if (mapValueDamageType[damageTypeA] > mapValueDamageType[damageTypeB]) return 1
                if (mapValueDamageType[damageTypeA] < mapValueDamageType[damageTypeB]) return -1

                return getValueByDamageMode(a?.name) - getValueByDamageMode(b?.name)
            })
            .map((action) => {
                const damageType = Array.isArray(action.damagetype) ? action?.damagetype[0] : action.damagetype
                let rof = Array.isArray(action?.rof) ? action?.rof[0] : action?.rof
                const damagearea = action?.damagearea
                const damagebonus = !Array.isArray(action.damagebonus) ? [action.damagebonus] : action.damagebonus

                if (rof?.['#text']) { rof = rof?.['#text'] }

                return (
                    <Box key={action?.name}>
                        <UnitActionTransl tacticskey={tactics} name={action?.name}></UnitActionTransl>

                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'end',
                            '&>:not(:last-child)': {
                                mr: 1,
                            }
                        }}>
                            {action?.damage &&
                                <StatIcon
                                    type={damageType}
                                    value={action?.damage}
                                    icon={`stat_icon_${damageType === 'Hand' ? 'attack' : damageType.toLowerCase()}`}
                                    title={translate(mapTranslDamageType[damageType])} />
                            }
                            {rof && <StatIcon
                                type={'rof'}
                                value={rof}
                                icon={'stat_large_rof'}
                                title={replace_n(translate('91816'), exactMath.round(rof, -2))} />
                            }
                            {action?.maxrange && <StatIcon type="range" icon={'stat_icon_range'} value={action?.maxrange} />}
                            {damagearea && <StatIcon type="area" icon={'stat_icon_area'} value={damagearea} />}
                            {action?.damagebonus && damagebonus.map((bonus, idx) =>
                                <StatBonus bonus={bonus} key={`bonus-${bonus?.['@type']}-${idx}`} />
                            )}
                        </Box>
                    </Box>
                )
            }).reduce((prev, curr) => [
                prev,
                <Divider sx={{ my: 1 }} key={`divider-${prev.key}`} />,
                curr
            ], [])
    }</Box>)
}

AdvancedStats.defaultProps = {
    protoaction: [],
    tactics: ''
}
