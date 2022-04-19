import React, { useCallback, useEffect, useRef, useState } from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import { PanelUnit } from "../components/units/PanelUnit";
import { getAllUnitsByTypes } from '../services/proto.service';
import { UnitTypeSelector } from '../components/units/UnitTypeSelector';

export const UnitsInfo = () => {
  const PAGE_SIZE = 8
  const [types, seTypes] = useState([])
  const [units, setUnits] = useState([])
  const [paginatedUnits, setPaginatedUnits] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const observer = useRef()
  const lasElRef = useCallback(node => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(([target]) => {
      if (target.isIntersecting && hasMore) {
        setPage(prev => prev + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [hasMore])

  useEffect(() => {
    if (types.length) {
      const data = getAllUnitsByTypes(types.map(type => type.id))
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
    if (page > 1) {
      const startAt = (page - 1) * PAGE_SIZE
      let limit = page * PAGE_SIZE

      setHasMore(limit < units.length)
      setPaginatedUnits(prev => [...prev, ...units.slice(startAt, limit)])
    }
  }, [page])

  const handleOnChageTypes = (value) => {
    seTypes(value)
  }

  return (
    <Box>
      <Box display={'flex'} justifyContent="center">
        <UnitTypeSelector onChange={handleOnChageTypes} />
      </Box>
      
      {!units?.length ?
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <img width={300} src='/assets/revolution_guns.png' alt="Revolution guns" />
        </Box> :

        <Grid container spacing={4}>
          {paginatedUnits.map((unit, idx) =>
            <Grid
              item
              key={unit?._id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              ref={paginatedUnits.length === idx + 1 ? lasElRef : undefined}>
              <PanelUnit unit={unit} />
            </Grid>
          )}
        </Grid>
      }
    </Box>
  )
}
