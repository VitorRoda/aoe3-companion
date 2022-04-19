import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { langToText, DISPLAY_TEXT_LIST } from "../utils/languageSettings";
import { Box } from '@mui/material';

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
        <Box>
            <Button
                id="lang-menu-button"
                aria-controls={open ? 'lang-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                startIcon={<LanguageIcon />}
                onClick={handleClick}
            >
                {langToText(lang)}
            </Button>
            <Menu
                id="lang-menu"
                aria-labelledby="lang-menu-button"
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
                {DISPLAY_TEXT_LIST.map(({ code, text }) => (
                    <MenuItem key={code} onClick={handleSelectLang(code)}>{`${text}`}</MenuItem>
                ))}
            </Menu>
        </Box>
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
                    {DISPLAY_TEXT_LIST.map(({ code, text }) => (
                        <ListItem button key={code} onClick={handleSelectLang(code)}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </SwipeableDrawer>
        </div>
    )
}
