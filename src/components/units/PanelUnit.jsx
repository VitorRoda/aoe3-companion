import React, { useState } from 'react'
import { translate } from "../../utils/translator";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import FeedIcon from '@mui/icons-material/Feed';
import { CostsUnit } from "./CostsUnit";
import { MainStats } from "./MainStats";
import { AdvancedStats } from "./AdvancedStats";

const descUnitStyle = {
    backgroundImage: 'linear-gradient(to right, #EBC837, #FFEB8B)',
    borderWidth: '2px 0',
    borderImageSlice: 1,
    borderImageSource: 'linear-gradient(90deg,#b8862d00,#181c29,#394766,#181c29,#b8862d00)',
    borderStyle: 'solid'
}

export const PanelUnit = ({ unit }) => {
    const [openAdvancedInfo, setOpenAvancedInfo] = useState(false)
    const handleClickOpen = () => {
        setOpenAvancedInfo(true);
    };

    const handleClose = () => {
        setOpenAvancedInfo(false);
    };

    return (
        <Card sx={{
            backgroundImage: 'url(/assets/wood.png)',
            backgroundSize: 'cover',
        }}>
            <CardHeader
                title={translate(unit.info.displaynameid)}
                titleTypographyProps={{
                    fontFamily: 'TrajanPro',
                    fontSize: '16px',
                    fontWeight: 'bold',
                }}
                avatar={
                    <Avatar
                        src={unit.info.portraiticon}
                        alt={translate(unit.info.displaynameid)}
                        sx={{ width: 60, height: 60, fontSize: 12, boxShadow: '0 0 8px #f2f2f2' }}
                        variant="rounded"
                    />
                }
                action={<CostsUnit costs={unit?.info?.cost} />}
            />

            <Box px={2} mb={1}>
                <MainStats
                    initialhitpoints={unit?.info?.initialhitpoints}
                    maxvelocity={unit?.info?.maxvelocity}
                    populationcount={unit?.info?.populationcount}
                    armor={unit?.info?.armor}
                />
            </Box>

            <Box sx={descUnitStyle}>
                <CardContent sx={{ position: 'relative' }}>
                    {unit.info.rollovertextid.map((idtext, idx) =>
                        <Typography variant="body2" color="primary.contrastText" key={`description-${unit.info._name}-${idx}`}>
                            {translate(idtext)}
                        </Typography>
                    )}

                    <Box sx={{ height: 32, position: 'absolute', top: -13, right: -5, boxShadow: '0 0 6px 2px #111' }}>
                        <img loading='lazy' height={32} src={`/assets/icon_age_${+unit.info.allowedage[0] + 1}.png`} alt="" />
                    </Box>
                </CardContent>
            </Box>

            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <IconButton
                    aria-label="advanced stats"
                    sx={{
                        color: '#EBC837',
                        '&:hover': {
                            color: '#FFEB8B',
                        }
                    }}
                    onClick={handleClickOpen}
                >
                    <FeedIcon />
                </IconButton>

                <Dialog open={openAdvancedInfo} onClose={handleClose} fullWidth maxWidth='md'>
                    <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                            src={unit.info.portraiticon}
                            alt={translate(unit.info.displaynameid)}
                            sx={{ width: 60, height: 60, fontSize: 12, mr: 1, boxShadow: '0 0 8px #333333' }}
                            variant="rounded"
                        />
                        {translate(unit.info.displaynameid)}
                    </DialogTitle>
                    <AdvancedStats protoaction={unit?.info?.protoaction} />
                </Dialog>
            </CardActions>
        </Card >

    )
}
