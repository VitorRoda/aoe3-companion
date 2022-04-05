import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import AppBarMui from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import { Container } from '@mui/material';

const MSGCR = 'https://www.xbox.com/en-US/developers/rules'

const AppBar = styled(AppBarMui)({
    backgroundImage: 'linear-gradient(90deg,#181c29,#394766 40%,#181c29)',
    borderWidth: '2px 0',
    borderImageSlice: 1,
    borderImageSource: 'linear-gradient(90deg,#b8862d00,#b8862d,#ffdf91,#b8862d,#b8862d00)',
    borderStyle: 'solid',
    top: 'auto',
    bottom: 0
})

export const Footer = () => {

    return (
        <AppBar position="fixed">
            <Container>
                <Toolbar disableGutters>
                    <div>
                        <i>Age of Empires III: Definitive Edition©</i> This site was created under Microsoft's "<Link className='link-ms-gc-rules' href={MSGCR} target='_blank' rel="noreferrer">Game Content Usage Rules</Link>".
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
