import React from 'react'
import Drawer from '@mui/material/Drawer';
import { Container, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UnitDetail from './UnitDetail';


export const DrawerUnit = React.memo(function DrawerUnit({ unit, open, onClose }) {
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
                    backgroundImage: 'linear-gradient(45deg, #170803, #532412 50%, #170803)',
                }
            }}>
            <IconButton size="large" sx={{ position: 'absolute', top: 0, right: 0 }} onClick={handleClose}>
                <CloseIcon fontSize="inherit" />
            </IconButton>

            <Container maxWidth='sm' sx={{ py: 3 }}>
                <UnitDetail unit={unit} />
            </Container>
        </Drawer>
    )
})
