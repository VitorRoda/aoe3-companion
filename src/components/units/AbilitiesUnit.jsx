import { Box, Divider, ImageList, ImageListItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getUnitAbilities } from '../../services/abilities.service'
import UnitPower from './UnitPower'

const AbilitiesUnit = ({ unitName }) => {
    const [abilities, setAbilities] = useState([])

    useEffect(() => {
        const abilities = getUnitAbilities(unitName)
        setAbilities(abilities)
    }, [unitName])

    return (
        <Box mt={2}>
            <Divider></Divider>
            <ImageList cols={3} rowHeight={'auto'} gap={2}>
                {abilities.map((ability) => (
                    <ImageListItem key={`${unitName}-${ability['#text']}`}>
                        <UnitPower powerName={ability['#text']} />
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    )
}

export default AbilitiesUnit