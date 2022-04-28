import './DeckBoard.css'
import React, { useEffect, useRef, useState } from 'react'
import { paramCase } from 'change-case'
import html2canvas from 'html2canvas';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import CircularProgress from '@mui/material/CircularProgress';
import DownloadIcon from '@mui/icons-material/Download';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Typography } from '@mui/material';
import { CardList } from "./cards/CardList";
import { translate } from '../utils/translator';

export const DeckBoard = ({ civName, maxCards, selectedCards, hideRandomAction, onClickCard, onClickRandomDeck }) => {
  const [deckName, setDeckName] = useState('')
  const [generatedImg, setGeneratedImg] = useState('')
  const [isGeneratingImg, setIsGeneratingImg] = useState(false)
  const [showGeneratedImg, setShowGeneratedImg] = useState(false)
  const printRef = useRef();

  useEffect(() => {
    setDeckName('')
  }, [civName])

  const handleChangeDeckName = (event) => {
    setDeckName(event.target.value)
  }

  const handleOnClickCard = (card) => {
    onClickCard(card)
  }

  const handleShowPreview = async () => {
    const element = printRef.current;
    setIsGeneratingImg(() => true)
    const canvas = await html2canvas(element, {
      windowWidth: 925,
      width: 825,
      height: selectedCards?.age0?.length ? 492 : 403,
      useCORS: true
    });
    setIsGeneratingImg(() => false)
    setShowGeneratedImg(() => true)
    setGeneratedImg(() => canvas.toDataURL())
  };

  const handleDownloadImage = () => {
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

  const handleClosePreview = () => {
    setShowGeneratedImg(false)
  }

  const handleRandomDeck = () => {
    onClickRandomDeck()
  }

  return (
    <Box>
      <Box className='deckname-field' display="flex" justifyContent="center" mb={1}>
        <TextField
          id="deckname-text-field"
          variant="filled"
          label={translate('38236')}
          inputProps={{ maxLength: 20 }}
          value={deckName}
          onChange={handleChangeDeckName}
        />
      </Box>

      <Box className='deckboard-wrapper' sx={{ position: 'relative' }}>
        <Box className='global-counter-cards'>{`${selectedCards.total}/${maxCards}`}</Box>
        <Stack className='deckboard-actions' spacing={1}>
          <Box className='download-button' position="relative">
            <Fab color="primary" onClick={handleShowPreview} >
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
          </Box>

          {!hideRandomAction &&
            <Fab className='random-deck-button' color="primary" onClick={handleRandomDeck} >
              <WifiProtectedSetupIcon size="large" />
            </Fab>
          }
        </Stack>

        <Box className='deck-board' ref={printRef}>
          <Typography className='deck-name' variant='h6' color="text.primary">
            {deckName}
          </Typography>

          {!!selectedCards?.age0?.length &&
            <CardList cards={selectedCards.age0} age={0} onClickCard={handleOnClickCard}>
            </CardList>
          }
          <CardList cards={selectedCards.age1} age={1} onClickCard={handleOnClickCard}>
          </CardList>
          <CardList cards={selectedCards.age2} age={2} onClickCard={handleOnClickCard}>
          </CardList>
          <CardList cards={selectedCards.age3} age={3} onClickCard={handleOnClickCard}>
          </CardList>
          <CardList cards={selectedCards.age4} age={4} onClickCard={handleOnClickCard}>
          </CardList>
        </Box>
      </Box>

      <Dialog open={showGeneratedImg} onClose={handleClosePreview} maxWidth="md">
        <DialogContent>
          <img loading='lazy' src={generatedImg} alt="generateImg" width="100%" />
        </DialogContent>
        <DialogActions>
          <Fab color="primary" onClick={handleDownloadImage} ><DownloadIcon /></Fab>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
