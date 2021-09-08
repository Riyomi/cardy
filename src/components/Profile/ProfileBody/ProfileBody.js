import DeckPreview from '../DeckPreview/DeckPreview';
import Followers from '../Followers/Followers';

const ProfileBody = ({ user }) => {
  return (
    <section className="profile-body">
      <div className="profile-decks">
        <h3 style={{ fontSize: '24px' }}>{user.name}'s Shared Decks</h3>
        {user.decks.length === 0 ? (
          <p>No shared decks yet</p>
        ) : (
          user.decks.map((deck, index) => (
            <DeckPreview key={index} deck={deck} />
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
