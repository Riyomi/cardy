import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useUser } from 'contexts/UserContext';
import { useQuery } from '@apollo/client';
import { GET_USER } from 'queries/queries';
import { getUserProgress, cardsDueTo, getWelcomeMessage } from 'utils/utils';
import ProgressBar from 'components/common/ProgressBar/ProgressBar';
import Followers from 'components/Profile/Followers/Followers';
import DeckCard from 'components/common/DeckCard/DeckCard';

const Dashboard = () => {
  const history = useHistory();
  const { userInfo } = useUser();
  const { data, error } = useQuery(GET_USER, {
    variables: { id: userInfo?.id },
  });

  const getCardsDueTo = () => {
    const cardsToReview = [];
    for (const deck of data.user.decks) {
      cardsToReview.push(...cardsDueTo(deck.cards));
    }
    return cardsToReview;
  };

  const newCards = () => {
    const newCards = [];
    for (const deck of data.user.decks) {
      newCards.push(...deck.cards.filter((card) => !card.nextReview));
    }
    return newCards.slice(0, 20);
  };

  const deckToReview = () => {
    for (const deck of data.user.decks) {
      const cardsToReview = cardsDueTo(deck.cards);
      if (cardsToReview.length) return { cards: cardsToReview, deck: deck };
    }
    return null;
  };

  const deckToLearn = () => {
    for (const deck of data.user.decks) {
      const newCards = deck.cards.filter((card) => !card.nextReview);
      if (newCards.length) return { cards: newCards.slice(0, 20), deck: deck };
    }
    return null;
  };

  useEffect(() => {
    if (!userInfo) history.push('/login');
  });

  return (
    <div id="dashboard-content">
      <h2>Dashboard</h2>
      {data?.user && (
        <>
          <div id="user-content">
            <div id="user-info">
              <h3>{data.user.name}</h3>
              <img src={data.user.img} alt={data.user.name} />
              <ProgressBar
                progress={getUserProgress(data.user.experience).progress}
              />
              <div>{data.user.mastered} cards mastered</div>
              <Link to={'profile/' + data.user.id}>View profile</Link>
            </div>
            <div id="dashboard-digest">
              <h1>
                {getWelcomeMessage()}, {data.user.name}
              </h1>
              {!data.user.decks.length ? (
                <>
                  <div>You don't have any decks yet</div>
                  <Link to="/create-deck" className="btn">
                    Create a deck
                  </Link>
                </>
              ) : getCardsDueTo().length ? (
                <>
                  <div>
                    You have {getCardsDueTo().length} cards to review today.
                  </div>
                  <button
                    className="btn"
                    onClick={() => {
                      const review = deckToReview();
                      history.push('/study', review);
                    }}
                  >
                    Review now
                  </button>
                </>
              ) : (
                <>
                  <div>You have no cards to review yet</div>
                  <button
                    className="btn"
                    disabled={newCards().length === 0}
                    onClick={() => {
                      const study = deckToLearn();
                      history.push('/study', study);
                    }}
                  >
                    Learn new
                  </button>
                </>
              )}
            </div>
          </div>
          <div id="decks-and-followers">
            <div id="deck-info-list">
              {data.user.decks.map((deck, index) => (
                <DeckCard deck={deck} key={index} />
              ))}
            </div>
            <Followers
              followers={data.user.followers}
              following={data.user.following}
              style={{ paddingTop: '20px' }}
            />
          </div>
        </>
      )}
      {error && (
        <p>Something went wrong. Please try to refresh the page later.</p>
      )}
    </div>
  );
};

export default Dashboard;
