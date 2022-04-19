import React from 'react'
import exactMath from "exact-math";
import Stack from '@mui/material/Stack';
import { translate } from "../../utils/translator";
import { StatIcon } from './StatIcon';

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

export const MainStats = ({
    initialhitpoints, maxvelocity, populationcount,
    armor, buildbounty, bounty, trainpoints, los
}) => {
    return (
        <Stack direction={'row'} alignItems='center' spacing={0.5} flexWrap="wrap">
            <StatIcon
                type={'hitpoints'}
                icon={'stat_large_hp'}
                value={initialhitpoints}
                title={translate('68852')}
                size={'md'}
            />

            <StatIcon
                type={'speed'}
                icon={'stat_large_speed'}
                value={maxvelocity}
                title={translate('36149')}
                size={'md'}
            />

            {armor?.length && armor.map(({ _type, _value }, idx) =>
                <StatIcon
                    key={`armor-${_type}-${idx}`}
                    type={`armor-${_type}`}
                    icon={`stat_large_armor_${mapArmorIcon[_type]}`}
                    value={_value}
                    title={`${translate('35758')} ${translate(mapArmorTextId[_type])}`}
                    size={'md'}
                />
            )}

            {los &&
                <StatIcon
                    type="los"
                    icon={'stat_icon_informers'}
                    value={los}
                    title={`${translate('24324')} ${exactMath.round(los, -2)}`}
                />
            }

            {populationcount &&
                <StatIcon
                    type="populationcount"
                    icon={'stat_icon_building'}
                    value={populationcount}
                    title={translate('17135').replace(':\\n', '')}
                    size={'md'}
                />
            }

            {buildbounty &&
                <StatIcon
                    type="buildbounty"
                    src="/assets/resource_xp.png"
                    value={buildbounty}
                    title={translate('34048').replace(': %d', '')}
                    size={'md'}
                />
            }

            {bounty &&
                <StatIcon
                    type="bounty"
                    icon={'stat_icon_hand_bonus'}
                    value={bounty}
                    title={translate('29782').replace(':', '')}
                    size={'md'}
                />
            }

            {trainpoints &&
                <StatIcon
                    type="trainpoints"
                    value={trainpoints}
                    title={translate('112775').replace('%1', exactMath.round(trainpoints, -2))}
                    isTime
                />
            }
        </Stack>
    )
}
