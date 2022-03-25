import './CardsList.css'
import React, { useState, useEffect } from 'react'
import uniqid from 'uniqid';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { getTechInfo } from "../utils/getTechInfo";
import { translate } from '../utils/translator';
import { CardItem } from "./CardItem";

export function CardsList({ homecity }) {
	const [tabValue, setTabValue] = useState('1')
	const [cardsAge1, setCardsAge1] = useState([])
	const [cardsAge2, setCardsAge2] = useState([])
	const [cardsAge3, setCardsAge3] = useState([])
	const [cardsAge4, setCardsAge4] = useState([])

	useEffect(() => {
		if (!homecity) return

		import(`../data/homecities/${homecity}.json`).then(data => {
			const cards = data?.cards?.card?.map(card => ({
				...card,
				info: getTechInfo(card.name)
			}))
			const filterCards = (card, age) => +card?.age === age && !!card?.info && !card?.hasOwnProperty('revoltcard')
			setCardsAge1(cards.filter(card => filterCards(card, 0)))
			setCardsAge2(cards.filter(card => filterCards(card, 1)))
			setCardsAge3(cards.filter(card => filterCards(card, 2)))
			setCardsAge4(cards.filter(card => filterCards(card, 3)))
		})
	}, [homecity])

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	return (
		<TabContext value={tabValue}>
			<Box>
				<TabList onChange={handleTabChange} aria-label="lab API tabs example">
					<Tab label={translate('18966')} value="1" />
					<Tab label={translate('19156')} value="2" />
					<Tab label={translate('34352')} value="3" />
					<Tab label={translate('18969')} value="4" />
				</TabList>
			</Box>
			<TabPanel className='card-selector__container' value="1">
				{cardsAge1.length &&
					<div className='cards'>
						{cardsAge1.map(card => <CardItem card={card} key={uniqid()}></CardItem>)}
					</div>
				}
			</TabPanel>
			<TabPanel className='card-selector__container' value="2">
				{cardsAge2.length &&
					<div className='cards'>
						{cardsAge2.map(card => <CardItem card={card} key={uniqid()}></CardItem>)}
					</div>
				}
			</TabPanel>
			<TabPanel className='card-selector__container' value="3">
				{cardsAge3.length &&
					<div className='cards'>
						{cardsAge3.map(card => <CardItem card={card} key={uniqid()}></CardItem>)}
					</div>
				}
			</TabPanel>
			<TabPanel className='card-selector__container' value="4">
				{cardsAge4.length &&
					<div className='cards'>
						{cardsAge4.map(card => <CardItem card={card} key={uniqid()}></CardItem>)}
					</div>
				}
			</TabPanel>
		</TabContext>
	)
}


