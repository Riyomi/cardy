import axios from 'axios';
import ProgressBar from 'components/common/ProgressBar/ProgressBar';
import Followers from 'components/Profile/Followers/Followers';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeckCard from 'components/common/DeckCard/DeckCard';

const Dashboard = () => {
  const id = 1;

  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/users/' + id).then((res) => {
      setUser(res.data);
      setIsPending(false);
    });
  }, [id]);

  return (
    <div id="dashboard-content">
      {!isPending && (
        <>
          <h2>Dashboard</h2>
          <div id="user-content">
            <div id="user-info">
              <h3>{user.name}</h3>
              <img src={user.img} alt={user.name} />
              <ProgressBar progress={50} />
              <div>214 cards mastered</div>
              <Link to={'profile/' + user.id}>View profile</Link>
            </div>
            <div id="dashboard-digest">
              <h1>Good morning, {user.name}</h1>
              <div>You have 34 cards to review today.</div>
              <button className="btn">Review now</button>
            </div>
          </div>
          <div id="decks-and-followers">
            <div id="deck-info-list">
              {user.decks.map((deck, index) => (
                <DeckCard deck={deck} key={index} location="dashboard" />
              ))}
            </div>
            <Followers followers={user.followers} following={user.following} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
