import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { getActionTranslByName } from '../../services/tactics.service';


export const UnitActionTransl = ({ tacticskey, name }) => {
    const [tacticTransl, setTacticTransl] = useState('')

    useEffect(() => {
        if (tacticskey) {
            getActionTranslByName(tacticskey, name).then(value => setTacticTransl(value))
        } else {
            setTacticTransl(name)
        }
    }, [tacticskey, name])
    return (
        <Typography variant='subtitle2' color='primary'>{tacticTransl}</Typography>
    )
}
