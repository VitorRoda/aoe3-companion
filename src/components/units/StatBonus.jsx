import React, { useEffect, useState } from 'react'
import { getBonusByType } from "../../services/damagebonuses.service";
import { translate } from '../../utils/translator';
import { StatIcon } from './StatIcon';

export const StatBonus = ({ bonus }) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        getBonusByType(bonus?.['@type']).then(data => {
            setData(data)
        })
    }, [bonus])

    return (
        <StatIcon
            src={data?.icon}
            type={bonus?.['@type']}
            value={bonus?.['#text']}
            bonus={true}
            title={translate(data?.displaynameid)}
        />
    )
}
