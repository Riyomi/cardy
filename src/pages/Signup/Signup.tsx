import Popup from 'components/common/Popup/Popup';
import FormField from 'components/common/FormField/FormField';
import Loading from 'components/common/Loading/Loading';
import { Link, useHistory } from 'react-router-dom';
import { useUser } from 'contexts/UserContext';
import { CREATE_USER } from 'queries/queries';
import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';

const Signup = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [createUser, { error, loading }] = useMutation(CREATE_USER, {
    onError: () => {},
    onCompleted: (data) => {
      const { user, accessToken, expires } = data.createUser;

      localStorage.setItem('userInfo', JSON.stringify(user));
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('expires', expires);

      setUserInfo(user);
      history.push('/dashboard');
    },
  });

  const { userInfo, setUserInfo } = useUser();

  const signup = (e: React.FormEvent) => {
    e.preventDefault();

    createUser({
      variables: { email, name, password, confirmPassword },
    });
  };

  useEffect(() => {
    if (userInfo) history.push('/');
  });

  if (loading) return <Loading />;

  return (
    <div className="form-wrapper">
      <div className="sidebar">Your journey starts today...</div>
      <div className="form-main">
        {error && <Popup message={error.message} type="error" />}
        <h2>Sign up</h2>
        <form className="user-form" method="POST" onSubmit={(e) => signup(e)}>
          <FormField
            name="Email"
            type="email"
            value={email}
            setValue={setEmail}
            required={true}
          />
          <FormField
            name="Name"
            type="text"
            value={name}
            setValue={setName}
            required={true}
          />
          <FormField
            name="Password"
            type="password"
            value={password}
            setValue={setPassword}
            required={true}
          />
          <FormField
            name="Confirm password"
            type="password"
            value={confirmPassword}
            setValue={setConfirmPassword}
            required={true}
          />

          <input type="submit" value="Sign up" className="submit-btn" />
          <p>
            Already have an account?{' '}
            <Link to="/login" className="link-primary">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
