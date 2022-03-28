import React from 'react'
import uniqid from 'uniqid'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { translate } from '../utils/translator';
import { getEffectsTranslations } from '../utils/getEffectsTranslation';

export function CardInfo({ card }) {
    const costText = (card) => card?.info?.cost
        .filter(cost => cost?._resourcetype !== 'Ships')
        .map((cost) => (
            <span key={uniqid()}>
                {Math.round(cost?.__text)} 
                <img loading='lazy'
                    className='card_resource-cost-icon'
                    src={`/resources/resource_${cost?._resourcetype?.toLowerCase()}.png`}
                    alt={cost?._resourcetype} />
            </span>
        )).reduce((accu, elem) => {
            return accu === null ? [elem] : [...accu, ', ', elem]
        }, null)

    const rollOverTextParsed = (text) => text.split('\\n')
        .map((item) => <Typography variant='body2' component="div" key={uniqid()}>• {item.replace('•', '')}</Typography>)


    const displayName = translate(card?.info?.displaynameid)
    const rollOverText = translate(card?.info?.rollovertextid)
    const hasCosts = card?.info?.cost?.some(cost => cost?._resourcetype !== 'Ships')

    return (
        <Box>
            {!!displayName && 
                <Typography variant='subtitle1'>{displayName}</Typography>}
            {hasCosts && 
                <Typography variant='body2' component="div">• {costText(card)}</Typography>}
            {!!rollOverText && 
                rollOverTextParsed(rollOverText)}
            {card?.info?.effects?.effect?.length && 
                getEffectsTranslations(card?.info?.effects?.effect)
                    .map((item, idx) => 
                        <Typography variant='body2' component="div" key={uniqid()}>
                            • {item}
                        </Typography>
            )}
        </Box>
    )
}
