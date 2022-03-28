import React, { useCallback, useState } from 'react'
import { styled } from '@mui/material/styles';
import AppBarMui from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { CivSelector } from "./CivSelector";
import { translate } from "../utils/translator";

export const Header = React.memo(({ onSelectCiv }) => {
    const [langEsp, setLangEsp] = useState(() => {
        const langEsp = JSON.parse(localStorage.getItem('langEsp'))
        if (langEsp === null) return true
        return langEsp
    })

    const handleSelectCiv = useCallback((event) => {
        onSelectCiv(event)
    }, [])

    const handleSwitchEsp = (event) => {
        const value = event.target.checked
        setLangEsp(event.target.checked);
        localStorage.setItem('langEsp', JSON.stringify(value));
        window.location.reload()
    }

    const AppBar = styled(AppBarMui)({
        backgroundImage: 'linear-gradient(90deg,#181c29,#394766 40%,#181c29)',
        borderBottom: '1px solid #EBC837',
    })

    return (
        <AppBar position="sticky" >
            <Toolbar>
                <Box sx={{ mr: 2 }} edge="start">
                    <img className='aoe3de-logo' src='/resources/aoe3_de_logo.png' alt="logo aoe3de"></img>
                </Box>

                <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
                    {translate('70846')}
                </Typography>

                <Box sx={{ mr: 2, py: 1 }}>
                    <CivSelector onSelectCiv={handleSelectCiv} />
                </Box>

                <FormControlLabel
                    edge="end"
                    label={langEsp ? 'en' : 'es'}
                    control={
                        <Switch color='warning' checked={langEsp} onChange={handleSwitchEsp} />
                    }
                />
            </Toolbar>
        </AppBar>
    )
})