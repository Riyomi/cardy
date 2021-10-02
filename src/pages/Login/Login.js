import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useUser } from 'contexts/UserContext';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from 'queries/queries';
import FormField from 'components/common/FormField/FormField';
import Popup from 'components/common/Popup/Popup';
import Loading from 'components/common/Loading/Loading';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userInfo, setUserInfo } = useUser();
  const [loginUser, { error, loading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      const { user, accessToken, expires } = data.loginUser;

      localStorage.setItem('userInfo', JSON.stringify(user));
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('expires', expires);

      setUserInfo(user);
      history.push('/dashboard');
    },
    onError: () => {},
  });

  const handleLoginUser = (e) => {
    e.preventDefault();
    loginUser({ variables: { email, password } });
  };

  useEffect(() => userInfo && history.push('/dashboard'));

  if (loading) return <Loading />;

  return (
    <div className="form-wrapper">
      <div className="sidebar">Welcome back</div>
      {error && <Popup message={error.message} type="error" />}
      <div className="form-main">
        <h2>Login</h2>
        <form
          className="user-form"
          method="POST"
          onSubmit={(e) => handleLoginUser(e)}
        >
          <FormField
            name="Email"
            type="email"
            value={email}
            setValue={setEmail}
            required={true}
          />
          <FormField
            name="Password"
            type="password"
            value={password}
            setValue={setPassword}
            required={true}
          />

          <input type="submit" value="Login" className="submit-btn" />
          <p>
            Don't have an account yet?{' '}
            <Link to="/signup" className="link-primary">
              Sign up
            </Link>{' '}
            today!
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
