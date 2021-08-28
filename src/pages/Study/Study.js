import ProgressBar from 'components/common/ProgressBar/ProgressBar';
import { useState } from 'react';
import { useHistory } from 'react-router';

const DIFFICULTY = {
  EASY: 0,
  NORMAL: 1,
  HARD: 2,
  DIDNT_KNOW: 3,
};

const Study = ({ cards }) => {
  const [progress, setProgress] = useState(0);
  const [showQuestion, setShowQuestion] = useState(true);
  const history = useHistory();

  const handlePause = () => {
    console.log('clicked pause');
  };

  const handleQuit = () => {
    console.log('clicked quit');
  };

  const handleRevealAnswer = () => {
    console.log('clicked reveal answer');
    setShowQuestion(false);
  };

  const handleSkip = () => {
    console.log('clicked skip');
  };

  const rateCard = (difficulty) => {
    console.log(difficulty);
    if (difficulty !== DIFFICULTY.DIDNT_KNOW) {
      setProgress(progress + 5);
    }
    if (progress === 100) {
      history.push('/dashboard');
    }
    setShowQuestion(true);
  };

  return (
    <div>
      <div id="study-header" className="navbar">
        <span>Top 2000 German words</span>
        <span className="spacer"></span>
        <span className="material-icons-outlined" onClick={handlePause}>
          pause
        </span>
        <span className="material-icons-outlined" onClick={handleQuit}>
          close
        </span>
      </div>
      <div id="study-content">
        <ProgressBar progress={progress} />
        {showQuestion && (
          <>
            <h1>Question</h1>
            <div id="question">zerstören</div>
            <div id="study-buttons">
              <button className="btn" onClick={handleRevealAnswer}>
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
            <div id="question">to destroy</div>
            <div id="study-buttons">
              <button className="btn" onClick={() => rateCard(DIFFICULTY.EASY)}>
                Easy
              </button>
              <button
                className="btn"
                onClick={() => rateCard(DIFFICULTY.NORMAL)}
              >
                Normal
              </button>
              <button className="btn" onClick={() => rateCard(DIFFICULTY.HARD)}>
                Hard
              </button>
              <button
                className="btn"
                onClick={() => rateCard(DIFFICULTY.DIDNT_KNOW)}
              >
                Didn't know
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Study;
