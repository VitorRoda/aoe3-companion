import React from 'react'
import { UnitActionTransl } from './UnitActionTransl';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import { StatIcon } from './StatIcon';
import { RofStat } from './RofStat';
import { StatBonus } from './StatBonus';


const mapValueDamageType = {
    'Ranged': 1,
    'Hand': 2,
    'Siege': 3
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
                            {row?.damage && <StatIcon type={damageType} value={row?.damage} />}
                            {rof && <RofStat rof={rof} />}
                            {row?.maxrange && <StatIcon type="range" value={row?.maxrange} />}
                            {damagearea && <StatIcon type="area" value={damagearea} />}
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
