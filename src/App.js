import './App.css'
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { CivSelector } from "./components/CivSelector";
import { CardsList } from "./components/CardsList";
import { translate } from "./utils/translator";

function App() {
  const [civ, setCiv] = useState('')
  const [langEsp, setLangEsp] = useState(() => {
    const langEsp = JSON.parse(localStorage.getItem('langEsp'))
    if (langEsp === null) return true
    return langEsp
  })

  useEffect(() => {
    localStorage.setItem('langEsp', JSON.stringify(langEsp));
  }, [langEsp]);

  const handleSelectCiv = (value) => {
    setCiv(value)
  }

  const handleSwitchEsp = (event) => {
    setLangEsp(event.target.checked);
    window.location.reload()
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Box sx={{ mr: 2 }} edge="start">
            <img className='aoe3de-logo' src='/aoe3_de_logo.png' alt="logo aoe3de"></img>
          </Box>

          <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
            {translate('70846')}
          </Typography>

          <FormControlLabel 
            edge="end" 
            label={langEsp ? 'es' : 'en'} 
            control={
              <Switch color='warning' checked={langEsp} onChange={handleSwitchEsp} />
            } 
          />
        </Toolbar>
      </AppBar>

      <Container className="aoe3de-deck-creator-app">
        <CivSelector onSelectCiv={handleSelectCiv} />
        {civ ? 
          <CardsList homecity={civ} /> :
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <img className='flag-random' src='/resources/images/icons/flags/Flag_Random.png' alt="flag random" />
          </Box>
        }
      </Container>
    </Box>
  );
}

export default App;
