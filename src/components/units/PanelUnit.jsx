import React from 'react'
import { translate } from "../../utils/translator";
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { CostsUnit } from "./CostsUnit";
import { MainStats } from "./MainStats";

const descUnitStyle = {
    backgroundImage: 'linear-gradient(to right, #EBC837, #FFEB8B)',
    borderWidth: '2px 0',
    borderImageSlice: 1,
    borderImageSource: 'linear-gradient(90deg,#b8862d00,#181c29,#394766,#181c29,#b8862d00)',
    borderStyle: 'solid'
}

export const PanelUnit = ({ unit }) => {
    return (
        <Card sx={{
            backgroundImage: 'url(/assets/wood.png)',
            backgroundSize: 'cover',
        }}>
            <CardHeader
                title={translate(unit.info.displaynameid)}
                titleTypographyProps={{ color: '#f2f2f2', fontSize: 16, fontWeight: 'bold', pr: 0.5 }}
                subheader={
                    <MainStats 
                        initialhitpoints={unit?.info?.initialhitpoints} 
                        maxvelocity={unit?.info?.maxvelocity}
                        populationcount={unit?.info?.populationcount}
                        armor={unit?.info?.armor}
                    />
                }
                subheaderTypographyProps={{ color: '#f4f4f4', fontSize: 13 }}
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
            <Box sx={descUnitStyle}>
                <CardContent sx={{ position: 'relative' }}>
                    {unit.info.rollovertextid.map((idtext, idx) =>
                        <Typography variant="body2" key={`description-${unit.info._name}-${idx}`}>
                            {translate(idtext)}
                        </Typography>
                    )}

                    <Box sx={{ height: 32, position: 'absolute', top: -13, right: -5, boxShadow: '0 0 6px 2px #111' }}>
                        <img height={32} src={`/assets/icon_age_${+unit.info.allowedage[0] + 1}.png`} alt="" />
                    </Box>
                </CardContent>
            </Box>

        </Card>

    )
}
