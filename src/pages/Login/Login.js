import { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import FormField from 'components/common/FormField/FormField';
import { useUser } from 'contexts/UserContext';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from 'queries/queries';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userInfo, setUserInfo } = useUser();
  const [loginUser] = useMutation(LOGIN_USER);
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
      localStorage.setItem('userInfo', JSON.stringify(userInfo.data.loginUser));

      setUserInfo(userInfo.data.loginUser);
      history.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  if (userInfo) return <Redirect to="/" />;

  return (
    <div className="form-wrapper">
      <div className="sidebar">Welcome back</div>
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
