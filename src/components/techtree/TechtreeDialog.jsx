import { Box, Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { getCivTechtree } from '../../services/uitechtree.service'
import ProtoUnit from './ProtoUnit'

export const TechtreeDialog = ({ civ }) => {
    const [open, setOpen] = useState(false)
    const [techtreeData, setTechtreeData] = useState(null)

    useEffect(() => {
        if (!civ || !open) return

        getCivTechtree(civ).then(data => {
            setTechtreeData(data)
        })
    }, [civ, open])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Button onClick={handleClickOpen}>Techtree</Button>
            <Dialog open={open}>
                <DialogContent>
                    <Box>
                        {techtreeData?.map(({ proto }, idx) =>
                            <Box display={'flex'} key={`row-${idx}`}>
                                {proto?.map((row) => row.map((col) =>
                                    <ProtoUnit
                                        key={col?.['@name']}
                                        name={col?.['@name']}
                                        icon={col?.['@icon']}
                                        banner={col?.['@banner']}
                                    />
                                ))}
                            </Box>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
