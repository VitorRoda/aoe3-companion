import React, { useEffect, useState } from 'react'
import { headerCase } from "change-case";
import FormControl from "@mui/material/FormControl";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { translate } from '../utils/translator';
import { fixPath } from '../utils/fixPath';
import { getCivByName } from '../services/civs.service';
import { Box } from '@mui/material';
import { ImgFS } from './ImgFS';

const flagStyles = { 
    mr: 1, 
    display: 'inline-block', 
    verticalAlign: 'middle', 
    height: 26,
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.5)' 
}

export const RevoltSelector = ({ revolts, selectedRevolt, onSelectRevolt }) => {
    const [_revolts, setRevolts] = useState([])
    const [revolt, setRevolt] = useState(() => selectedRevolt)

    useEffect(() => {
        setRevolt(selectedRevolt)
      }, [selectedRevolt])

    useEffect(() => {
        setRevolts(revolts.map(revolt => ({
            ...revolt,
            ...getCivByName(revolt?.['@civ'])
        })))
    }, [revolts])

    const handleOnChange = (event) => {
        onSelectRevolt(event.target.value)
    }

    const fixFlagName = (value) => {
        const filename = value.substring(value.lastIndexOf('/') + 1).replace('.png', '');
        return value.replace(filename, headerCase(filename, { delimiter: '_' }))
    }

    const revoltItems = _revolts.map((rev, idx) =>
        <MenuItem value={rev} key={`revolt-${rev.name}-${idx}`} sx={{ fontFamily: 'TrajanPro' }}>
            <Box sx={flagStyles}>
                <ImgFS height={26} path={fixFlagName(fixPath(rev?.homecityflagiconwpf))} alt={rev.name} />
            </Box>
            {translate(rev?.displaynameid)}
        </MenuItem>
    )

    return (
        <FormControl sx={{ width: 245 }}>
            <InputLabel id="label-revolt" sx={{ fontFamily: 'TrajanPro' }}>{translate('45973')}</InputLabel>
            <Select labelId="label-revolt"
                label={translate('45973')}
                value={revolt}
                sx={{ fontFamily: 'TrajanPro' }}
                onChange={handleOnChange}>
                <MenuItem value="">---</MenuItem>
                {revoltItems}
            </Select>
        </FormControl>
    )
}
