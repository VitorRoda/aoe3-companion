import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { getProtoUnitByName } from '../../services/proto.service'
import { getStorageURL } from '../../utils/getStorageURL'
import { translate } from '../../utils/translator'

const ProtoUnit = ({ name, icon, banner }) => {
    const [data, setData] = useState(null)
    const [src, setSrc] = useState('')
    const sizeImg = 50

    useEffect(() => {
        if (!name) return
        const data = getProtoUnitByName(name)
        setData(data)
    }, [name])

    useEffect(() => {
        if (!icon) {
            setSrc('')
        } else {
            setSrc(getStorageURL(icon, true))
        }
    }, [icon])

    return (
        <Box display={'flex'}>
            <img src={src} width={sizeImg} height={sizeImg} alt={name} />
            <Typography variant='body2'>{translate(data?.displaynameid)}</Typography>
        </Box>
    )
}

export default ProtoUnit