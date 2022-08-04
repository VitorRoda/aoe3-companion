import React, { useCallback, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { getAllUnitsByTypes } from '../services/proto.service';
import { UnitTypeSelector } from '../components/units/UnitTypeSelector';
import { DrawerUnit } from "../components/units/DrawerUnit";
import { UnitList } from '../components/units/UnitList';
import { translate } from '../utils/translator';

export const UnitsInfo = () => {
  const PAGE_SIZE = 12
  const [types, seTypes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [units, setUnits] = useState([])
  const [paginatedUnits, setPaginatedUnits] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [selectedUnit, setSelectedUnit] = useState(null)
  const [openAdvInfo, setOpenAdvInfo] = useState(false)
  const theme = useTheme()

  useEffect(() => {
    if (types.length) {
      const data = getAllUnitsByTypes(types.map(type => type.id), searchTerm)
      setUnits(data)
      const paginated = data.slice(0, PAGE_SIZE)
      setPaginatedUnits(paginated)
      setHasMore(paginated.length < data.length)
    } else {
      setUnits([])
      setPaginatedUnits([])
      setHasMore(false)
    }
    setPage(1)
  }, [types])

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (types.length || searchTerm) {
        const data = getAllUnitsByTypes(types.map(type => type.id), searchTerm)
        setUnits(data)
        const paginated = data.slice(0, PAGE_SIZE)
        setPaginatedUnits(paginated)
        setHasMore(paginated.length < data.length)
      } else {
        setUnits([])
        setPaginatedUnits([])
        setHasMore(false)
      }
    }, 400)

    return () => clearTimeout(timeoutID)
  }, [searchTerm])

  useEffect(() => {
    if (page > 1) {
      const startAt = (page - 1) * PAGE_SIZE
      let limit = page * PAGE_SIZE

      setHasMore(limit < units.length)
      setPaginatedUnits(prev => [...prev, ...units.slice(startAt, limit)])
    }
  }, [page])

  const handleOnChangeTypes = useCallback((value) => {
    seTypes(() => value)
  }, [])

  const handleOnChangeSearch = useCallback((event) => {
    setSearchTerm(event.target.value)
  }, [])

  const handleOnCloseAdvInfo = useCallback(() => {
    setOpenAdvInfo(() => false)
  }, [])

  const handleOnClickAdvInfo = useCallback((value) => {
    setSelectedUnit(() => value)
    setOpenAdvInfo(() => true)
  }, [])

  const handleOnLastEl = useCallback(() => {
    if (hasMore) {
      setPage(prev => prev + 1)
    }
  }, [hasMore])

  return (
    <Box>
      <Box display={'flex'} justifyContent="center" sx={{
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
          alignItems: 'center'
        }
      }}>
        <TextField
          id="filled-search"
          label={translate('21237')}
          type="search"
          value={searchTerm}
          onChange={handleOnChangeSearch}
          sx={{
            mr: 1, [theme.breakpoints.down('sm')]: {
              mr: 0, mb: 1
            }
          }}
        />
        <UnitTypeSelector onChange={handleOnChangeTypes} />
      </Box>

      {!units?.length &&
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <img loading='lazy' width={300} src='/assets/revolution_guns.png' alt="Revolution guns" />
        </Box>
      }

      <UnitList units={paginatedUnits} onLastEl={handleOnLastEl} onClickAdvInfo={handleOnClickAdvInfo} />

      <DrawerUnit unit={selectedUnit} open={openAdvInfo} onClose={handleOnCloseAdvInfo} />
    </Box>
  )
}
