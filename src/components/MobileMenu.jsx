import React, { useState } from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link as RouterLink } from "react-router-dom";
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles'
import GithubIcon from '@mui/icons-material/GitHub'
import { LangSwitcher } from "./LangSwitcher";
import { translate } from '../utils/translator';
import { Typography } from '@mui/material';
// import { DonateButton } from "./DonateButton";

export const MobileMenu = ({ langEsp, onChangeLang }) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const theme = useTheme()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleSwitchEsp = (event) => {
        onChangeLang(event)
    }

    const goToGithub = () => {
        const url = 'https://github.com/eBaeza/aoe3de-deck-builder'
        window.open(url, '_blank').focus();
    }

    return (
        <Box sx={{
            width: 48,
            display: 'none',
            [theme.breakpoints.down('md')]: { display: 'block' }
        }}>
            <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
            >
                <MenuItem onClick={handleCloseNavMenu}>
                    <LangSwitcher langEsp={langEsp} onChangeLang={handleSwitchEsp} />
                </MenuItem>
                <MenuItem>
                    <Link variant='subtitle2' component={RouterLink} underline="none" to='/'>
                        {translate('49151')}
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link variant='subtitle2' component={RouterLink} underline="none" to='/units'>
                        {translate('70749')}
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                    <Typography variant='subtitle2' color="primary">Github</Typography>
                    <IconButton size="large" onClick={goToGithub}>
                        <GithubIcon />
                    </IconButton>
                </MenuItem>
                {/* <MenuItem onClick={handleCloseNavMenu}>
                    <DonateButton />
                </MenuItem>                 */}
            </Menu>
        </Box>
    )
}
