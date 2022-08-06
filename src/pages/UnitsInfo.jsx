import React, { useCallback, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { getAllUnitsByTypes } from '../services/proto.service';
import { DrawerUnit } from "../components/units/DrawerUnit";
import { UnitList } from '../components/units/UnitList';
import { UnitsFilter } from '../components/units/UnitsFilter';

export const UnitsInfo = () => {
  const PAGE_SIZE = 12
  const [units, setUnits] = useState([])
  const [paginatedUnits, setPaginatedUnits] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [selectedUnit, setSelectedUnit] = useState(null)
  const [openAdvInfo, setOpenAdvInfo] = useState(false)

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
  }, [])

  return (
    <Box>
      <UnitsFilter onChange={handleOnChangeFilters} />
      
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
