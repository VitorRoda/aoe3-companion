import React, { useState } from 'react'
import { translate } from "../../utils/translator";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FeedIcon from '@mui/icons-material/Feed';
import { CostsUnit } from "./CostsUnit";
import { DrawerUnit } from './DrawerUnit';

const descUnitStyle = {
    backgroundImage: 'linear-gradient(to right, #EBC837, #FFEB8B)',
    borderWidth: '2px 0',
    borderImageSlice: 1,
    borderImageSource: 'linear-gradient(90deg,#b8862d00,#181c29,#394766,#181c29,#b8862d00)',
    borderStyle: 'solid'
}

export const PanelUnit = ({ unit }) => {
    const [openAdvInfo, setOpenAdvInfo] = useState(false)

    const handleClickOpen = () => { setOpenAdvInfo(true) };

    const handleOnCloseAdvInfo = () => { setOpenAdvInfo(false) }

    return (
        <Card sx={{
            backgroundImage: 'url(/assets/wood.png)',
            backgroundSize: 'cover',
        }}>
            <CardHeader
                title={translate(unit?.displaynameid)}
                titleTypographyProps={{
                    fontFamily: 'TrajanPro',
                    fontSize: '15px',
                    fontWeight: 'bold',
                }}
                avatar={
                    <Avatar
                        src={unit?.portraiticon?.toLowerCase()}
                        alt={translate(unit?.displaynameid)}
                        sx={{ width: 55, height: 55, boxShadow: '0 0 8px #f2f2f2' }}
                        variant="rounded"
                    />
                }
                action={<CostsUnit costs={unit?.cost} />}
            />

            <Box sx={descUnitStyle}>
                <CardContent sx={{ position: 'relative' }}>
                    {unit?.rollovertextid?.map((idtext, idx) =>
                        <Typography variant="body2" color="primary.contrastText" key={`description-${unit?._name}-${idx}`}>
                            {translate(idtext)}
                        </Typography>
                    )}

                    <Box sx={{ height: 32, position: 'absolute', top: -13, right: -5, boxShadow: '0 0 6px 2px #111' }}>
                        <img loading='lazy' width={32} src={`/assets/icon_age_${+unit?.allowedage?.[0] + 1}.png`} alt="" />
                    </Box>
                </CardContent>
            </Box>

            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <IconButton color='primary' onClick={handleClickOpen}>
                    <FeedIcon />
                </IconButton>
            </CardActions>

            <DrawerUnit unit={unit} open={openAdvInfo} onClose={handleOnCloseAdvInfo} />
        </Card >
    )
}
