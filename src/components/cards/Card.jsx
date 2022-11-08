import './Card.css'
import React from 'react'
import { CardCosts } from "./CardCosts";
import { ImgFS } from '../ImgFS';

export const Card = React.memo(function Card({
    name, icon, maxcount, displayunitcount, isSelected, costs, sm
}) {
    return (
        <div className={`card ${sm && 'sm'}`}>
            <ImgFS className='card__img' path={icon} alt={name} lowerCase={true} />
            {maxcount === -1 &&
                <div className='card__maxcount'>∞</div>}
            {maxcount > 1 &&
                <div className='card__maxcount'>x{maxcount}</div>}
            {+displayunitcount > 0 &&
                <div className='card__unit-count'>{displayunitcount}</div>}
            {!sm && <CardCosts costs={costs && Array.isArray(costs) ? costs : [costs]}></CardCosts>}

            {isSelected && <img loading='lazy' className='card__check-icon' src={'/assets/hp_cp_check.png'} alt="check card"></img>}
        </div>
    )
})