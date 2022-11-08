import './CivSelector.css'
import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import { translate } from "../utils/translator";
import FormControl from "@mui/material/FormControl";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ImgFS } from './ImgFS';

export const CivSelector = React.memo(function CivSelector ({ selectedCiv, civs, onSelectCiv }) {
  const [civ, setCiv] = useState(() => selectedCiv)

  useEffect(() => {
    setCiv(selectedCiv)
  }, [selectedCiv])

  const handleOnChange = (event) => {
    const value = event.target.value
    setCiv(() => value)
    onSelectCiv(value)
  }

  const civItems = civs
    .map((civ, idx) =>
      <MenuItem value={civ} key={`civ-${civ.name}-${idx}`} sx={{ fontFamily: 'TrajanPro' }}>
        <ImgFS className='civ-selector__item-flag' path={civ?.homecityflagiconwpf} alt={civ.name} />
        {translate(civ?.displaynameid)}
      </MenuItem>
    )

  return (
    <div className='civ-selector'>
      <FormControl sx={{ width: 245 }}>
        <InputLabel id="label-civ" sx={{ fontFamily: 'TrajanPro' }}>{translate('18682')}</InputLabel>
        <Select labelId="label-civ" 
          label={translate('18682')} 
          value={civ}
          sx={{ fontFamily: 'TrajanPro' }}
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

