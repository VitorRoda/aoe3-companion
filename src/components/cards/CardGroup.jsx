import React from 'react'
import Box from '@mui/material/Box';
import { CardItem } from "./CardItem";
import { alpha, Typography } from '@mui/material';
import { translate } from '../../utils/translator';
import { getStorageURL } from '../../utils/getStorageURL';

const groupStyles = {
    display: 'inline-block',
    backgroundColor: alpha('#f2f2f2', 0.1),
    mr: 1,
    mb: 1,
    paddingY: 0.2,
    position: 'relative',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: alpha('#f2f2f2', 0.3),
    }
}

const ageGroupStyles = {
    position: 'absolute',
    width: 22,
    height: 22,
    left: -4,
    top: 0,
    boxShadow: `0 0 2.5px #f2f2f2`,
    '> img': {
        width: '100%'
    }
}

const checkStyles = {
    position: 'absolute',
    width: 32,
    top: -4,
    right: -8,
    '> img': {
        width: '100%'
    }
}

export const CardGroup = ({ group, onClick }) => {
    const handleOnClick = (group) => () => {
        onClick(group)
    }
    return (
        <Box
            sx={groupStyles}
            key={group?._name}
            onClick={handleOnClick(group)}
        >
            <Box sx={ageGroupStyles}>
                <img src={getStorageURL(group.icon, true)} alt="" />
            </Box>
            <Typography variant='subtitle2' color="text.primary" pl={2.5} pr={0.5}>
                {translate(group.displaynameid)}
            </Typography>
            <Box display={'flex'}>
                {group.cards.map(card =>
                    <CardItem
                        key={card.id}
                        card={card}>
                    </CardItem>
                )}
            </Box>
            {group.isSelected && <Box sx={checkStyles}>
                <img
                    loading='lazy'
                    src={'/assets/hp_cp_check.png'} alt="check group">
                </img>
            </Box>}
        </Box>
    )
}
