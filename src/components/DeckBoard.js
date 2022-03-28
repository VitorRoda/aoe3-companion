import './DeckBoard.css'
import React, { Fragment } from 'react'
import uniqid from 'uniqid'
import { CardList } from "./CardList";
import Box from '@mui/material/Box';
import html2canvas from 'html2canvas';
import IconButton from '@mui/material/IconButton';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

export function DeckBoard({ age1Cards, age2Cards, age3Cards, age4Cards, onClickCard }) {
  const handleOnClickCard = (card) => {
    onClickCard(card)
  }

  const printRef = React.useRef();

  const handleDownloadImage = async () => {
    const element = printRef.current;

    const canvas = await html2canvas(element, { width: 800 });

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'deck.jpg';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  const listCards = (cards, age) =>
    <Box
      className={`deck-board__age deck-board__age${age}`}
      sx={{
        minHeight: 72,
        pl: 8,
        py: 0.5,
        backgroundImage: `url(/resources/Age${age}.png)`
      }}>
      <CardList key={uniqid()} cards={cards} showInfo={false} onClickCard={handleOnClickCard}>
      </CardList>
    </Box>

  return (
    <Fragment>
      <Box textAlign="right">      
        <IconButton size="large" onClick={handleDownloadImage} sx={{ color: '#EBC837'}}>
          <DownloadForOfflineIcon />
        </IconButton>
      </Box>
      <div className='deck-board' ref={printRef}>
        {listCards(age1Cards, 1)}
        {listCards(age2Cards, 2)}
        {listCards(age3Cards, 3)}
        {listCards(age4Cards, 4)}
      </div>
    </Fragment>
  )
}
