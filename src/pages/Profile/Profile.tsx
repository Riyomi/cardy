import ProfileHeader from 'components/Profile/ProfileHeader/ProfileHeader';
import ProfileBody from 'components/Profile/ProfileBody/ProfileBody';
import Loading from 'components/common/Loading/Loading';
import Error from 'components/common/Error/Error';
import { useParams } from 'react-router-dom';
import { GET_USER } from 'queries/queries';
import { useQuery } from '@apollo/client';
import { useUser } from 'contexts/UserContext';
import { useHistory } from 'react-router';
import { useEffect } from 'react';

const Profile = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const { userInfo } = useUser();
  const history = useHistory();

  const { loading, error, data } = useQuery(GET_USER, {
    onError: () => {},
    variables: { id },
  });

  useEffect(() => {
    if (!userInfo) history.push('/');
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
