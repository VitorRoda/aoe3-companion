import React, { useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { translate } from '../../utils/translator';
import { unitTypes } from '../../constants';
import { Typography } from '@mui/material';

export const UnitTypeSelector = React.memo(function UnitTypeSelector ({ onChange }) {
    const [selectedTypes, setSelectedTypes] = useState([])

    const handleChange = (event) => {
        const { target: { value } } = event;
        setSelectedTypes(value);
        onChange(value)
    };

    return (
        <FormControl sx={{ width: 300, mb: 2 }}>
            <InputLabel id="unit-type-multiselect-label">{translate('22302')}</InputLabel>
            <Select
                labelId="unit-type-multiselect-label"
                id="unit-type-multiselect"
                multiple
                value={selectedTypes}
                onChange={handleChange}
                input={<OutlinedInput label={translate('22302')} />}
                renderValue={(selected) => selected.map(item => translate(item.nameId)).join(', ')}
            >
                {unitTypes.map((type) => (
                    <MenuItem key={type.id} value={type}>
                        <Checkbox
                            checked={selectedTypes.some(item => item.id === type.id)}
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }}
                        />
                        <ListItemText
                            disableTypography
                            primary={
                                <Typography variant="body2">{translate(type.nameId)}</Typography>
                            } />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
})
