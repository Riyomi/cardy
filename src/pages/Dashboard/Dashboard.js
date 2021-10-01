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
import Error from 'components/common/Error/Error';
import Loading from 'components/common/Loading/Loading';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const history = useHistory();
  const { userInfo } = useUser();
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userInfo?.id },
  });

  useEffect(() => !userInfo && history.push('/login'));

  if (loading) return <Loading />;
  if (error) return <Error />;

  const { id, name, img, experience, decks, mastered, followers, following } =
    data.user;

  const cardsToReview = () => {
    const cardsToReview = [];
    for (const deck of decks) {
      cardsToReview.push(...cardsDueTo(deck.cards));
    }
    return cardsToReview;
  };

  const newCards = () => {
    const newCards = [];
    for (const deck of decks) {
      newCards.push(...deck.cards.filter((card) => !card.nextReview));
    }
    return newCards.slice(0, 20);
  };

  const deckToReview = () => {
    for (const deck of decks) {
      const cardsToReview = cardsDueTo(deck.cards);
      if (cardsToReview.length) return { cards: cardsToReview, deck: deck };
    }
    return null;
  };

  const deckToLearn = () => {
    for (const deck of decks) {
      const newCards = deck.cards
        .filter((card) => !card.nextReview)
        .slice(0, 20);
      if (newCards.length) return { cards: newCards, deck: deck };
    }
    return null;
  };

  return (
    <div className={styles.content}>
      <h2>Dashboard</h2>
      <div className={styles.userContent}>
        <div className={styles.userInfo}>
          <h3>{name}</h3>
          <img src={img} alt={name} />
          <ProgressBar progress={getUserProgress(experience).progress} />
          <div>{mastered} cards mastered</div>
          <Link to={`profile/${id}`}>View profile</Link>
        </div>
        <div className={styles.digest}>
          <h1>
            {getWelcomeMessage()}, {name}
          </h1>
          {!decks.length ? (
            <>
              <div>You don't have any decks yet</div>
              <Link to="/create-deck" className="btn">
                Create a deck
              </Link>
            </>
          ) : cardsToReview().length ? (
            <>
              <div>
                You have {cardsToReview().length} cards to review today.
              </div>
              <button
                className="btn"
                onClick={() => history.push('/study', deckToReview())}
              >
                Review now
              </button>
            </>
          ) : (
            <>
              <div>You have no cards to review yet</div>
              <button
                className="btn"
                disabled={!newCards().length}
                onClick={() => history.push('/study', deckToLearn())}
              >
                Learn new
              </button>
            </>
          )}
        </div>
      </div>
      <div className={styles.userData}>
        <div className={styles.deckList}>
          {decks.map((deck, index) => (
            <DeckCard deck={deck} key={index} />
          ))}
        </div>
        <Followers
          followers={followers}
          following={following}
          style={{ paddingTop: '20px' }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
