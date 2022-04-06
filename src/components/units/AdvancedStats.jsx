import React from 'react'
import exactMath from "exact-math";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';

const mapValueDamage = {
    'Ranged': 1,
    'Hand': 2,
    'Siege': 3
}

export const AdvancedStats = ({ unitname, protoaction }) => {
    return (
        <Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Stat</TableCell>
                            <TableCell align="right">Damage</TableCell>
                            <TableCell align="right">ROF</TableCell>
                            <TableCell align="right">Range</TableCell>
                            <TableCell align="right">Area</TableCell>
                            <TableCell align="right">Bonus</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {protoaction
                            .filter(item => item?.name?.includes('Attack'))
                            .sort((a, b) => {
                                const [damageTypeA] = a?.damagetype
                                const [damageTypeB] = b?.damagetype
                                return mapValueDamage[damageTypeA] - mapValueDamage[damageTypeB]
                            })
                            .map((row) => (
                                <TableRow key={row?.name}>
                                    <TableCell align='left'>{`${row.name} (${row?.damagetype?.[0]})`}</TableCell>
                                    <TableCell align="right">{row?.damage ? exactMath.round(row?.damage, -2) : '---'}</TableCell>
                                    <TableCell align="right">{row?.rof?.[0] ? exactMath.round(row?.rof?.[0], -2) : '---'}</TableCell>
                                    <TableCell align="right">{row?.maxrange ? exactMath.round(row?.maxrange, -2) : '---'}</TableCell>
                                    <TableCell align="right">{row?.damagearea?.[0] ? exactMath.round(row?.damagearea?.[0], -2) : '---'}</TableCell>
                                    <TableCell>{
                                        row?.damagebonus && row.damagebonus.map(bonus =>
                                            <Stack direction={'row'} spacing={1} key={`bonus-${bonus?._type}`}>
                                                <Box>x{exactMath.round(bonus?.__text, -2)}</Box>
                                                <Box>{bonus?._type?.replace('Abstract', '')}</Box>
                                            </Stack>
                                        )
                                    }</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

AdvancedStats.defaultProps = {
    protoaction: []
}
