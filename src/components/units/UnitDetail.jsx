import React, { useState, useEffect } from 'react'
import { translate } from "../../utils/translator";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { MainStats } from "./MainStats";
import { AdvancedStats } from "./AdvancedStats";
import { CostsUnit } from "./CostsUnit";
import { blackListUnitTypesPanelUnit } from '../../constants';
import { useTheme } from '@mui/system';
import { fixPath } from '../../utils/fixPath';
import AbilitiesUnit from './AbilitiesUnit';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../config/firebaseConfig';

const unitMainInfoStyles = (theme) => ({
    pr: 2,
    mb: 2,
    flexBasis: '170px',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
        flexBasis: 'auto',
    }
})

const unitInfoContainerStyles = (theme) => ({
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
    }
})

const UnitDetail = ({ unit }) => {
    const theme = useTheme()
    const [urlFS, setUrlFS] = useState('')

    useEffect(() => {
        const refImg = ref(storage, fixPath(unit?.portraiticon, true))

        getDownloadURL(refImg).then((url) => {
            setUrlFS(url)
        })
    }, [unit])

    return (
        <Box>
            <Typography variant='h6' mb={1}>{translate(unit?.displaynameid)}</Typography>

            <Typography component={'p'} variant="body" mb={2}>
                {translate(unit?.rollovertextid)}
            </Typography>

            <Box sx={(unitInfoContainerStyles(theme))}>
                <Box sx={unitMainInfoStyles(theme)}>
                    <Box sx={{ position: 'relative', width: 170, ml: 'auto', mr: 'auto' }}>
                        <Avatar
                            src={urlFS}
                            alt={translate(unit?.displaynameid)}
                            sx={{ width: 170, height: 170, boxShadow: '0 0 8px #333333', mb: 1 }}
                            variant="rounded"
                        />
                        <CostsUnit costs={unit?.cost} sx={{ position: 'absolute', left: -8, top: 0 }} />
                    </Box>
                    <MainStats
                        initialhitpoints={unit?.initialhitpoints}
                        maxvelocity={unit?.maxvelocity}
                        populationcount={unit?.populationcount}
                        armor={unit?.armor}
                        buildbounty={unit?.buildbounty}
                        bounty={unit?.bounty?.[0]}
                        trainpoints={unit?.trainpoints}
                        los={unit?.los}
                    />
                    <AbilitiesUnit unitName={unit?.['@name']} />
                </Box>
                <Box>
                    <Typography variant='subtitle2' color={'primary'}>{translate('69635')}</Typography>
                    <Typography variant='body2'>
                        {
                            unit?.unittype
                                .filter(type => !blackListUnitTypesPanelUnit.includes(type)).map(type => ({
                                    type,
                                    text: translate(type.replace(/Abstract|LogicalType/, ''), true)
                                }))
                                .filter(({ text }) => text)
                                .map(({ text }) => text).join(', ')
                        }
                    </Typography>
                    <AdvancedStats tactics={unit?.tactics} protoaction={unit?.protoaction} />
                </Box>
            </Box>
        </Box>
    )
}

export default UnitDetail