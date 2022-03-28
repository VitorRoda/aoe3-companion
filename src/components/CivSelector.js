import React, { useCallback, useState } from 'react'
import uniqid from 'uniqid'
import PropTypes from "prop-types";
import './CivSelector.css'
import civsData from '../data/civs.json'
import { translate } from "../utils/translator";
import FormControl from "@mui/material/FormControl";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { whitelistCivs } from "../constants";

export const CivSelector = React.memo(({ onSelectCiv }) => {
  const [civ, setCiv] = useState('')

  const handleOnChange = useCallback((event) => {
    const value = event.target.value.replace('.xml', '')
    setCiv(value)
    onSelectCiv(value)
  }, [])

  const civItems = civsData.civ
    .filter((item, index) => whitelistCivs.includes(index))
    .map(civ =>
      <MenuItem value={civ.homecityfilename.replace('.xml', '')} key={uniqid()}>
        <img loading='lazy' className='civ-selector__item-flag' src={`/${civ.homecityflagiconwpf}`} alt={civ.name} />
        {translate(civ?.displaynameid)}
      </MenuItem>
    )

  return (
    <div className='civ-selector'>
      <FormControl fullWidth sx={{ minWidth: 220 }}>
        <InputLabel id="label-civ" sx={{ color: "#000" }}>{translate('18682')}</InputLabel>
        <Select labelId="label-civ" 
          label={translate('18682')} 
          value={civ}
          sx={{ backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
          onChange={handleOnChange}>
          <MenuItem value="">---</MenuItem>
          {civItems}
        </Select>
      </FormControl>
    </div>
  )
})

CivSelector.propTypes = {
  onSelectCiv: PropTypes.func
}

CivSelector.defaultProps = {
  onSelectCiv: () => {}
}

