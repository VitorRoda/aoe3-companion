import React from 'react'

export const CardCosts = ({ costs }) => {
    const costsFilter = cost => cost?._resourcetype !== 'Ships'
    const getResourceIcon = (type) => `/resources/resource_${type.toLowerCase()}.png`

  return (
    <div className='card__resources-cost' hidden={!costs?.some(costsFilter)}>
        {costs
            .filter(costsFilter)
            .map(({ _resourcetype }, idx) => (
                <img
                    loading='lazy'
                    src={getResourceIcon(_resourcetype)}
                    alt={_resourcetype}
                    key={`cost-${_resourcetype}-${idx}`} />
            ))}
    </div>
  )
}
