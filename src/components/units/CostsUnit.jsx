import React from 'react'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const stylesCostNumber = {
    position: 'absolute',
    top: -6,
    right: -4,
    color: '#f2f2f2',
    fontSize: 13,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    p: '1px',
    lineHeight: 1,
    borderRadius: '4px'
}

export const CostsUnit = ({ costs, unitName, sx }) => {
    return (
        <Stack alignItems="flex-end" spacing={0.5} sx={sx}>
            {costs?.map((cost, idx) => {
                const type = cost?.['@resourcetype'] === 'Trade' ? 'export' : cost?.['@resourcetype']
                return (
                <Box sx={{ position: 'relative', height: 22 }} key={`unit-cost-${unitName}-${cost?.['@resourcetype']}`}>
                    <Box sx={stylesCostNumber}>{parseInt(cost?.['#text'])}</Box>
                    <img
                        height={22}
                        loading='lazy'
                        src={`/assets/resource_${type.toLowerCase()}.png`}
                        alt={type}
                        key={`cost-${type}-${idx}`} />
                </Box>
                )
            })}
        </Stack>
    )
}
