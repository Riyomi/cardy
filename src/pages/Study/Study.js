import { useMutation } from '@apollo/client';
import ProgressBar from 'components/common/ProgressBar/ProgressBar';
import { useUser } from 'contexts/UserContext';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { STUDY_SESSION, GET_DECK, GET_USER } from 'queries/queries';

const Study = ({ location }) => {
  const { userInfo } = useUser();
  const history = useHistory();

  const [cards, setCards] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [showQuestion, setShowQuestion] = useState(true);
  const [numOfCards, setNumOfCards] = useState(0);

  const deck = location.state.deck;

  const [save, { loading, error }] = useMutation(STUDY_SESSION, {
    refetchQueries: [
      {
        query: GET_DECK,
        variables: { id: deck.id },
      },
      {
        query: GET_USER,
        variables: { id: userInfo.id },
      },
    ],
  });

  const handleQuit = () => {
    if (
      window.confirm(
        'Are you sure you want to quit? All your progress will be lost!'
      )
    ) {
      history.push('/');
    }
  };

  const handleSkip = () => {
    const newCards = [...cards];
    newCards.push(newCards.splice(0, 1)[0]);
    setCards(newCards);
    setShowQuestion(true);
  };

  const rateCard = (difficulty) => {
    const currentCard = cards[0];

    if (difficulty !== DIFFICULTY.DIDNT_KNOW) {
      const newCards = cards.filter((card) => card !== cards[0]);
      setCards(newCards);

      let newCardData = null;

      if (!cardData.filter((card) => card.id === currentCard.id).length) {
        newCardData = [...cardData];
        newCardData.push({ id: currentCard.id, rated: difficulty });
        setCardData(newCardData);
      }

      if (!newCards.length) {
        console.log('Saving progress...');
        save({
          variables: {
            cards: JSON.stringify(newCardData ? newCardData : cardData),
          },
        })
          .then(history.push('/dashboard'))
          .catch((err) => console.log(err.message));
      }
    } else {
      if (!cardData.filter((card) => card.id === currentCard.id).length) {
        const newCardData = [...cardData];
        newCardData.push({ id: cards[0].id, rated: DIFFICULTY.DIDNT_KNOW });
        setCardData(newCardData);
      }

      const newCards = [...cards];
      newCards.push(newCards.splice(0, 1)[0]);
      setCards(newCards);
    }
    setShowQuestion(true);
  };

  const getProgress = () => {
    const progress = ((numOfCards - cards.length) / numOfCards) * 100;
    return progress;
  };

  useEffect(() => {
    if (!location.state.cards || !userInfo) history.push('/dashboard');
    setCards(location.state.cards);
    setNumOfCards(location.state.cards.length);
  }, [location.state, history, userInfo]);

  return (
    <div>
      <div id="study-header" className="navbar">
        <span>
          {deck.title} {`(studying ${numOfCards} cards)`}
        </span>
        <span className="spacer"></span>
        <span className="material-icons-outlined" onClick={handleQuit}>
          close
        </span>
      </div>
      {cards && cards.length > 0 && (
        <div id="study-content">
          <ProgressBar progress={getProgress()} />
          {showQuestion && (
            <>
              <h1>Question</h1>
              <div id="question">{cards[0].front}</div>
              <div id="study-buttons">
                <button className="btn" onClick={() => setShowQuestion(false)}>
                  Reveal answer
                </button>
                <button className="btn" onClick={handleSkip}>
                  Skip for now
                </button>
              </div>
            </>
          )}
          {!showQuestion && (
            <>
              <h1>Answer</h1>
              <div id="question">{cards[0].back}</div>
              <div id="study-buttons">
                <button
                  className="btn"
                  onClick={() => rateCard(DIFFICULTY.EASY)}
                >
                  Easy
                </button>
                <button
                  className="btn"
                  onClick={() => rateCard(DIFFICULTY.NORMAL)}
                  style={{ background: '#A9AC25' }}
                >
                  Normal
                </button>
                <button
                  className="btn"
                  onClick={() => rateCard(DIFFICULTY.HARD)}
                  style={{ background: '#AC2E25' }}
                >
                  Hard
                </button>
                <button
                  className="btn"
                  onClick={() => rateCard(DIFFICULTY.DIDNT_KNOW)}
                  style={{ background: 'black' }}
                >
                  Didn't know
                </button>
              </div>
            </>
          )}
        </div>
      )}
      {loading && 'Saving progress...'}
      {error && 'Something went wrong'}
    </div>
  );
};

const DIFFICULTY = {
  EASY: 0,
  NORMAL: 1,
  HARD: 2,
  DIDNT_KNOW: 3,
};

export default Study;
