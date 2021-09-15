import ProfileHeader from 'components/Profile/ProfileHeader/ProfileHeader';
import ProfileBody from 'components/Profile/ProfileBody/ProfileBody';
import Loading from 'components/common/Loading/Loading';
import Error from 'components/common/Error/Error';
import { useParams } from 'react-router-dom';
import { GET_USER } from 'queries/queries';
import { useQuery } from '@apollo/client';

const Profile = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_USER, {
    onError: () => {},
    variables: { id },
  });

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <ProfileHeader user={data.user} />
      <ProfileBody user={data.user} />
    </>
  );
};

export default Profile;
