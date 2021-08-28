import { useParams } from 'react-router-dom';
import ProfileBody from 'components/Profile/ProfileBody/ProfileBody';
import ProfileHeader from 'components/Profile/ProfileHeader/ProfileHeader';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/users/' + Number(id)).then((res) => {
      setUser(res.data);
      setIsPending(false);
    });
  }, [id]);

  return (
    <>
      {!isPending && (
        <>
          <ProfileHeader user={user} />
          <ProfileBody user={user} />
        </>
      )}
    </>
  );
};

export default Profile;
