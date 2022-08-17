import React from 'react'

export const CardCosts = ({ costs }) => {
  const costsFilter = cost => cost?.['@resourcetype'] !== 'Ships'
  const getResourceIcon = (type) => `/assets/resource_${type.toLowerCase()}.png`

  return (
    <div className='card__resources-cost' hidden={!costs?.some(costsFilter)}>
      {costs
        .filter(costsFilter)
        .map((item, idx) => (
          <img
            loading='lazy'
            src={getResourceIcon(item['@resourcetype'])}
            alt={item['@resourcetype']}
            key={`cost-${item['@resourcetype']}-${idx}`} />
        ))}
    </div>
  )
}
