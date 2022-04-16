import React from 'react'
import { Stack } from '@mui/material'
import exactMath from "exact-math";

export const RofStat = ({ rof }) => {
    return (
        <Stack direction="row" spacing={0.25}>
            <span>{exactMath.round(rof, -2)}</span>
            <img width={18} src={`/resources/images/hud/stat_large_rof.png`} alt="rof" title='rof' />
        </Stack>
    )
}
