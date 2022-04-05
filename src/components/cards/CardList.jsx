import React, { useCallback } from 'react'
import PropTypes from "prop-types";
import Box from '@mui/material/Box';
import { CardItem } from "./CardItem";

export const CardList = React.memo(({ cards, age, onClickCard }) => {
  const handleOnClickCard = useCallback((card) => {
    onClickCard(card)
  }, [])

  const singleAgeSx = {
    minHeight: 72,
    pl: 8.5,
    py: 1,
    backgroundImage: `url(/assets/Age${age}.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 70,
    backgroundPosition: 'left center',
    ':not(:last-child)': {
      borderBottom: '1px solid #EBC837'
    }
  }

  return (
    <Box className='cards-list' sx={age && singleAgeSx}>
      {cards.map(card =>
        <CardItem
          key={card.id}
          card={card}
          onClickCard={handleOnClickCard}>
        </CardItem>
      )}
    </Box>
  )
})

CardItem.propTypes = {
  cards: PropTypes.array,
  age: PropTypes.number,
  onClickCard: PropTypes.func
}

CardItem.defaultProps = {
  cards: [],
  age: null,
  onClickCard: () => { }
}