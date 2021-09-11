import { Link, Redirect } from 'react-router-dom';
import { useUser } from 'contexts/UserContext';
import { useQuery } from '@apollo/client';
import { GET_USER } from 'queries/queries';
import ProgressBar from 'components/common/ProgressBar/ProgressBar';
import Followers from 'components/Profile/Followers/Followers';
import DeckCard from 'components/common/DeckCard/DeckCard';
import { getProgress } from 'utils/utils';

const Dashboard = () => {
  const { userInfo } = useUser();
  const { data } = useQuery(GET_USER, {
    variables: {
      id: userInfo?.id,
    },
  });

  const getWelcomeMessage = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 4 && hour < 12) {
      return 'Good morning';
    } else if (hour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  if (!userInfo) return <Redirect to="/login" />;

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
                progress={getProgress(data.user.experience).progress}
              />
              <div>0 cards mastered</div>
              <Link to={'profile/' + data.user.id}>View profile</Link>
            </div>
            <div id="dashboard-digest">
              <h1>
                {getWelcomeMessage()}, {data.user.name}
              </h1>
              {data.user.decks.length === 0 ? (
                <>
                  <div>You don't have any decks yet</div>
                  <Link to="/create-deck" className="btn">
                    Create a deck
                  </Link>
                </>
              ) : (
                <>
                  <div>You have 0 cards to review today.</div>
                  <button className="btn">Review now</button>
                </>
              )}
            </div>
          </div>
          <div id="decks-and-followers">
            <div id="deck-info-list">
              {data.user.decks.map((deck, index) => (
                <DeckCard deck={deck} key={index} location="dashboard" />
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
    </div>
  );
};

export default Dashboard;
