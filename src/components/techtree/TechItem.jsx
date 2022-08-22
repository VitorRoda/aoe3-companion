import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { getProtoUnitByName } from '../../services/proto.service'
import { getTechInfo } from '../../services/techtree.service'
import { translate } from '../../utils/translator'
import { CardItem } from '../cards/CardItem'

const generateBannerGradient = (color1, color2) => `linear-gradient(45deg, ${color1} 10%, ${color2} 35%, ${color1}, ${color2} 90%)`

const setBannerColor = (banner) => {
    let color = ''
    switch (banner) {
        case 'building':
            color = generateBannerGradient('#771522', '#ae2f46')
            break;
        case 'unit':
            color = generateBannerGradient('#245f99', '#3987b8')
            break;
        case 'improvement':
            color = generateBannerGradient('#9b7711', '#dec94a')
            break;
        case 'dance':
            color = generateBannerGradient('#8e8627', '#cbc771')
            break;
        case 'ally':
            color = generateBannerGradient('#603aa9', '#b489e2')
            break;
        case 'shipment':
            color = generateBannerGradient('#4b535b', '#99adbc')
            break;
        case 'army':
            color = generateBannerGradient('#971f07', '#f14c0f')
            break;
        default:
            break;
    }

    return color
}

const bannerStyles = (banner) => ({
    display: 'flex',
    alignItems: 'center',
    width: 190,
    height: 40,
    pl: 0.25,
    mt: '5px',
    borderTopRightRadius: 15,
    backgroundImage: setBannerColor(banner),
    borderBottom: '2px solid #EBC837',
    boxShadow: '0 0 5px rgba(0,0,0,0.7)',
    boxSizing: 'border-box',
})

const TechItem = ({ type, name, icon, banner, string, string2 }) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        let _name = banner === 'dance' ? string : name
        if (!_name) return

        let data
        
        if (banner === 'dance'){
            data = {
                displaynameid: string,
                rollovertextid: string2
            }
        } else if (type === 'tech')
            data = getTechInfo(name)
        else
            data = getProtoUnitByName(name)

        setData({
            name,
            info: { ...data, icon },
        })
    }, [name, type, icon, banner, string, string2])

    return (
        <Box display={'flex'} width={250}>
            {data && <CardItem card={data} sm={true}></CardItem>}
            <Box sx={bannerStyles(banner)}>
                <Typography variant='subtitle2' fontSize={11} lineHeight={'normal'} sx={{ textShadow: '0 0 3px #000' }}>{
                    type === 'label' ? translate(string) : translate(data?.info?.displaynameid)
                }</Typography>
            </Box>
        </Box>
    )
}

export default TechItem