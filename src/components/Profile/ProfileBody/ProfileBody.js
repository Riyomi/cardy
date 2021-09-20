import DeckPreview from '../DeckPreview/DeckPreview';
import Followers from '../Followers/Followers';

const ProfileBody = ({ user }) => {
  const { name, decks, followers, following } = user;

  return (
    <section className="profile-body">
      <div className="profile-decks">
        <h3>{name}'s Public Decks</h3>
        {decks && decks.length ? (
          decks.map((deck, index) => <DeckPreview key={index} deck={deck} />)
        ) : (
          <p>No shared decks yet</p>
        )}
      </div>
      <Followers followers={followers} following={following} />
    </section>
  );
};

export default ProfileBody;
