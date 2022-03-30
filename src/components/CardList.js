import React, {useCallback} from 'react'
import uniqid from 'uniqid'
import { CardItem } from "./CardItem";

export const CardList = React.memo(({ cards, onClickCard }) => {
  const handleOnClickCard = useCallback((card) => {
    onClickCard(card)
  }, [])

  return (
    <div className='cards-list'>
      {cards.map(card =>
        <CardItem 
          key={uniqid()}
          card={card} 
          onClickCard={handleOnClickCard}>
        </CardItem>
      )}
    </div>
  )
})