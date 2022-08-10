import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { translate } from '../../utils/translator';
import { UnitTypeSelector } from "./UnitTypeSelector";
import { useCallback } from 'react';
import { useRef } from 'react';
import { useMounted } from '../../hooks/useMounted';

export const UnitsFilter = React.memo(function UnitsFilter({ onChange }) {
  const theme = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [types, setTypes] = useState([])
  const searchTermRef = useRef(searchTerm)
  const typesRef = useRef(types)
  const isMounted = useMounted()

  useEffect(() => {
    if (!isMounted) return
    searchTermRef.current = searchTerm
    const timer = setTimeout(() => {
      onChange({ types: typesRef.current, searchTerm })
    }, 350)

    return () => clearTimeout(timer)
  }, [searchTerm, onChange])

  useEffect(() => {
    if (!isMounted) return
    typesRef.current = types
    onChange({ types, searchTerm: searchTermRef.current })
  }, [types, onChange])

  const handleOnChangeSearch = useCallback((event) => {
    const value = event.target.value
    setSearchTerm(() => value)
  }, [])

  const handleOnChangeTypes = useCallback((value) => {
    setTypes(() => value)
  }, [])

  return (
    <Box display={'flex'} justifyContent="center" sx={{
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center'
      }
    }}>
      <TextField
        label={translate('21237')}
        type="search"
        value={searchTerm}
        onChange={handleOnChangeSearch}
        sx={{
          mr: 1, 
          [theme.breakpoints.down('sm')]: {
            mr: 0, mb: 1
          }
        }}
      />
      <UnitTypeSelector onChange={handleOnChangeTypes} />
    </Box>
  )
})
