import './CardInfo.css'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { translate } from '../../utils/translator';
import { getEffectsTranslations } from '../../utils/getEffectsTranslation';

export function CardInfo({ card, additionaldesc }) {
    let costs = card?.info?.cost || []
    costs = costs && Array.isArray(costs) ? costs : [costs]
    const costText = (card) => costs
        .filter(cost => cost?.['@resourcetype'] !== 'Ships')
        .map((cost, idx) => (
            <span key={`cost-info-${cost?.['@resourcetype']}-${idx}`}>
                {Math.round(cost?.['#text'])}
                <img loading='lazy'
                    className='card_resource-cost-icon'
                    src={`/assets/resource_${cost?.['@resourcetype']?.toLowerCase()}.png`}
                    alt={cost?.['@resourcetype']} />
            </span>
        )).reduce((accu, elem) => {
            return accu === null ? [elem] : [...accu, ', ', elem]
        }, null)

    const rollOverTextParsed = (text) => text.split('\\n')
        .map((item, idx) =>
            <Typography variant='body2' component="div" key={`${card.name}-info-rot-${idx}`}>
                {item.replace('•', '')}
            </Typography>)


    const displayName = translate(card?.info?.displaynameid)
    const rollOverText = translate(card?.info?.rollovertextid)
    const hasCosts = costs?.some(cost => cost?.['@resourcetype'] !== 'Ships') || false

    return (
        <Box className='card-info'>
            {!!displayName &&
                <Typography variant='subtitle1'>{displayName}</Typography>}
            {hasCosts &&
                <Typography variant='body2' component="div">• {costText()}</Typography>}
            {!!additionaldesc && <Typography variant='body2' component="div" key={`${card.name}-additional-desc`}>
                {translate(additionaldesc)}
            </Typography>}
            {!!rollOverText &&
                rollOverTextParsed(rollOverText)}
            {card?.info?.effects?.effect?.length &&
                getEffectsTranslations(card?.info?.effects?.effect)
                    .map((item, idx) =>
                        <Typography variant='body2' component="div" key={`${card.name}-info-effect-${idx}`}>
                            • {item}
                        </Typography>
                    )}
        </Box>
    )
}
