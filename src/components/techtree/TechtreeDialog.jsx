import { Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { getCivTechtree } from '../../services/uitechtree.service'

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
            <Dialog
                open={open}
            >
                <DialogContent>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
