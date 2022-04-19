import React, { useState } from 'react'
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { langToText, DISPLAY_TEXT_LIST } from "../utils/languageSettings";

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

    const handleSelectLang = (event) => () => {
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
                {langToText(lang)}
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
                {DISPLAY_TEXT_LIST.map(({id, text}) => (
                    <MenuItem key={id} onClick={handleSelectLang(id)}>{`${text}`}</MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export const MobileLangDrawer = ({ enable, onChangeLang, onToggle }) => {
    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
    
        onToggle(open)
    }

    const handleSelectLang = (event) => () => {
        onChangeLang(event)
    }

    return (
        <div>
            <SwipeableDrawer
                anchor='bottom'
                open={enable}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <List>
                    {DISPLAY_TEXT_LIST.map(({id, text}) => (
                        <ListItem button key={id} onClick={handleSelectLang(id)}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </SwipeableDrawer>
        </div>
    )
}
