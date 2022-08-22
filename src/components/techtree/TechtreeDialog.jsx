import { Box, Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import ReactGridLayout from 'react-grid-layout'
import { getCivTechtree } from '../../services/uitechtree.service'
import TechItem from './TechItem'

const techSize = 50
const gutterY = 8
const iconAgeWidth = 66
const heigthTotal = 588
const ageHeight = heigthTotal / 5
const ageIconPos = (age) => ((ageHeight - 50) / 2) + (ageHeight * (age - 1))

const agesColumnStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: iconAgeWidth,
    height: '100%',
    backgroundImage: 'url(/assets/Age1.png), url(/assets/Age2.png), url(/assets/Age3.png), url(/assets/Age4.png), url(/assets/Age5.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${iconAgeWidth}px, ${iconAgeWidth}px, ${iconAgeWidth}px, ${iconAgeWidth}px, ${iconAgeWidth}px`,
    backgroundPosition: `0 ${ageIconPos(1)}px, 0 ${ageIconPos(2)}px, 0 ${ageIconPos(3)}px, 0 ${ageIconPos(4)}px, 0 ${ageIconPos(5)}px`,
    zIndex: 1,
}

const gridContainerStyles = {
    overflowX: 'auto',
    height: '100%',
    ml: `${iconAgeWidth}px`
}

const ageSeparatorStyles = {
    position: 'absolute',
    width: '100%',
    background: 'rgba(255,255,255, 0.1)',
    pointerEvents: 'none',
    height: ageHeight,
    left: 0,
}

export const TechtreeDialog = ({ civ }) => {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState(null)

    useEffect(() => {
        if (!civ || !open) return

        getCivTechtree(civ).then(data => {
            setData(data)
        })
    }, [civ, open])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setData(null)
        setOpen(false);
    };

    return (
        <div id="techtree-dialog">
            <Button onClick={handleClickOpen}><img width="40" src="/assets/icon_techtree.png" alt="" /></Button>
            <Dialog open={open} fullWidth={true} maxWidth={'lg'}>
                <DialogContent sx={{ overflow: 'hidden' }}>
                    <Box sx={{
                        position: 'relative',
                        backgroundImage: 'url(/assets/wood.png)',
                        backgroundSize: '1200px',
                        backgroundRepeat: 'no-repeat',
                    }}>
                        <Box id="ages-column" sx={agesColumnStyles}></Box>

                        <Box className='age-techtree-separator-1' sx={{
                            ...ageSeparatorStyles,
                            top: ageHeight,
                        }}></Box>

                        <Box className='age-techtree-separator-2' sx={{
                            ...ageSeparatorStyles,
                            top: ageHeight * 3,
                        }}></Box>

                        <Box sx={gridContainerStyles}>
                            {data &&
                                <ReactGridLayout
                                    cols={data?.maxCol + 5}
                                    width={((data?.maxCol + 5) * techSize)}
                                    rowHeight={techSize}
                                    margin={[0, gutterY]}
                                    containerPadding={[0, gutterY]}
                                >
                                    {data?.items.map((item, idx) =>
                                        <div key={`${item?.type}-${item?.['@name']}-${idx}`} data-grid={{
                                            x: +item['@col'] - 1,
                                            y: +item['@row'],
                                            w: 5,
                                            h: 1,
                                            static: true
                                        }}>
                                            <TechItem
                                                type={item?.type}
                                                name={item?.['@name']}
                                                icon={item?.['@icon']}
                                                banner={item?.['@banner']}
                                                string={item?.['@string']}
                                                string2={item?.['@string2']}
                                            />
                                        </div>
                                    )}
                                </ReactGridLayout>
                            }
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
