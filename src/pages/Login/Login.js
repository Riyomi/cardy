import { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import FormField from 'components/common/FormField/FormField';
import { useUser } from 'contexts/UserContext';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from 'queries/queries';
import PopupMessage from 'components/common/PopupMessage/PopupMessage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userInfo, setUserInfo } = useUser();
  const [loginUser, { error }] = useMutation(LOGIN_USER);
  const history = useHistory();

  const handleLoginUser = async (e) => {
    e.preventDefault();

    try {
      const userInfo = await loginUser({
        variables: {
          email,
          password,
        },
      });
      localStorage.setItem(
        'userInfo',
        JSON.stringify(userInfo.data.loginUser.user)
      );

      setUserInfo(userInfo.data.loginUser.user);

      localStorage.setItem('accessToken', userInfo.data.loginUser.accessToken);
      localStorage.setItem('expires', userInfo.data.loginUser.expires);
      history.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  if (userInfo) return <Redirect to="/" />;

  return (
    <div className="form-wrapper">
      <div className="sidebar">Welcome back</div>
      {error && <PopupMessage message={error.message} type="error" />}

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
