import React from 'react'
import uniqid from 'uniqid'

export const CardCosts = ({ costs }) => {
    const costsFilter = cost => cost?._resourcetype !== 'Ships'
    const getResourceIcon = (type) => `/resources/resource_${type.toLowerCase()}.png`

  return (
    <div className='card__resources-cost' hidden={!costs?.some(costsFilter)}>
        {costs
            .filter(costsFilter)
            .map(cost => (
                <img
                    loading='lazy'
                    src={getResourceIcon(cost?._resourcetype)}
                    alt={cost?._resourcetype}
                    key={uniqid()} />
            ))}
    </div>
  )
}
