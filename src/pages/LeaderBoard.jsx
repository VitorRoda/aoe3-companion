import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { leaderboarSvc } from '../services/leaderboard.service'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import TrendingUp from "@mui/icons-material/TrendingUp";
import TrendingDown from "@mui/icons-material/TrendingDown";
import { Fragment } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

const dataGridStyles = {
    [`& .${gridClasses.columnHeaders}`]: {
        backgroundImage: 'linear-gradient(90deg,#170803,#532412 40%,#170803)',
        borderWidth: '2px 0',
        borderImageSlice: 1,
        borderImageSource: 'linear-gradient(90deg,#b8862d00,#b8862d,#ffdf91,#b8862d,#b8862d00)',
        borderStyle: 'solid',
    },
    [`& .${gridClasses.cell}`]: {
        borderBottom: 0
    },
    [`& .${gridClasses.columnHeaderTitle}`]: {
        fontFamily: 'TrajanPro',
        fontWeight: 'bold',
    },
    [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
        outline: "none"
    },
    [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: {
        outline: "none"
    },
    [`& .${gridClasses.row}.odd`]: {
        borderWidth: '1px 0',
        borderImageSlice: 1,
        borderImageSource: 'linear-gradient(90deg,#b8862d00,#b8862d,#ffdf91,#b8862d,#b8862d00)',
        borderStyle: 'solid',
    }
}

const columns = [{
    field: 'rank',
    headerName: '#',
    width: 60,
    type: 'number',
}, {
    field: 'name',
    headerName: 'Nickname',
    minWidth: 250,
    renderCell: ({ value }) => (
        <Typography fontWeight={'bold'} variant='subtitle2'>{value}</Typography>
    ),
}, {
    field: 'clan',
    headerName: 'Clan',
    valueFormatter: ({ value }) => value || '---',
}, {
    field: 'elo',
    headerName: 'ELO',
    type: 'number',
}, {
    field: 'winRate',
    headerName: 'Win Rate',
    valueGetter: ({ row }) => ((row.wins / (row.wins + row.losses)) * 100).toFixed(2),
    valueFormatter: ({ value }) => `${value}%`,
    type: 'number',
}, {
    field: 'wins',
    headerName: 'Wins',
    type: 'number',
    renderCell: ({ value }) => (
        <Typography color={'success.main'} variant='body2'>{value}</Typography>
    ),
}, {
    field: 'losses',
    headerName: 'Losses',
    type: 'number',
    renderCell: ({ value }) => (
        <Typography color={'error'} variant='body2'>{value}</Typography>
    ),
}, {
    field: 'games',
    headerName: 'Games',
    valueGetter: ({ row }) => row.wins + row.losses,
    type: 'number',
}, {
    field: 'streak',
    headerName: 'Streak',
    type: 'number',
    renderCell: ({ value }) => (
        <Fragment>
            <Typography variant='body2' color={value > 0 ? 'success.main' : 'error'}>{value}</Typography>
            {value > 0 ? <TrendingUp color='success' /> : <TrendingDown color='error' />}
        </Fragment>
    ),
}, {
    field: 'lastOnline',
    headerName: 'Online',
    type: 'date',
    valueGetter: ({ row }) => new Date(+row.lastOnline * 1000),
    renderCell: ({ value }) => (<Fragment>{timeAgo.format(value)}</Fragment>),
}]

export const LeaderBoard = () => {
    const [players, setPlayers] = useState([])
    const [pageSize, setPageSize] = useState(10)
    const [modo, setModo] = useState('1vs1')
    const [isLoading, setIsLoading] = useState('1vs1')

    useEffect(() => {
        setPlayers([])
        setIsLoading(true)
        leaderboarSvc(modo).then(data => {
            setPlayers(data)
            setIsLoading(false)
        })
    }, [modo])

    const handlePageSize = (val) => {
        setPageSize(val)
    }

    const handleChangeModo = (event) => {
        setModo(event.target.value)
    }

    return (
        <Box sx={{
            width: '100%',
            backgroundImage: 'url(/assets/wood.png)',
            backgroundImageSize: 1150,
        }}>
            <FormControl variant='filled' sx={{ m:1, width: 280 }}>
                <InputLabel id="demo-simple-select-label">Modo</InputLabel>
                <Select
                    value={modo}
                    label="modo"
                    onChange={handleChangeModo}
                >
                    <MenuItem value={'1vs1'}>1 vs 1 Supremacy</MenuItem>
                    <MenuItem value={'teamSupremacy'}>Team Supremacy</MenuItem>
                    <MenuItem value={'treaty'}>Treaty</MenuItem>
                </Select>
            </FormControl>

            <DataGrid
                loading={isLoading}
                sx={dataGridStyles}
                columns={columns}
                rows={players}
                getRowId={(row) => row.gameId}
                autoHeight={true}
                pageSize={pageSize}
                onPageSizeChange={handlePageSize}
                rowsPerPageOptions={[10, 25, 50]}
                hideFooterSelectedRowCount={true}
                disableColumnMenu={true}
                disableColumnFilter={true}
                disableColumnSelector={true}
                components={{ Toolbar: GridToolbar }}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 300 },
                        printOptions: { disableToolbarButton: true }
                    },
                }}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                }
            />
        </Box>
    )
}
