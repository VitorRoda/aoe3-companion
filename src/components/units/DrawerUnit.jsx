import React from 'react'
import { translate } from "../../utils/translator";
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Container, IconButton } from '@mui/material';
import { MainStats } from "./MainStats";
import { AdvancedStats } from "./AdvancedStats";
import { CostsUnit } from "./CostsUnit";
import { blackListUnitTypesPanelUnit } from '../../constants';
import { useTheme } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

export const DrawerUnit = ({ unit, open, onClose }) => {
    const theme = useTheme()

    const handleClose = () => {
        onClose()
    };

    return (
        <Drawer
            anchor='right'
            open={open}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    backgroundImage: 'linear-gradient(45deg, #181c29, #394766 50%, #181c29)',
                }
            }}>
            <IconButton size="large" sx={{ position: 'absolute', top: 0, right: 0 }} onClick={handleClose}>
                <CloseIcon fontSize="inherit" />
            </IconButton>

            <Container maxWidth='sm' sx={{ py: 3 }}>
                <Typography variant='h6' mb={1}>{translate(unit?.displaynameid)}</Typography>

                <Box sx={{ [theme.breakpoints.up('sm')]: { display: 'flex' } }}>
                    <Box pr={2} mb={2} width={170} flexBasis={170} position="relative">
                        <Avatar
                            src={`/${unit?.portraiticon?.toLowerCase()}`}
                            alt={translate(unit?.displaynameid)}
                            sx={{ width: 170, height: 170, boxShadow: '0 0 8px #333333', mb: 1 }}
                            variant="rounded"
                        />
                        <CostsUnit costs={unit?.cost} sx={{ position: 'absolute', right: 20, top: 6 }} />
                        <MainStats
                            initialhitpoints={unit?.initialhitpoints}
                            maxvelocity={unit?.maxvelocity}
                            populationcount={unit?.populationcount}
                            armor={unit?.armor}
                            buildbounty={unit?.buildbounty}
                            bounty={unit?.bounty}
                            trainpoints={unit?.trainpoints}
                            los={unit?.los}
                        />
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
            </Container>
        </Drawer>
    )
}
