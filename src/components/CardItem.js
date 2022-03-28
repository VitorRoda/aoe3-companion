import './CardItem.css'
import React from 'react'
import uniqid from 'uniqid'
import { CardTooltip } from "../components/CardTooltip";
import { CardInfo } from "../components/CardInfo";

export const CardItem = React.memo(({ card, showInfo = true, onClickCard }) => {
    const costsFilter = cost => cost?._resourcetype !== 'Ships'
    const hasCosts = card?.info?.cost?.some(costsFilter)

    const handleOnClick = () => { onClickCard(card) }
    const getResourceIcon = (type) => `/resources/resource_${type.toLowerCase()}.png`

    const cardCostIcons = (card) => card?.info?.cost
        .filter(costsFilter)
        .map(cost => (
            <img
                loading='lazy'
                src={getResourceIcon(cost?._resourcetype)}
                alt={cost?._resourcetype}
                key={uniqid()} />
        ))
    
    return (
        <CardTooltip
            showInfo={showInfo}
            title={<CardInfo card={card}></CardInfo>}
            placement="top"
            followCursor
            key={uniqid()}
            disableFocusListener
            disableTouchListener
        >
            <div className='card' onClick={handleOnClick}>
                <img loading='lazy' className='card__img' src={`/${card?.info?.icon?.toLowerCase()}`} alt={card?.name} />
                {card?.maxcount === '-1' && 
                    <div className='card__maxcount'>∞</div>}
                {+card?.maxcount > 1 && 
                    <div className='card__maxcount'>x{card?.maxcount}</div>}
                {!!+card?.displayunitcount && 
                    <div className='card__unit-count'>{card?.displayunitcount}</div>}
                {hasCosts && 
                    <div className='card__resources-cost'>{cardCostIcons(card)}</div>}

                {card?.isSelected && <img loading='lazy' className='card__check-icon' src={'/resources/hp_cp_check.png'} alt="check card"></img>}
            </div>
        </CardTooltip>
    )
})