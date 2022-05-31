import { ImageListItemBar, Tooltip, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';
import { tooltipClasses } from '@mui/material/Tooltip';

import React, { Fragment, useEffect, useState } from 'react'
import { getUnitPower } from '../../services/powers.service'
import { getStorageURL } from '../../utils/getStorageURL'
import { translate } from '../../utils/translator';

const TooltipPower = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
}));

const UnitPower = ({ powerName }) => {
    const [power, setPower] = useState(null)

    useEffect(() => {
        const power = getUnitPower(powerName)
        setPower(power)
    }, [powerName])

    return (
        <Fragment>
            <img width={'100%'} src={getStorageURL(power?.icon)} alt="" />
            <ImageListItemBar
                sx={{ background: 'transparent' }}
                actionIcon={
                    <TooltipPower
                        title={
                            <Fragment>
                                <Typography variant='subtitle2' color={'primary'}>{translate(power?.displaynameid)}</Typography>
                                <Typography variant='body2'>{translate(power?.rolloverid)}</Typography>
                            </Fragment>
                        }>
                        <InfoIcon color='primary' fontSize='small' />
                    </TooltipPower>

                }
            />
        </Fragment>
    )
}

export default UnitPower