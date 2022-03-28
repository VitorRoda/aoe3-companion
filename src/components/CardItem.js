import './CardItem.css'
import React, { useCallback } from 'react'
import PropTypes from "prop-types";
import uniqid from 'uniqid'
import HoverPopover from 'material-ui-popup-state/HoverPopover'
import PopupState, { bindHover, bindPopover } from 'material-ui-popup-state'
import { popoverClasses } from '@mui/material/Popover';
import Box from '@mui/material/Box';
import { CardInfo } from "../components/CardInfo";
import { Card } from "../components/Card";

export const CardItem = React.memo(({ card, showInfo, onClickCard }) => {
    const handleOnClick = useCallback(() => {
        onClickCard(card)
    }, [])

    return (
        <PopupState variant="popover" popupId={`tooltip-${card.id}-${uniqid()}`} disableAutoFocus>
            {(popupState) => <Box sx={{ margin: '4px' }} onClick={handleOnClick} {...bindHover(popupState)}>
                <Card
                    name={card?.name}
                    icon={card?.info?.icon}
                    maxcount={+card?.maxcount}
                    displayunitcount={card?.displayunitcount}
                    isSelected={card?.isSelected}
                    costs={card?.info?.cost}
                ></Card>

                {showInfo &&
                    <HoverPopover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        sx={{
                            [`& .${popoverClasses.paper}`]: {
                                px: 2,
                                py: 1,
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                color: 'white',
                                maxWidth: 500,
                                pointerEvents: 'none !important',
                            }
                        }}
                    >
                        <CardInfo card={card}></CardInfo>
                    </HoverPopover>
                }
            </Box>}
        </PopupState>
    )
})

CardItem.propTypes = {
    card: PropTypes.object,
    showInfo: PropTypes.bool,
    onClickCard: PropTypes.func,
}

CardItem.defaultProps = {
    card: {},
    showInfo: true,
    onClickCard: () => { }
}