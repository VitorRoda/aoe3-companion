import React, { useState } from 'react'
import { constantCase } from "change-case";
import exactMath from "exact-math";
import { Stack, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import { getStorageURL } from '../../utils/getStorageURL';

const iconSizes = {
  sm: 16,
  md: 20
}

export const StatIcon = ({ value = 0, type, icon, src, title, bonus, size = 'sm', isTime }) => {
  const iconSize = iconSizes[size]
  const [errorImg, setErrorImg] = useState(false)
  let _src = src || `resources/images/hud/${icon}.png`

  if (_src.includes('resources/'))
    _src = getStorageURL(_src)

  const fallbackImg = () => {
    setErrorImg(true)
  }

  const strAvatar = (value) => {
    const [s1, s2] = constantCase(value.replace(/Abstract|deMerc|xp/, '')).split('_')
    return s1?.[0] + (s2?.[0] || '')
  }

  return (
    <Stack direction="row" spacing={0.25} alignItems="center">
      <Typography variant='body2'>{bonus && 'x'}{exactMath.round(value, -2)}{isTime && 's'}</Typography>
      {!errorImg && <img loading='lazy' width={iconSize} height={iconSize} src={_src} alt={type} title={title || type} onError={fallbackImg} />}
      {errorImg && <Avatar sx={{
        width: iconSize,
        height: iconSize,
        fontSize: 8,
        backgroundColor: 'primary.main'
      }}><span title={title || type}>{strAvatar(type)}</span></Avatar>}
    </Stack>
  )
}
