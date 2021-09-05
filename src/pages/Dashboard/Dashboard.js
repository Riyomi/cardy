import { Link, Redirect } from 'react-router-dom';
import { useUser } from 'contexts/UserContext';
import { useQuery } from '@apollo/client';
import { GET_USER } from 'queries/queries';
import ProgressBar from 'components/common/ProgressBar/ProgressBar';
import Followers from 'components/Profile/Followers/Followers';
import DeckCard from 'components/common/DeckCard/DeckCard';

const Dashboard = () => {
  const { userInfo } = useUser();

  const { data } = useQuery(GET_USER, {
    variables: { id: userInfo?.id },
  });

  if (!userInfo) return <Redirect to="/login" />;

  return (
    <div id="dashboard-content">
      <h2>Dashboard</h2>
      {data && (
        <>
          <div id="user-content">
            <div id="user-info">
              <h3>{data.user.name}</h3>
              <img src={data.user.img} alt={data.user.name} />
              <ProgressBar progress={50} />
              <div>0 cards mastered</div>
              <Link to={'profile/' + data.user.id}>View profile</Link>
            </div>
            <div id="dashboard-digest">
              <h1>Good morning, {data.user.name}</h1>
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
