import './CardsList.css'
import React, { useState, useEffect } from 'react'
import uniqid from 'uniqid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { getTechInfo } from "../utils/getTechInfo";
import { translate } from '../utils/translator';

const CardTooltip = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(() => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: 'rgba(0, 0, 0, 0.9)',
		color: 'white',
		maxWith: 500,
		width: '100%'
	},
}));

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
			setCardsAge1(cards.filter(card => +card?.age === 0))
			setCardsAge2(cards.filter(card => +card?.age === 1))
			setCardsAge3(cards.filter(card => +card?.age === 2))
			setCardsAge4(cards.filter(card => +card?.age === 3))
		})
	}, [homecity])

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	const costText = (card) => card?.info?.cost
		.filter(cost => cost?._resourcetype !== 'Ships')
		.map(cost => (
			<span key={uniqid()}>
				{Math.round(cost?.__text)} <img loading='lazy'
					className='card_resource-cost-icon'
					src={`/resources/resource_${cost?._resourcetype?.toLowerCase()}.png`}
					alt={cost?._resourcetype} />
			</span>
		)).reduce((accu, elem) => {
			return accu === null ? [elem] : [...accu, ', ', elem]
		}, null)

	const rollOverTextParsed = (text) => text.split('\\n')
		.map(item => <Typography variant='body2' component="div" key={uniqid()}>• {item.replace('•', '')}</Typography>)

	const cardInfoText = (card) => {
		const displayName = translate(card?.info?.displaynameid)
		const rollOverText = translate(card?.info?.rollovertextid)
		const hasCosts = card?.info?.cost?.some(cost => cost?._resourcetype !== 'Ships')

		return (
			<Box>
				{!!displayName && <Typography variant='subtitle1'>{displayName}</Typography>}
				{hasCosts && <Typography variant='body2' component="div">• {costText(card)}</Typography>}
				{!!rollOverText && rollOverTextParsed(rollOverText)}
			</Box>
		)
	}

	const cardCostIcons = (card) => card?.info?.cost
		.filter(cost => cost?._resourcetype !== 'Ships')
		.map(cost => (
			<img
				loading='lazy'
				src={`/resources/resource_${cost?._resourcetype?.toLowerCase()}.png`}
				alt={cost?._resourcetype}
				key={uniqid()} />
		))

	const cardItems = (cards) => cards
		.filter(card => !!card?.info && !card?.hasOwnProperty('revoltcard'))
		.map(card => {
			return (
				<CardTooltip
					title={cardInfoText(card)}
					placement="top"
					followCursor
					key={uniqid()}
				>
					<div className='card'>
						<img loading='lazy' className='card__img' src={`/${card?.info?.icon}`} alt={card?.name} />

						{card?.maxcount === '-1' && <div className='card__maxcount'>∞</div>}
						{+card?.maxcount > 1 && <div className='card__maxcount'>x{card?.maxcount}</div>}
						{!!+card?.displayunitcount && <div className='card__unit-count'>{card?.displayunitcount}</div>}
						{card?.info?.cost?.some(cost => cost?._resourcetype !== 'Ships') && <div className='card__resources-cost'>{cardCostIcons(card)}</div>}
					</div>
				</CardTooltip>
			)
		})

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
			<TabPanel value="1">
				<div className='cards'>
					{cardItems(cardsAge1)}
				</div>
			</TabPanel>
			<TabPanel value="2">
				<div className='cards'>
					{cardItems(cardsAge2)}
				</div>
			</TabPanel>
			<TabPanel value="3">
				<div className='cards'>
					{cardItems(cardsAge3)}
				</div>
			</TabPanel>
			<TabPanel value="4">
				<div className='cards'>
					{cardItems(cardsAge4)}
				</div>
			</TabPanel>
		</TabContext>
	)
}


