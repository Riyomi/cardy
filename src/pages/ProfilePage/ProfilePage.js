import { useParams } from 'react-router-dom';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';

const users = [
  {
    _id: 1,
    name: 'Emily',
    img: 'https://i.imgur.com/rRZCfwY.jpg',
    followers: [1, 5, 2, 6, 8],
    following: [5, 6, 8, 4, 9, 11, 12],
    cardsMastered: 1018,
  },
  {
    _id: 2,
    name: 'Adam',
    img: 'https://i.imgur.com/3F0NoWj.jpg',
    followers: [1, 5, 2, 6, 8],
    following: [5, 6, 8, 4, 9, 11, 12],
    cardsMastered: 1018,
  },
  {
    _id: 3,
    name: 'Emily',
    followers: [1, 5, 2, 6, 8],
    following: [5, 6, 8, 4, 9, 11, 12],
    cardsMastered: 1018,
  },
];

const ProfilePage = () => {
  const { id } = useParams();

  return (
    <>
      <ProfileHeader user={users.find((user) => user._id === Number(id))} />
    </>
  );
};

export default ProfilePage;
