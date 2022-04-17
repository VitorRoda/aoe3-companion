import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { getActionTranslByName } from '../../services/tactics.service';


export const UnitActionTransl = ({ tacticskey, name }) => {
    const [tacticTransl, setTacticTransl] = useState('')

    useEffect(() => {
        getActionTranslByName(tacticskey, name).then(value => setTacticTransl(value))
    })
    return (
        <Typography variant='subtitle2' color='primary'>{tacticTransl}</Typography>
    )
}
