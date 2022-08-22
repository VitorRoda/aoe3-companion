import { Box, Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import ReactGridLayout from 'react-grid-layout'
import { getCivTechtree } from '../../services/uitechtree.service'
import TechItem from './TechItem'

export const TechtreeDialog = ({ civ }) => {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState(null)
    const techSize = 50

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
        <div>
            <Button onClick={handleClickOpen}><img width="40" src="/assets/icon_techtree.png" alt="" /></Button>
            <Dialog open={open} fullWidth={true} maxWidth={'lg'}>
                <DialogContent sx={{ overflow: 'hidden' }}>
                    <Box sx={{ position: 'relative' }}>
                        <Box sx={{ 
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100px',
                            height: '100%',
                            backgroundImage: 'url(/assets/Age1.png), url(/assets/Age2.png), url(/assets/Age3.png), url(/assets/Age4.png), url(/assets/Age5.png), url(/assets/wood.png)',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '100px, 100px, 100px, 100px, 100px, 1200px',
                            backgroundPosition: '0 18.5px, 0 131.5px, 0 244.5px, 0 357.5px, 0 470.5px, left center',
                            zIndex: 1,
                         }}></Box>
                         <Box sx={{ 
                            overflowX: 'auto', 
                            height: '100%', 
                            backgroundImage: 'url(/assets/wood.png)',
                            backgroundSize: '1200px',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: '-100px center',
                            ml: '100px'
                        }}>
                            {data &&
                                <ReactGridLayout
                                    cols={data?.maxCol + 5}
                                    width={((data?.maxCol + 5) * techSize)}
                                    rowHeight={techSize}
                                    margin={[5, 5]}
                                    containerPadding={[0, 10]}
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
