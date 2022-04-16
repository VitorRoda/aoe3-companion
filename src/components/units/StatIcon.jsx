import React, { useState } from 'react'
import { Stack } from '@mui/material'
import exactMath from "exact-math";

const mapIconByType = {
  'Hand' : 'attack',
}

export const StatIcon = ({ type, value, bonus, src }) => {
  const [errorImg, setErrorImg] = useState(false)
  const _src = src || `/resources/images/hud/stat_icon_${mapIconByType?.[type] || type.toLowerCase()}.png`

  const fallbackImg = () => {
    setErrorImg(true)
  }

  return (
    <Stack direction="row" spacing={0.25}>
      <span>{bonus && 'x'}{exactMath.round(value, -2)}</span>
      {!errorImg  && <img width={18} src={_src} alt={type} title={type} onError={fallbackImg} />}
      {errorImg && <span>{type.replace('Abstract', '')}</span>}
    </Stack>
  )
}
