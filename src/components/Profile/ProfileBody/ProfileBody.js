import DeckCard from 'components/common/DeckCard/DeckCard';
import Followers from '../Followers/Followers';

const ProfileBody = ({ user }) => {
  return (
    <section className="profile-body">
      <div className="profile-decks">
        <h3 style={{ fontSize: '24px' }}>{user.name}'s Decks</h3>
        {user.decks.length === 0 ? (
          <p>No public decks yet</p>
        ) : (
          user.decks.map((deck, index) => (
            <DeckCard key={index} deck={deck} location="profile" />
          ))
        )}
      </div>
      <div className="profile-friends-wrapper">
        <Followers followers={user.followers} following={user.following} />
      </div>
    </section>
  );
};

export default ProfileBody;
