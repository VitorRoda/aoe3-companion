import React from 'react'
import uniqid from 'uniqid';
import { CardTooltip } from "../components/CardTooltip";
import { CardInfo } from "../components/CardInfo";

export function CardItem({ card }) {
    const cardCostIcons = (card) => card?.info?.cost
        .filter(cost => cost?._resourcetype !== 'Ships')
        .map(cost => (
            <img
                loading='lazy'
                src={`/resources/resource_${cost?._resourcetype?.toLowerCase()}.png`}
                alt={cost?._resourcetype}
                key={uniqid()} />
        ))

    return (
        <CardTooltip
            title={<CardInfo card={card}></CardInfo>}
            placement="top"
            followCursor
            key={uniqid()}
        >
            <div className='card'>
                <img loading='lazy' className='card__img' src={`/${card?.info?.icon?.toLowerCase()}`} alt={card?.name} />
                {card?.maxcount === '-1' && <div className='card__maxcount'>∞</div>}
                {+card?.maxcount > 1 && <div className='card__maxcount'>x{card?.maxcount}</div>}
                {!!+card?.displayunitcount && <div className='card__unit-count'>{card?.displayunitcount}</div>}
                {card?.info?.cost?.some(cost => cost?._resourcetype !== 'Ships') && <div className='card__resources-cost'>{cardCostIcons(card)}</div>}
            </div>
        </CardTooltip>
    )
}
