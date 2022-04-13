import './DeckBoard.css'
import React, { useCallback, useEffect, useState } from 'react'
import { paramCase } from 'change-case'
import html2canvas from 'html2canvas';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import DownloadIcon from '@mui/icons-material/Download';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Typography } from '@mui/material';
import { CardList } from "./cards/CardList";
import { translate } from '../utils/translator';

export const DeckBoard = ({ civName, maxCards, selectedCards, onClickCard }) => {
  const [deckName, setDeckName] = useState('')
  const [generatedImg, setGeneratedImg] = useState('')
  const [isGeneratingImg, setIsGeneratingImg] = useState(false)
  const [showGeneratedImg, setShowGeneratedImg] = useState(false)
  const printRef = React.useRef();

  useEffect(() => {
    setDeckName('')
  }, [civName])

  const handleOnClickCard = (card) => {
    onClickCard(card)
  }

  const handleShowImage = useCallback(async () => {
    const element = printRef.current;
    setIsGeneratingImg(() => true)
    const canvas = await html2canvas(element, {
      windowWidth: 925,
      width: 825,
      height: 403,

    });
    setIsGeneratingImg(() => false)
    setShowGeneratedImg(() => true)
    setGeneratedImg(() => canvas.toDataURL())

  }, [civName]);

  const handleDownloadImage =  () => {
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = generatedImg;
      link.download = `${civName.toLowerCase()}-${paramCase(deckName) || 'deck'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(generatedImg);
    }
  }

  const handleClose = () => {
    setShowGeneratedImg(false)
  }

  const handleChangeDeckName = (event) => {
    setDeckName(event.target.value)
  }

  return (
    <Box>
      <Box className='deckname-field' display="flex" justifyContent="center" mb={1}>
        <TextField
          id="deckname-text-field"
          variant="filled"
          label={translate('38236')}
          inputProps={{
            maxLength: 20
          }}
          value={deckName}
          onChange={handleChangeDeckName}
        />
      </Box>

      <Box className='deckboard-wrapper' sx={{ position: 'relative' }}>
        <div className='global-counter-cards'>{`${selectedCards.total}/${maxCards}`}</div>
        <div className='download-button'>
          <Fab onClick={handleShowImage} color="primary">
            <PhotoCameraIcon size="large" />
          </Fab>

          {isGeneratingImg && (
            <CircularProgress
              size={68}
              color="success"
              sx={{
                position: 'absolute',
                top: -6,
                left: -6,
                zIndex: 1,
              }}
            />
          )}
        </div>
        <div className='deck-board' ref={printRef}>
          <Typography className='deck-name' variant='h5' color="primary">{deckName}</Typography>
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

      <Dialog open={showGeneratedImg} onClose={handleClose} maxWidth="md">
        <DialogContent>
          <img src={generatedImg} alt="generateImg" width="100%" />
        </DialogContent>
        <DialogActions>
          <Fab color="primary" onClick={handleDownloadImage} ><DownloadIcon /></Fab>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
