import React, { useEffect, useState } from 'react'
import { getBonusByType } from "../../services/damagebonuses.service";
import { StatIcon } from './StatIcon';

export const StatBonus = ({ bonus }) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        getBonusByType(bonus?._type).then(data => {
            setData(data)
        })
    }, [bonus])

    return (
        <StatIcon
            src={data?.icon}
            type={bonus?._type}
            value={bonus?.__text}
            bonus={true}
        />
    )
}
