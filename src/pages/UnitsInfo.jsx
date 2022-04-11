import React, { useEffect, useState } from 'react'
import { getUnitsByCiv } from "../services/getUnitsByCiv";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import { PanelUnit } from "../components/units/PanelUnit";

export const UnitsInfo = ({ civ }) => {
  const [units, setUnits] = useState([])

  useEffect(() => {
    if (civ) {
      const data = getUnitsByCiv(civ)
      setUnits(data)
    } else {
      setUnits([])
    }
  }, [civ])

  return (
    !units?.length ?
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <img width={300} src='/assets/revolution_guns.png' alt="Revolution guns" />
      </Box> :
      <Grid container spacing={4}>
        {units.map(unit =>
          <Grid key={unit.id} item xs={12} sm={6} md={4} lg={3}>
            <PanelUnit unit={unit} />
          </Grid>
        )}
      </Grid>

  )
}
