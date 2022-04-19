import React, { useState } from 'react'
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';

const formControlLabelStyles = { 
    m: 0,
    mt: '-17px', 
    '.MuiFormControlLabel-label': { 
        position: 'relative', top: 6, fontSize: 11 
    } 
}

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

            <FormControlLabel
                control={<Switch checked={langEsp} onChange={handleSwitchEsp} />}
                label={'LANG'}
                labelPlacement="top"
                sx={formControlLabelStyles}
            />

            <Avatar
                sx={icoSizeSx}
                alt="Español"
                src={`${baseIcoPath}Spanish.png`} />
        </Stack>
    )
}

export const LangMenu = ({ lang, onChangeLang }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleSelectLang = (event) => {
        setAnchorEl(null)
        onChangeLang(event)
    }

    return (
        <div>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                startIcon={<LanguageIcon />}
                onClick={handleClick}
            >
                {`${lang}`}
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={() => handleSelectLang('es')}>ESP</MenuItem>
                <MenuItem onClick={() => handleSelectLang('en')}>ENG</MenuItem>
                <MenuItem onClick={() => handleSelectLang('zh')}>ZH</MenuItem>
            </Menu>
        </div>
    )
}
