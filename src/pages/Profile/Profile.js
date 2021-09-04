import { Redirect, useParams } from 'react-router-dom';
import ProfileBody from 'components/Profile/ProfileBody/ProfileBody';
import ProfileHeader from 'components/Profile/ProfileHeader/ProfileHeader';
import { GET_USER } from 'queries/queries';
import { useQuery } from '@apollo/client';

const Profile = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id },
  });

  if (error) return <Redirect to="/" />;

  return (
    <>
      {!loading && !error && (
        <>
          <ProfileHeader user={data.user} />
          <ProfileBody user={data.user} />
        </>
      )}
    </>
  );
};

export default Profile;
