import './DeckBoard.css'
import React, { useState } from 'react'
import uniqid from 'uniqid'
import html2canvas from 'html2canvas';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Download from '@mui/icons-material/Download';
import CircularProgress from '@mui/material/CircularProgress';
import { CardList } from "./CardList";

export function DeckBoard({ civName, maxCards, selectedCards, onClickCard }) {
  const [isGeneratingImg, setIsGeneratingImg] = useState(false)
  const handleOnClickCard = (card) => {
    onClickCard(card)
  }

  const printRef = React.useRef();

  const handleDownloadImage = async () => {
    const element = printRef.current;
    setIsGeneratingImg(true)
    const canvas = await html2canvas(element, { windowWidth: 900, width: 800, height: 355 });
    setIsGeneratingImg(false)
    const data = canvas.toDataURL('image/png');
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
  };

  const listCards = (age) =>
    <Box
      className={`deck-board__age deck-board__age${age}`}
      sx={{
        minHeight: 72,
        pl: 8,
        py: 0.5,
        backgroundImage: `url(/resources/Age${age}.png)`
      }}>
      <CardList key={uniqid()} cards={selectedCards[`age${age}`]} onClickCard={handleOnClickCard}>
      </CardList>
    </Box>

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
        {listCards(1)}
        {listCards(2)}
        {listCards(3)}
        {listCards(4)}
      </div>
    </Box>
  )
}
