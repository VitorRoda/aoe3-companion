import React from 'react'
import PropTypes from "prop-types";
import Box from '@mui/material/Box';
import { CardItem } from "./CardItem";
import { CardGroup } from './CardGroup';

export const CardList = React.memo(function CardList({ cards, age, onClickCard }) {
  const handleOnClickCard = (card) => {
    onClickCard(card)
  }

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
    <Box className='cards-list' sx={age >= 0 ? singleAgeSx : {}}>
      {cards.map(card =>
        !card.isGroup
          ? <CardItem
            key={card.id}
            card={card}
            onClickCard={handleOnClickCard}>
          </CardItem>
          : <CardGroup key={card._name} group={card} onClick={handleOnClickCard} />

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