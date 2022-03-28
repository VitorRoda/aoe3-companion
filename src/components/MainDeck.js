import './MainDeck.css'
import React, { useCallback, useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabsMui from '@mui/material/Tabs';
import { translate } from '../utils/translator';
import { CardList } from './CardList';

export const MainDeck = React.memo(({ cardsAge1, cardsAge2, cardsAge3, cardsAge4, onClickCard }) => {
	const [tabValue, setTabValue] = useState(0)

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	const handleOnClickCard = useCallback((card) => {
		onClickCard(card)
	}, [])

	const Tabs = styled(TabsMui)({
		borderBottom: '1px solid #EBC837',
		'& .MuiTabs-indicator': {
		  backgroundColor: '#EBC837',
		},
		'& .MuiTab-root': {
			color: '#EBC837',
			fontWeight: 'bold'
		},
		'& .MuiTab-root.Mui-selected': {
			backgroundImage: 'linear-gradient(to right, #EBC837, #FFEB8B)',
			color: '#000'
		}
	})

	return (
		<Box>
			<Tabs value={tabValue} onChange={handleTabChange}>
				<Tab label={translate('18966')} />
				<Tab label={translate('19156')} />
				<Tab label={translate('34352')} />
				<Tab label={translate('18969')} />
			</Tabs>
			<Box className='deck-panel__container' hidden={tabValue !== 0}>
				{cardsAge1.length && <CardList cards={cardsAge1} onClickCard={handleOnClickCard}></CardList>}
			</Box>
			<Box className='deck-panel__container' hidden={tabValue !== 1}>
				{cardsAge2.length && <CardList cards={cardsAge2} onClickCard={handleOnClickCard}></CardList>}
			</Box>
			<Box className='deck-panel__container' hidden={tabValue !== 2}>
				{cardsAge3.length && <CardList cards={cardsAge3} onClickCard={handleOnClickCard}></CardList>}
			</Box>
			<Box className='deck-panel__container' hidden={tabValue !== 3}>
				{cardsAge4.length && <CardList cards={cardsAge4} onClickCard={handleOnClickCard}></CardList>}
			</Box>
		</Box>
	)
})