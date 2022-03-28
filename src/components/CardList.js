import React, {useCallback} from 'react'
import uniqid from 'uniqid'
import { CardItem } from "./CardItem";

export function CardList({ cards, showInfo, onClickCard }) {
  const handleOnClickCard = useCallback((card) => {
    onClickCard(card)
  }, [])

  return (
    <div className='cards-list'>
      {cards.map(card =>
        <CardItem 
          key={uniqid()}
          card={card} 
          showInfo={showInfo}  
          onClickCard={handleOnClickCard}>
        </CardItem>
      )}
    </div>
  )
}