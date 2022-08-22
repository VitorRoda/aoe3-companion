import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react'
import { useImmerReducer } from 'use-immer';
import uniqueRandomRange from "unique-random-range";
import { Container } from '@mui/material';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack';
import { cardsReducer, cardsInitialState } from "../reducers/cards.reducer";
import { selectedCardsReducer, selectedCardsInitialState } from "../reducers/selectedCards.reducer";
import { DeckBoard } from "../components/DeckBoard";
import { MainDeck } from "../components/MainDeck";
import { getHomeCityData, getRevoltCards } from "../services/homecity.service";
import { translate } from '../utils/translator';
import { randomSumGenerator } from '../utils/randomSum';
import { CivSelector } from '../components/CivSelector';
import { getStorageURL } from '../utils/getStorageURL';
import { RevoltSelector } from '../components/RevoltSelector';
import { TechtreeDialog } from '../components/techtree/TechtreeDialog';

export const DeckBuilder = ({ civs }) => {
    const [civ, setCiv] = useState('')
    const [revolt, setRevolt] = useState('')
    const [revolts, setRevolts] = useState([])
    const [maxCards, setMaxCards] = useState(25)
    const [cards, dispatchCards] = useImmerReducer(cardsReducer, cardsInitialState)
    const [selectedCards, dispatchSelectedCards] = useImmerReducer(selectedCardsReducer, selectedCardsInitialState)
    const [revoltCards, setRevoltCards] = useState(selectedCardsInitialState)
    const maxCardsRef = useRef(maxCards)
    const selectedCardsRef = useRef(selectedCards)

    const handleSelectCiv = (value) => {
        setCiv(() => value)
    }

    const handleSelectRevolt = (value) => {
        setRevolt(() => value)
    }

    const handleRandomCiv = () => {
        const randomIdx = uniqueRandomRange(0, civs.length)()
        setCiv(civs[randomIdx])
    }

    useEffect(() => {
        if (revolt) {
            getRevoltCards(civ.homecityfilename, revolt.name, revolt.cards.card)
                .then(data => { setRevoltCards(data) })
        } else {
            setRevoltCards(selectedCardsInitialState)
        }
    }, [revolt])

    useEffect(() => {
        setRevolt('')
        setRevolts([])
        dispatchSelectedCards({ type: 'reset' })

        if (civ) {
            const [age0Key] = civ?.agetech

            getHomeCityData(civ.homecityfilename, age0Key.tech).then(data => {
                dispatchCards({ type: 'update', data: data.cards })
                setMaxCards(() => +data.maxcardsperdeck)
                setRevolts(data?.revolts)
            })
        } else {
            dispatchCards({ type: 'reset' })
        }
    }, [civ, dispatchCards, dispatchSelectedCards])

    useEffect(() => {
        maxCardsRef.current = maxCards
        selectedCardsRef.current = selectedCards
    }, [maxCards, selectedCards])

    const handleOnClickCard = useCallback((card) => {
        const { id, ageKey } = card
        const ageCount = selectedCardsRef.current[`${ageKey}Count`]
        const total = selectedCardsRef.current.total

        if (
            (ageKey !== 'age0' && !card.isSelected && (ageCount < 10 && total < maxCardsRef.current)) ||
            (ageKey === 'age0' && !card.isSelected && ageCount < 10)
        ) {
            dispatchSelectedCards({ type: 'addCard', card })
        } else if (card.isSelected) {
            dispatchSelectedCards({ type: 'removeCard', id, ageKey })
        }

        if (
            ((ageKey !== 'age0' && !card.isSelected && ageCount < 10 && total < maxCardsRef.current) || card.isSelected) ||
            ((ageKey === 'age0' && !card.isSelected && ageCount < 10) || card.isSelected)
        ) {
            dispatchCards({ type: 'toggleSelected', id, ageKey })
        }
    }, [dispatchCards, dispatchSelectedCards])

    const handleOnClickGroupCards = useCallback((group) => {
        if (!group.isSelected)
            dispatchSelectedCards({ type: 'addPoliticianCards', group })
        else
            dispatchSelectedCards({ type: 'removePoliticianCards', idG: group?.['@name'] })
        dispatchCards({ type: 'toggleSelectedPoliticanCards', idG: group?.['@name'] })
    }, [dispatchSelectedCards, dispatchCards])

    const handleOnClickDeckCard = (card) => {
        if (revolt) return

        if (card?.isGroup) {
            dispatchSelectedCards({ type: 'removePoliticianCards', idG: card?.['@name'] })
            dispatchCards({ type: 'toggleSelectedPoliticanCards', idG: card?.['@name'] })
            return
        }

        const { id, ageKey } = card
        dispatchSelectedCards({ type: 'removeCard', id, ageKey })
        dispatchCards({ type: 'toggleSelected', id, ageKey })
    }

    const handleRandomDeck = () => {
        dispatchSelectedCards({ type: 'reset' })
        dispatchCards({ type: 'unSelectAll' })
        const randomCountSelected = randomSumGenerator(4, maxCards)
        const selections = randomCountSelected.map((count, idx) => {
            const ageKey = `age${idx + 1}`
            const randomIdx = uniqueRandomRange(0, cards[ageKey].length - 1)
            let arr = []
            for (let index = 0; index < count; index++) {
                const cardIdx = randomIdx()
                arr.push({
                    idx: cardIdx, card: {
                        ...cards[ageKey][cardIdx],
                        isSelected: false
                    }
                })
            }

            return arr
        })

        dispatchCards({ type: 'batchSelected', selections })
        dispatchSelectedCards({ type: 'addBatch', cards: selections })
    }

    return (
        <Box>
            <Container disableGutters sx={{ display: 'flex', justifyContent: 'center' }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} sx={{ mb: 1 }}>
                    <CivSelector selectedCiv={civ} civs={civs} onSelectCiv={handleSelectCiv} />
                    {!!revolts.length && <RevoltSelector revolts={revolts} selectedRevolt={revolt} onSelectRevolt={handleSelectRevolt} />}
                </Stack>
                {civ && <TechtreeDialog civ={civ.name} />}
            </Container>

            {civ ?
                <Fragment>
                    <DeckBoard
                        civName={translate(civ.displaynameid)}
                        maxCards={maxCards}
                        selectedCards={revolt ? revoltCards : selectedCards}
                        hideRandomAction={!!revolt}
                        onClickCard={handleOnClickDeckCard}
                        onClickRandomDeck={handleRandomDeck}
                    ></DeckBoard>

                    {!revolt &&
                        <MainDeck
                            cards={cards}
                            showFederalCards={!!cards?.age0?.length}
                            onClickCard={handleOnClickCard}
                            onClickGroupCards={handleOnClickGroupCards}
                        />}
                </Fragment>
                :
                <Box sx={{ py: 4, textAlign: 'center' }}>
                    <img
                        loading='lazy'
                        className='flag-random'
                        src={getStorageURL('resources/images/icons/flags/Flag_Random.png', false)}
                        alt="flag random"
                        onClick={handleRandomCiv}
                    />
                </Box>
            }
        </Box>
    )
}
