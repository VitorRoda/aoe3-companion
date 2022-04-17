import React from 'react'
import exactMath from "exact-math";
import Stack from '@mui/material/Stack';
import { translate } from "../../utils/translator";

const mapArmorIcon = {
    'Ranged': 'ranged',
    'Hand': 'melee',
    'Siege': 'siege'
}

const mapArmorTextId = {
    'Ranged': '35760',
    'Hand': '35759',
    'Siege': '35761'
}

const statIcon = (iconName) => `/resources/images/hud/stat_${iconName}.png`

export const MainStats = ({ initialhitpoints, maxvelocity, populationcount, armor }) => {
    const iconSize = 20

    return (
        <Stack direction={'row'} alignItems='center' spacing={0.5} flexWrap="wrap">
            <Stack direction={'row'} alignItems='center'>
                {exactMath.round(initialhitpoints, 0)}
                <img width={iconSize} height={iconSize} src={statIcon`large_hp`} title={translate('68852')} alt="hitpoints" />
            </Stack>

            <Stack direction={'row'} alignItems='center'>
                {exactMath.round(maxvelocity, -2)}
                <img width={iconSize} height={iconSize} src={statIcon`large_speed`} title={translate('36149')} alt="speed" />
            </Stack>

            {armor?.length && armor.map(({ _type, _value }, idx) =>
                <Stack direction={'row'} alignItems='center' key={`armor-${_type}-${idx}`}>
                    {`${exactMath.round(_value * 100, 0)}%`}
                    <img
                        width={iconSize} height={iconSize}
                        src={statIcon(`large_armor_${mapArmorIcon[_type]}`)}
                        title={`${translate('35758')} ${translate(mapArmorTextId[_type])}`}
                        alt={`armor-${_type}`} />
                </Stack>
            )}

            {populationcount &&
                <Stack direction={'row'} alignItems='center'>
                    {populationcount}
                    <img
                        width={iconSize} height={iconSize}
                        src={statIcon`icon_building`}
                        title={translate('17135').replace(':\\n', '')}
                        alt="population" />
                </Stack>
            }
        </Stack>
    )
}
