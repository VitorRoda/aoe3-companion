import React, { useState } from 'react'
import PropTypes from "prop-types";
import './CivSelector.css'
import civsData from '../data/civs.json'
import { translate } from "../utils/translator";
import FormControl from "@mui/material/FormControl";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const whitelistCivs = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  14,
  15,
  16,
  18,
  19,
  20,
  26,
  27,
  37,
  38,
  39,
  41
]

export function CivSelector({ onSelectCiv }) {
  const [civ, setCiv] = useState('')
  const handleOnChange = (event) => {
    const value = event.target.value.replace('.xml', '')
    setCiv(value)
    onSelectCiv(value)
  }

  const civItems = civsData.civ
    .filter((item, idx) => whitelistCivs.includes(idx))
    .map(civ =>
      <MenuItem value={civ.homecityfilename.replace('.xml', '')} key={civ.displaynameid}>
        <img loading='lazy' className='civ-selector__item-flag' src={`/${civ.homecityflagiconwpf}`} alt={civ.name} />
        {translate(civ?.displaynameid)}
      </MenuItem>
    )

  return (
    <div className='civ-selector'>
      <FormControl fullWidth sx={{ bgColor: 'secondary.main' }}>
        <InputLabel>{translate('18682')}</InputLabel>
        <Select label="Civilization" value={civ} onChange={handleOnChange}>
          <MenuItem value="">---</MenuItem>
          {civItems}
        </Select>
      </FormControl>
    </div>
  )
}

CivSelector.propTypes = {
  onSelectCiv: PropTypes.func
}

CivSelector.defaultProps = {
  onSelectCiv: () => {}
}

