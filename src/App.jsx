import './App.css'
import { useCallback, useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { DeckBuilder } from "./pages/DeckBuilder";
import { UnitsInfo } from "./pages/UnitsInfo";

function App() {
  const [civs, setCivs] = useState([])
  const [civ, setCiv] = useState('')

  useEffect(() => {
    import('./data/civs.json').then(({ civ }) => {
      setCivs(() => civ)
    })
  }, [])

  const handleSelectCiv = useCallback((value) => {
    setCiv(() => value)
  }, [])

  return (
    <Box sx={{ pb: '64px' }}>
      <Header civs={civs} onSelectCiv={handleSelectCiv}></Header>

      <Container sx={{ py: 4 }}>
        <Routes>
          <Route path='/' element={<DeckBuilder civ={civ} />} />
          <Route path='/units' element={<UnitsInfo civ={civ} />} />
        </Routes>
      </Container>

      <Footer />
    </Box>
  );
}

export default App;
