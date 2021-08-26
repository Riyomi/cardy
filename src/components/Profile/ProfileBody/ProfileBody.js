import DeckCard from '../DeckCard/DeckCard';
import Followers from '../Followers/Followers';

const ProfileBody = ({ user }) => {
  return (
    <section className="profile-body">
      <div className="profile-decks">
        <h3 style={{ fontSize: '24px' }}>{user.name}'s Decks</h3>
        {user.decks.map((deck, index) => (
          <DeckCard
            key={index}
            title={deck.title}
            progress={deck.progress}
            img={deck.img}
          />
        ))}
      </div>
      <div className="profile-friends-wrapper">
        <Followers followers={user.followers} following={user.following} />
      </div>
    </section>
  );
};

export default ProfileBody;
