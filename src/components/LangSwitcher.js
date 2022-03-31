import React from 'react'
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Avatar from '@mui/material/Avatar';

export const LangSwitcher = ({ langEsp, onChangeLang }) => {
    const baseIcoPath = '/resources/images/icons/flags/Flag_'
    const icoSizeSx = { width: 24, height: 24 }
    const handleSwitchEsp = (event) => {
        onChangeLang(event)
    }

    return (
        <Stack direction="row" alignItems="center" mr={1}>
            <Avatar
                sx={icoSizeSx}
                alt="English"
                src={`${baseIcoPath}British.png`} />
            <Switch color='warning' checked={langEsp} onChange={handleSwitchEsp}></Switch>
            <Avatar
                sx={icoSizeSx}
                alt="Español"
                src={`${baseIcoPath}Spanish.png`} />
        </Stack>
    )
}
