import { user } from 'types/User';
import DeckPreview from '../DeckPreview/DeckPreview';
import Followers from '../Followers/Followers';
import styles from './ProfileBody.module.scss';

interface Props {
  user: user;
}

const ProfileBody = ({ user }: Props) => {
  const { name, decks, followers, following } = user;

  return (
    <section className={styles.container}>
      <div>
        <h3>{name}'s Public Decks</h3>
        {decks.length ? (
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
