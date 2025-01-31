import './App.css'
import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useGaTracker } from "./utils/useGaTracker";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { DeckBuilder } from "./pages/DeckBuilder";
import { UnitsInfo } from "./pages/UnitsInfo";
import { getCivs } from './services/civs.service';
import { LeaderBoard } from './pages/LeaderBoard';


const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#EBC837',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#170803',
      paper: '#532412',
    },
  },
  typography: {
    h1: { fontFamily: 'TrajanPro', fontWeight: 'bold' },
    h2: { fontFamily: 'TrajanPro', fontWeight: 'bold' },
    h3: { fontFamily: 'TrajanPro', fontWeight: 'bold' },
    h4: { fontFamily: 'TrajanPro', fontWeight: 'bold' },
    h5: { fontFamily: 'TrajanPro', fontWeight: 'bold' },
    h6: { fontFamily: 'TrajanPro', fontWeight: 'bold' },
    subtitle1: { fontFamily: 'TrajanPro' },
    subtitle2: { fontFamily: 'TrajanPro' },
  }
})

function App() {
  useGaTracker()
  const [civs, setCivs] = useState([])

  useEffect(() => {
    setCivs(() => getCivs())
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Header></Header>

        <Container sx={{ py: 4, minHeight: 'calc(100vh - 68px - 78px)' }}>
          <Routes>
            <Route path='/' element={<LeaderBoard />} />
            <Route path='/deck-builder' element={<DeckBuilder civs={civs} />} />
            <Route path='/units' element={<UnitsInfo />}>
              <Route path=':unitId' />
            </Route>
          </Routes>
        </Container>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
