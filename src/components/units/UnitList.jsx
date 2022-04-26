import React, { useCallback, useRef } from 'react'
import Grid from '@mui/material/Grid';
import { GridPanelUnit } from './GridPanelUnit'

export const UnitList = React.memo(({ units, onLastEl, onClickAdvInfo }) => {
    const observer = useRef()

    const lastElRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(([target]) => {
            if (target.isIntersecting) {
                onLastEl()
            }
        })
        if (node) observer.current.observe(node)
    }, [onLastEl])

    const handleOnClickAdvInfo = useCallback((value) => {
        onClickAdvInfo(value)
    }, [onClickAdvInfo])

    return (
        <Grid container spacing={4}>
            {units.map((unit, idx) =>
                <GridPanelUnit 
                    key={unit?._id} 
                    unit={unit} 
                    ref={units.length === idx + 1 ? lastElRef : undefined}
                    onClickAdvInfo={handleOnClickAdvInfo} />
            )}
        </Grid>
    )
})
