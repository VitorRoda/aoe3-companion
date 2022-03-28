import './DeckBoard.css'
import React from 'react'
import uniqid from 'uniqid'
import { CardList } from "./CardList";
import Box from '@mui/material/Box';

export function DeckBoard({ age1Cards, age2Cards, age3Cards, age4Cards, onClickCard }) {
	const handleOnClickCard = (card) => {
		onClickCard(card)
	}

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
    <div className='deck-board'>
      {listCards(age1Cards, 1)}
      {listCards(age2Cards, 2)}
      {listCards(age3Cards, 3)}
      {listCards(age4Cards, 4)}
    </div>
  )
}
