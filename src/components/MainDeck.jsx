import './MainDeck.css'
import React, { useCallback, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabsMui from '@mui/material/Tabs';
import { translate } from '../utils/translator';
import { CardList } from './cards/CardList';

export const MainDeck = React.memo(({ cards, showFederalCards, onClickCard }) => {
	const [tabValue, setTabValue] = useState(0)

	useEffect(() => {
		setTabValue(0)
		console.log(showFederalCards)
	}, [showFederalCards])

	const handleTabChange = useCallback((event, newValue) => {
		setTabValue(() => newValue);
	}, []);

	const handleOnClickCard = (card) => {
		onClickCard(card)
	}

	const Tabs = styled(TabsMui)({
		borderBottom: '1px solid #EBC837',
		'& .MuiTabs-indicator': {
		  backgroundColor: '#EBC837',
		},
		'& .MuiTab-root': {
			color: '#EBC837',
			fontWeight: 'bold',
			fontFamily: 'TrajanPro',
			textTransform: 'none'
		},
		'& .MuiTab-root.Mui-selected': {
			backgroundImage: 'linear-gradient(to right, #EBC837, #FFEB8B)',
			color: '#000'
		}
	})

	return (
		<Box>
			<Tabs value={tabValue} variant="scrollable" scrollButtons="auto" onChange={handleTabChange}>
				<Tab label={<img width="20" src='/assets/Age0.png' alt='age0'></img>} value={0} />
				<Tab label={translate('19156')} value={1} />
				<Tab label={translate('34352')} value={2} />
				<Tab label={translate('18969')} value={3} />
				<Tab label={translate('110265').replace(':', '')} value={4} disabled={!showFederalCards} />
			</Tabs>

			<Box className='deck-panel__container' hidden={tabValue !== 0}>
				{!!cards.age1.length && <CardList cards={cards.age1} onClickCard={handleOnClickCard}></CardList>}
			</Box>
			<Box className='deck-panel__container' hidden={tabValue !== 1}>
				{!!cards.age2.length && <CardList cards={cards.age2} onClickCard={handleOnClickCard}></CardList>}
			</Box>
			<Box className='deck-panel__container' hidden={tabValue !== 2}>
				{!!cards.age3.length && <CardList cards={cards.age3} onClickCard={handleOnClickCard}></CardList>}
			</Box>
			<Box className='deck-panel__container' hidden={tabValue !== 3}>
				{!!cards.age4.length && <CardList cards={cards.age4} onClickCard={handleOnClickCard}></CardList>}
			</Box>
			<Box className='deck-panel__container' hidden={tabValue !== 4}>
				{!!cards?.age0?.length && <CardList cards={cards.age0} onClickCard={handleOnClickCard}></CardList>}
			</Box>
		</Box>
	)
})