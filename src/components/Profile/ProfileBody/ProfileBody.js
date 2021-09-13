import DeckPreview from '../DeckPreview/DeckPreview';
import Followers from '../Followers/Followers';

const ProfileBody = ({ user }) => {
  const { name, decks, followers, following } = user;

  return (
    <section className="profile-body">
      <div className="profile-decks">
        <h3 style={{ fontSize: '24px' }}>{name}'s Public Decks</h3>
        {decks && decks.length ? (
          decks.map((deck, index) => <DeckPreview key={index} deck={deck} />)
        ) : (
          <p>No shared decks yet</p>
        )}
      </div>
      <div className="profile-friends-wrapper">
        <Followers followers={followers} following={following} />
      </div>
    </section>
  );
};

export default ProfileBody;
