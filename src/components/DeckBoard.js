import './DeckBoard.css'
import React, { useCallback, useState } from 'react'
import uniqid from 'uniqid'
import html2canvas from 'html2canvas';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Download from '@mui/icons-material/Download';
import CircularProgress from '@mui/material/CircularProgress';
import { CardList } from "./CardList";

export const DeckBoard = (({ civName, maxCards, selectedCards, onClickCard }) => {
  const [isGeneratingImg, setIsGeneratingImg] = useState(false)
  const printRef = React.useRef();

  const handleOnClickCard = useCallback((card) => {
    onClickCard(card)
  }, [])

  const handleDownloadImage = useCallback(async () => {
    const element = printRef.current;
    setIsGeneratingImg(() => true)
    const canvas = await html2canvas(element, { windowWidth: 900, width: 800, height: 387 });
    setIsGeneratingImg(() => false)
    const data = canvas.toDataURL();
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = `${civName.toLowerCase()}-deck-${uniqid()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  }, []);

  return (
    <Box>
      <div className='global-counter-cards'>{`${selectedCards.total}/${maxCards}`}</div>
      <div className='download-button'>
        <Fab onClick={handleDownloadImage} sx={{
          bgcolor: '#EBC837',
          '&:hover': {
            bgcolor: '#FFEB8B',
          }
        }}>
          <Download size="large" />
        </Fab>

        {isGeneratingImg && (
          <CircularProgress
            size={68}
            sx={{
              color: green[500],
              position: 'absolute',
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </div>
      <div className='deck-board' ref={printRef}>
        <CardList cards={selectedCards.age1} age={1} onClickCard={handleOnClickCard}>
        </CardList>
        <CardList cards={selectedCards.age2} age={2} onClickCard={handleOnClickCard}>
        </CardList>
        <CardList cards={selectedCards.age3} age={3} onClickCard={handleOnClickCard}>
        </CardList>
        <CardList cards={selectedCards.age4} age={4} onClickCard={handleOnClickCard}>
        </CardList>
      </div>
    </Box>
  )
})
