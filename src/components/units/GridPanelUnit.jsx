import React from 'react'
import Grid from '@mui/material/Grid';
import { PanelUnit } from "./PanelUnit";

export const GridPanelUnit = React.memo(React.forwardRef(function GridPanelUnit({ unit, onClickAdvInfo }, ref) {
    const handleOnClickAdvInfo = (value) => {
        onClickAdvInfo(value)
    }

    return (
        <Grid key={unit?._id} item xs={12} sm={6} md={4} lg={3} ref={ref}>
            <PanelUnit unit={unit} onClickAdvInfo={handleOnClickAdvInfo} />
        </Grid>
    )
}))
