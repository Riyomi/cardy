import { useParams } from 'react-router-dom';
import ProfileBody from 'components/Profile/ProfileBody/ProfileBody';
import ProfileHeader from 'components/Profile/ProfileHeader/ProfileHeader';

const users = [
  {
    _id: 1,
    name: 'Emily',
    img: 'https://i.imgur.com/rRZCfwY.jpg',
    followers: [
      { name: 'Adam', img: 'https://i.imgur.com/3F0NoWj.jpg' },
      { name: 'Bernila', img: 'https://i.imgur.com/wvNdSec.jpg' },
      { name: 'Takashi', img: 'https://i.imgur.com/pXOwAVF.jpg' },
      { name: 'Takashi', img: 'https://i.imgur.com/pXOwAVF.jpg' },
      { name: 'Takashi', img: 'https://i.imgur.com/pXOwAVF.jpg' },
    ],
    following: [
      { name: 'Adam', img: 'https://i.imgur.com/3F0NoWj.jpg' },
      { name: 'Takashi', img: 'https://i.imgur.com/pXOwAVF.jpg' },
      { name: 'Takashi', img: 'https://i.imgur.com/pXOwAVF.jpg' },
    ],
    cardsMastered: 1018,
    decks: [
      {
        id: 1,
        img: 'https://i.imgur.com/zBoZea6.jpg',
        title: 'Top 2000 German words',
        progress: 23,
      },
      {
        id: 9,
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

const Profile = () => {
  const { id } = useParams();

  const getUser = () => users.find((user) => user._id === Number(id));

  return (
    <>
      <ProfileHeader user={getUser()} />
      <ProfileBody user={getUser()} />
    </>
  );
};

export default Profile;
