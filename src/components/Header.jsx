import React, { useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
import { styled } from '@mui/material/styles';
import AppBarMui from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import GithubIcon from '@mui/icons-material/GitHub'
import { useTheme } from '@mui/material/styles'
import { Container } from '@mui/material';
import { MobileMenu } from "./MobileMenu";
import { LangMenu } from "./LangSwitcher";
import { translate } from '../utils/translator';
import { DEFAULT_LANG } from '../utils/languageSettings'
// import { DonateButton } from "./DonateButton";

export const Header = React.memo(() => {
    const theme = useTheme()

    const [lang, setLang] = useState(() => {
        const lang = localStorage.getItem('lang')
        if (lang === null) return DEFAULT_LANG.code
        return lang
    })

    const handleSelectCiv = (event) => {
        onSelectCiv(event)
    }

    const handleChangeLang = (event) => {
        setLang(event)
        localStorage.setItem('lang', event)
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
                        <Link variant='subtitle1' underline='none' component={RouterLink} to='/' px={1}>{translate('49151')}</Link>
                        <Link variant='subtitle1' underline='none' component={RouterLink} to='/units' px={1}>{translate('70749')}</Link>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', [theme.breakpoints.down('md')]: { display: 'none' } }}>
                        <LangMenu lang={lang} onChangeLang={handleChangeLang} />

                        <IconButton size="large" onClick={goToGithub} color="inherit">
                            <GithubIcon />
                        </IconButton>

                        {/* <DonateButton /> */}
                    </Box>

                    <MobileMenu edge="end" lang={lang} onChangeLang={handleChangeLang} />
                </Toolbar>
            </Container>
        </AppBar>
    )
})
