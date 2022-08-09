import React, { useCallback, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { getAllUnitsByTypes } from '../services/proto.service';
import { DrawerUnit } from "../components/units/DrawerUnit";
import { UnitList } from '../components/units/UnitList';
import { UnitsFilter } from '../components/units/UnitsFilter';
import { Typography } from '@mui/material';
import { translate } from '../utils/translator';

export const UnitsInfo = () => {
  const PAGE_SIZE = 12
  const [units, setUnits] = useState([])
  const [paginatedUnits, setPaginatedUnits] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [selectedUnit, setSelectedUnit] = useState(null)
  const [openAdvInfo, setOpenAdvInfo] = useState(false)
  const [showNoResults, setShowNoResults] = useState(false)

  useEffect(() => {
    if (page > 1) {
      const startAt = (page - 1) * PAGE_SIZE
      let limit = page * PAGE_SIZE

      setHasMore(limit < units.length)
      setPaginatedUnits(prev => [...prev, ...units.slice(startAt, limit)])
    }
  }, [page])

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

  const handleOnChangeFilters = useCallback(({ types, searchTerm }) => {
    setPage(1)
    setShowNoResults(false)

    if (!types.length && !searchTerm) {
      setUnits([])
      setPaginatedUnits([])
      setHasMore(false)
      return
    }

    const data = getAllUnitsByTypes(types.map(type => type.id), searchTerm)
    setUnits(data)
    const paginated = data.slice(0, PAGE_SIZE)
    setPaginatedUnits(paginated)
    setHasMore(paginated.length < data.length)

    if (!data.length) setShowNoResults(true)
  }, [])

  return (
    <Box>
      <UnitsFilter onChange={handleOnChangeFilters} />
      
      {showNoResults && <Typography variant='h6' color='primary' align='center'>{translate('72302')}</Typography>}

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
