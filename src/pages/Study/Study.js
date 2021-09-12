import ProgressBar from 'components/common/ProgressBar/ProgressBar';
import { useUser } from 'contexts/UserContext';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const Study = ({ location }) => {
  const { userInfo } = useUser();
  const history = useHistory();

  const [cards, setCards] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [showQuestion, setShowQuestion] = useState(true);

  const deck = location.state.deck;

  const handleQuit = () => {
    if (window.confirm('Are you sure you want to quit?')) {
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
    if (difficulty !== DIFFICULTY.DIDNT_KNOW) {
      const newCardData = [...cardData];
      newCardData.push({ id: cards[0].id, rated: difficulty });
      setCardData(newCardData);

      const newCards = cards.filter((card) => card !== cards[0]);
      setCards(newCards);

      if (!newCards.length) {
        console.log('Time to make the call');
        console.log(newCardData);

        // history.push('/dashboard')
      }
    } else {
      const newCards = [...cards];
      newCards.push(newCards.splice(0, 1)[0]);
      setCards(newCards);
    }
    setShowQuestion(true);
  };

  const getProgress = () => {
    const progress = (cardData.length / (cards.length + cardData.length)) * 100;
    console.log(progress);
    return progress;
  };

  useEffect(() => {
    if (!location.state.cards || !userInfo) history.push('/dashboard');
    setCards(location.state.cards);
  }, [location.state, history, userInfo]);

  return (
    <div>
      <div id="study-header" className="navbar">
        <span>{deck.title}</span>
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
