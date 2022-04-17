import React, { useState } from 'react'
import { constantCase } from "change-case";
import exactMath from "exact-math";
import { Stack, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar';

export const StatIcon = ({ type, icon, value, title, bonus, src }) => {
  const iconSize = 16
  const [errorImg, setErrorImg] = useState(false)
  const _src = src || `/resources/images/hud/${icon}.png`

  const fallbackImg = () => {
    setErrorImg(true)
  }

  const strAvatar = (value) => {
    const [s1, s2] = constantCase(value.replace(/Abstract|deMerc|xp/, '')).split('_')
    return s1?.[0] + (s2?.[0] || '')
  }

  return (
    <Stack direction="row" spacing={0.25} alignItems="center">
      <Typography variant='body2'>{bonus && 'x'}{exactMath.round(value, -2)}</Typography>
      {!errorImg && <img width={iconSize} height={iconSize} src={_src} alt={type} title={title || type} onError={fallbackImg} />}
      {errorImg && <Avatar sx={{
        width: iconSize,
        height: iconSize,
        fontSize: 8,
        backgroundColor: 'primary.main'
      }}><span title={title || type}>{strAvatar(type)}</span></Avatar>}
    </Stack>
  )
}
