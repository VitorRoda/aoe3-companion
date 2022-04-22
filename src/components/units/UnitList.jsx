import React, { useCallback, useRef } from 'react'
import Grid from '@mui/material/Grid';
import { PanelUnit } from "./PanelUnit";

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

    const handleOnClickAdvInfo = (value) => {
        onClickAdvInfo(value)
    }

    return (
        <Grid container spacing={4}>
            {units.map((unit, idx) =>
                <Grid key={unit?._id} item xs={12} sm={6} md={4} lg={3}
                    ref={units.length === idx + 1 ? lastElRef : undefined}>
                    <PanelUnit unit={unit} onClickAdvInfo={handleOnClickAdvInfo} />
                </Grid>
            )}
        </Grid>
    )
})
