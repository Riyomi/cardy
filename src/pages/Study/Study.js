import ProgressBar from 'components/common/ProgressBar/ProgressBar';
import { useUser } from 'contexts/UserContext';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';

const Study = () => {
  const history = useHistory();

  const [progress, setProgress] = useState(0);
  const [max /* setMax*/] = useState(0);
  const [showQuestion, setShowQuestion] = useState(true);
  const [cards, setCards] = useState([]);
  const [isPending /* setIsPending */] = useState(true);

  const { userInfo } = useUser();

  // useEffect(() => {
  //   axios.get('http://localhost:8080/cards').then((res) => {
  //     setCards(res.data);
  //     setMax(res.data.length);
  //     setIsPending(false);
  //   });
  // }, []);

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
      const newCards = cards.filter((card) => card !== cards[0]);
      console.log(
        new Date(
          getNextReviewDate(
            Date.now(),
            cards[0].step,
            cards[0].correctStreak,
            difficulty
          )
        )
      );
      setProgress(progress + 1);
      setCards(newCards);

      if (newCards.length === 0) {
        history.push('/dashboard');
      }
    } else {
      const newCards = [...cards];
      newCards.push(newCards.splice(0, 1)[0]);
      setCards(newCards);
    }
    setShowQuestion(true);
  };

  if (!userInfo) return <Redirect to="/" />;

  return (
    <div>
      <div id="study-header" className="navbar">
        <span>Top 2000 German words</span>
        <span className="spacer"></span>
        <span className="material-icons-outlined" onClick={handleQuit}>
          close
        </span>
      </div>
      {!isPending && cards.length !== 0 && (
        <div id="study-content">
          <ProgressBar progress={(progress / max) * 100} />
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

export const DIFFICULTY = {
  EASY: 0,
  NORMAL: 1,
  HARD: 2,
  DIDNT_KNOW: 3,
};

export const getNextReviewDate = (date, step, streak, answered) => {
  if (answered === DIFFICULTY.EASY) {
    return date + (step + 0.5) * 3 * 2 ** streak * 60 * 60 * 1000;
  } else if (answered === DIFFICULTY.NORMAL) {
    return date + (step + 0.3) * 3 * 2 ** streak * 60 * 60 * 1000;
  } else if (answered === DIFFICULTY.HARD) {
    return date + (step + 0.1) * 3 * 2 ** streak * 60 * 60 * 1000;
  } else if (answered === DIFFICULTY.DIDNT_KNOW) {
    if (step - 0.2 >= 0.1) {
      return date + (step - 0.2) * 3 * 2 ** 0 * 60 * 60 * 1000;
    } else {
      return date + 0.1 * 3 * 2 ** 0 * 60 * 60 * 1000;
    }
  }
  return date;
};

export default Study;
