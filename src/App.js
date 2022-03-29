import './App.css'
import { useCallback, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Header } from "./components/Header";
import { DeckBoard } from "./components/DeckBoard";
import { MainDeck } from "./components/MainDeck";
import { getHomeCityData } from "./services/getHomeCityData";
import { cardsReducer, cardsInitialState } from "./reducers/cards.reducer";
import { selectedCardsReducer, selectedCardsInitialState } from "./reducers/selectedCards.reducer";
import { useImmerReducer } from 'use-immer';
import { translate } from './utils/translator';

function App() {
  const [civs, setCivs] = useState([])
  const [civ, setCiv] = useState('')
  const [maxCards, setMaxCards] = useState(25)
  const [cards, dispatchCards] = useImmerReducer(cardsReducer, cardsInitialState)
  const [selectedCards, dispatchSelectedCards] = useImmerReducer(selectedCardsReducer, selectedCardsInitialState)
  const maxCardsRef = useRef(maxCards)
  const selectedCardsRef = useRef(selectedCards)

  useEffect(() => {
    maxCardsRef.current = maxCards
    selectedCardsRef.current = selectedCards
  }, [maxCards, selectedCards])

  useEffect(() => {
    import('./data/civs.json').then(data => {
      setCivs(() => data.civ)
    })
  }, [])

  const handleSelectCiv = useCallback((value) => {
    setCiv(() => value)
    dispatchSelectedCards({ type: 'reset' })

    if (value) {
      getHomeCityData(value.homecityfilename).then(data => {
        dispatchCards({ type: 'update', data: data.cards })
        setMaxCards(() => data.maxcardsperdeck)
      })
    } else {
      dispatchCards({ type: 'reset' })
    }
  }, [])

  const handleOnClickCard = useCallback((card) => {
    const { id, ageKey } = card
    const ageCount = selectedCardsRef.current[`${ageKey}Count`]
    const total = selectedCardsRef.current.total

    if (!card.isSelected && ageCount < 10 && total < maxCardsRef.current) {
      dispatchSelectedCards({ type: 'addCard', card })
    } else if (card.isSelected) {
      dispatchSelectedCards({ type: 'removeCard', id, ageKey })
    }

    if ((!card.isSelected && ageCount < 10 && total < maxCardsRef.current) || card.isSelected) {
      dispatchCards({ type: 'toggleSelected', id, ageKey })
    }
  }, [])

  const handleOnClickDeckCard = (card) => {
    const { id, ageKey } = card
    dispatchSelectedCards({ type: 'removeCard', id, ageKey })
    dispatchCards({ type: 'toggleSelected', id, ageKey })
  }

  return (
    <Box>
      <Header civs={civs} onSelectCiv={handleSelectCiv}></Header>

      <Container className="aoe3de-deck-creator-app" sx={{ py: 4, position: 'relative' }}>
        {civ &&
          <DeckBoard
            civName={translate(civ.displaynameid)}
            maxCards={maxCards}
            selectedCards={selectedCards}
            onClickCard={handleOnClickDeckCard}
          ></DeckBoard>
        }
        {civ ?
          <MainDeck cards={cards} onClickCard={handleOnClickCard} /> :
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <img className='flag-random' src='/resources/images/icons/flags/Flag_Random.png' alt="flag random" />
          </Box>
        }
      </Container>
    </Box>
  );
}

export default App;
