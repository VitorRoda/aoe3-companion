import React from 'react'
import { translate } from "../../utils/translator";
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { MainStats } from "./MainStats";
import { AdvancedStats } from "./AdvancedStats";
import { CostsUnit } from "./CostsUnit";

export const DrawerUnit = ({ unit, open, onClose }) => {
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
            <Container maxWidth="md" sx={{ py: 3 }}>
                <Typography variant='h6' mb={1}>{translate(unit?.displaynameid)}</Typography>

                <Box display="flex">
                    <Box pr={2} flexBasis={170} position="relative">
                        <Avatar
                            src={unit?.portraiticon}
                            alt={translate(unit?.displaynameid)}
                            sx={{ width: 170, height: 170, boxShadow: '0 0 8px #333333', mb: 1 }}
                            variant="rounded"
                        />
                        <CostsUnit costs={unit?.cost} sx={{ position: 'absolute', left: 0, top: 0 }} />
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
                        <AdvancedStats tactics={unit?.tactics} protoaction={unit?.protoaction} />
                    </Box>
                </Box>
            </Container>
        </Drawer>
    )
}
