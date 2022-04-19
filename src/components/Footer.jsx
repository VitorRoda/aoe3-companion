import React from 'react'
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Container, Typography } from '@mui/material';

const MSGCR = 'https://www.xbox.com/en-US/developers/rules'

const footerStyles = {
    py: 2,
    backgroundImage: 'linear-gradient(90deg,#181c29,#394766 40%,#181c29)',
    borderWidth: '2px 0',
    borderImageSlice: 1,
    borderImageSource: 'linear-gradient(90deg,#b8862d00,#b8862d,#ffdf91,#b8862d,#b8862d00)',
    borderStyle: 'solid',
    position: 'fixed',
    bottom: 0,
    width: '100%'
}

export const Footer = () => {

    return (
        <Box component="footer" sx={footerStyles}>
            <Container>
                <Typography color="text.primary">
                    <i>Age of Empires III: Definitive Edition©</i> This site was created under Microsoft's "<Link className='link-ms-gc-rules' href={MSGCR} target='_blank' rel="noreferrer">Game Content Usage Rules</Link>".
                </Typography>
            </Container>
        </Box>
    )
}
