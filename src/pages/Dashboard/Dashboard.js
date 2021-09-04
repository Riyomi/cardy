import { Link, Redirect } from 'react-router-dom';
import ProgressBar from 'components/common/ProgressBar/ProgressBar';
import Followers from 'components/Profile/Followers/Followers';
import DeckCard from 'components/common/DeckCard/DeckCard';
import { useUser } from 'contexts/UserContext';

const Dashboard = () => {
  const { userInfo } = useUser();

  console.log(userInfo);

  if (!userInfo) return <Redirect to="/login" />;

  return (
    <div id="dashboard-content">
      {userInfo && (
        <>
          <h2>Dashboard</h2>
          <div id="user-content">
            <div id="user-info">
              <h3>{userInfo.user.name}</h3>
              <img src={userInfo.user.img} alt={userInfo.user.name} />
              <ProgressBar progress={50} />
              <div>0 cards mastered</div>
              <Link to={'profile/' + userInfo.user.id}>View profile</Link>
            </div>
            <div id="dashboard-digest">
              <h1>Good morning, {userInfo.user.name}</h1>
              <div>You have 0 cards to review today.</div>
              <button className="btn">Review now</button>
            </div>
          </div>
          <div id="decks-and-followers">
            <div id="deck-info-list">
              {userInfo.user.decks.map((deck, index) => (
                <DeckCard deck={deck} key={index} location="dashboard" />
              ))}
            </div>
            <Followers
              followers={userInfo.user.followers}
              following={userInfo.user.following}
              style={{ paddingTop: '20px' }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
