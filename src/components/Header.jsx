import React, { useCallback, useState } from 'react'
import { Link as RouterLink, Route } from "react-router-dom";
import { styled } from '@mui/material/styles';
import AppBarMui from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import GithubIcon from '@mui/icons-material/GitHub'
import { useTheme } from '@mui/material/styles'
import { Container } from '@mui/material';
import { CivSelector } from "./CivSelector";
import { MobileMenu } from "./MobileMenu";
import { LangSwitcher } from "./LangSwitcher";
import { translate } from '../utils/translator';
// import { DonateButton } from "./DonateButton";

export const Header = React.memo(({ selectedCiv, civs, onSelectCiv }) => {
    const theme = useTheme()
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
        borderWidth: '2px 0',
        borderImageSlice: 1,
        borderImageSource: 'linear-gradient(90deg,#b8862d00,#b8862d,#ffdf91,#b8862d,#b8862d00)',
        borderStyle: 'solid'
    })

    const goToGithub = () => {
        const url = 'https://github.com/eBaeza/aoe3de-deck-builder'
        window.open(url, '_blank').focus();
    }

    return (
        <AppBar position="sticky">
            <Container>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1 }}>
                        <Link component={RouterLink} to='/'>
                            <img className='aoe3de-logo' src='/assets/aoe3_de_logo.png' alt="logo aoe3de"></img>
                        </Link>

                    </Box>

                    <Box variation="row" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Link variant='subtitle1' component={RouterLink} to='/' px={1}>{translate('49151')}</Link>
                        <Link variant='subtitle1' component={RouterLink} to='/units' px={1}>{translate('70749')}</Link>
                    </Box>

                    <Box sx={{ py: 1, flexGrow: 1 }}>
                        <CivSelector selectedCiv={selectedCiv} civs={civs} onSelectCiv={handleSelectCiv} />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', [theme.breakpoints.down('md')]: { display: 'none' } }}>
                        <LangSwitcher langEsp={langEsp} onChangeLang={handleSwitchEsp} />

                        <IconButton size="large" onClick={goToGithub} color="inherit">
                            <GithubIcon />
                        </IconButton>

                        {/* <DonateButton /> */}
                    </Box>

                    <MobileMenu edge="end" langEsp={langEsp} onChangeLang={handleSwitchEsp}></MobileMenu>
                </Toolbar>
            </Container>
        </AppBar>
    )
})