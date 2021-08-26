const ProfileHeader = ({ user }) => {
  return (
    <section className="profile-wrapper">
      <div className="user-info">
        <img src={user.img} alt={user.name} className="profile-picture" />
        <div className="user-details">
          <h2 className="user-name">{user.name}</h2>
          <p>
            <span className="material-icons-outlined profile-icon">people</span>
            <span className="profile-icon-text">
              {user.following.length} Following / {user.followers.length}{' '}
              Followers
            </span>
          </p>
          <p>
            <span className="material-icons-outlined profile-icon">school</span>
            <span className="profile-icon-text">
              {user.cardsMastered} cards mastered
            </span>
          </p>
        </div>
      </div>
      <div>
        <button className="follow-btn">Follow</button>
      </div>
    </section>
  );
};

export default ProfileHeader;
