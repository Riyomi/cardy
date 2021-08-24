import { useParams } from 'react-router-dom';
import ProfileBody from '../../components/ProfileBody/ProfileBody';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';

const users = [
  {
    _id: 1,
    name: 'Emily',
    img: 'https://i.imgur.com/rRZCfwY.jpg',
    followers: [1, 5, 2, 6, 8],
    following: [5, 6, 8, 4, 9, 11, 12],
    cardsMastered: 1018,
    decks: [
      {
        img: 'https://i.imgur.com/zBoZea6.jpg',
        title: 'Top 2000 German words',
        progress: 23,
      },
      {
        img: 'https://i.imgur.com/vNnYvfX.jpg',
        title: 'Anatomy - basics',
        progress: 78,
      },
    ],
  },
  {
    _id: 2,
    name: 'Adam',
    img: 'https://i.imgur.com/3F0NoWj.jpg',
    followers: [1, 5, 2, 6, 8],
    following: [5, 6, 8, 4, 9, 11, 12],
    cardsMastered: 1018,
    decks: [{}, {}],
  },
  {
    _id: 3,
    name: 'Emily',
    followers: [1, 5, 2, 6, 8],
    following: [5, 6, 8, 4, 9, 11, 12],
    cardsMastered: 1018,
    decks: [{}, {}],
  },
];

const ProfilePage = () => {
  const { id } = useParams();

  const getUser = () => users.find((user) => user._id === Number(id));

  return (
    <>
      <ProfileHeader user={getUser()} />
      <ProfileBody user={getUser()} />
    </>
  );
};

export default ProfilePage;
