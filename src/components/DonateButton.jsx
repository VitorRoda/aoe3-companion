import React, { useRef, useEffect, useMemo } from 'react'
import uniqid from 'uniqid'
import Box from '@mui/material/Box';

export const DonateButton = () => {
    const buttonRef = useRef(null);
    const buttonId = useMemo(() => `paypal-donate-btn-${uniqid()}`, [])

    useEffect(() => {
        const button = window.PayPal.Donation.Button({
            env: process.env.NODE_ENV,
            hosted_button_id: 'ANJUF3LUEJPF2',
            image: {
                src: 'https://pics.paypal.com/00/s/ZmZjMzJkMWYtOWM1NS00NzYyLWI4ZDUtNDRiYmZiOTY3YjYz/file.PNG',
                alt: 'Donate with PayPal button',
                title: 'PayPal - The safer, easier way to pay online!',
            }
        });
        button.render(`#${buttonRef.current.id}`);
    }, []);

    return (
        <Box 
            ref={buttonRef} 
            id={buttonId} 
            sx={{ width: 105, height: 35, 'img': { height: 35 } }}>
        </Box>
    );
}
