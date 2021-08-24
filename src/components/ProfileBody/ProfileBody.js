import DeckCard from '../DeckCard/DeckCard';

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
        <div className="profile-friends">
          <div className="profile-friends-header">
            <span>Followers</span>
            <span>Following</span>
          </div>
          <div className="profile-friends-content"></div>
        </div>
      </div>
    </section>
  );
};

export default ProfileBody;
