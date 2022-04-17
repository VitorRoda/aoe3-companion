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
    return (<Box>{
        protoaction
            .filter(item => item?.name?.includes('Attack'))
            .sort((a, b) => {
                const [damageTypeA] = a?.damagetype
                const [damageTypeB] = b?.damagetype

                if (mapValueDamageType[damageTypeA] > mapValueDamageType[damageTypeB]) return 1
                if (mapValueDamageType[damageTypeA] < mapValueDamageType[damageTypeB]) return -1

                return getValueByDamageMode(a?.name) - getValueByDamageMode(b?.name)
            })
            .map((row) => {
                const [damageType] = row?.damagetype || []
                const [rof] = row?.rof
                const [damagearea] = row?.damagearea || []
                return (
                    <Box key={row?.name}>
                        <UnitActionTransl tacticskey={tactics} name={row?.name}></UnitActionTransl>

                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'end',
                            '&>:not(:last-child)': {
                                mr: 1,
                            }
                        }}>
                            {row?.damage &&
                                <StatIcon
                                    type={damageType}
                                    value={row?.damage}
                                    icon={`stat_icon_${damageType === 'Hand' ? 'attack' : damageType.toLowerCase()}`}
                                    title={translate(mapTranslDamageType[damageType])} />
                            }
                            {rof && <StatIcon
                                type={'rof'}
                                value={rof}
                                icon={'stat_large_rof'}
                                title={replace_n(translate('91816'), exactMath.round(rof, -2))} />
                            }
                            {row?.maxrange && <StatIcon type="range" icon={'stat_icon_range'} value={row?.maxrange} />}
                            {damagearea && <StatIcon type="area" icon={'stat_icon_area'} value={damagearea} />}
                            {row?.damagebonus && row.damagebonus.map(bonus =>
                                <StatBonus bonus={bonus} key={`bonus-${bonus?._type}`} />
                            )}
                        </Box>
                    </Box>
                )
            }).reduce((prev, curr) => [
                prev,
                <Divider sx={{ my: 1 }} key={`divider-${prev.key}`} />,
                curr
            ])
    }</Box>)
}

AdvancedStats.defaultProps = {
    protoaction: [],
    tactics: ''
}
