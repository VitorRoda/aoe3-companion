import './CardItem.css'
import React from 'react'
import PropTypes from "prop-types";
import Popper from '@mui/material/Popper'
import { usePopupState, bindHover, bindPopper } from 'material-ui-popup-state/hooks'
import Box from '@mui/material/Box';
import { CardInfo } from "./CardInfo";
import { Card } from "./Card";

export const CardItem = React.memo(function CardItem({ card, sm, onClickCard }) {
    const popupState = usePopupState({ variant: 'popover', popupId: `tooltip-${card.id}`, disableAutoFocus: true })

    const handleOnClick = () => {
        onClickCard(card)
    }

    return (
        <Box sx={{ margin: sm ? 0 : '4px' }} onClick={handleOnClick} {...bindHover(popupState)}>
            <Card
                name={card?.name}
                icon={card?.info?.icon}
                maxcount={+card?.maxcount}
                displayunitcount={card?.displayunitcount}
                isSelected={card?.isSelected}
                costs={card?.info?.cost || []}
                sm={sm}
            ></Card>

            <Popper {...bindPopper(popupState)}
                placement="top"
                modifiers={[{
                    name: 'flip',
                    enabled: true,
                    options: {
                        altBoundary: true,
                        rootBoundary: 'document',
                    },
                },
                {
                    name: 'preventOverflow',
                    enabled: true,
                    options: {
                        altAxis: true,
                        altBoundary: true,
                        rootBoundary: 'document',
                    },
                }]}
                sx={{ pointerEvents: 'none', zIndex: 100000000 }}
            >
                <CardInfo card={card}></CardInfo>
            </Popper>
        </Box>
    )
})

CardItem.propTypes = {
    card: PropTypes.object,
    onClickCard: PropTypes.func,
}

CardItem.defaultProps = {
    card: {},
    onClickCard: () => { }
}