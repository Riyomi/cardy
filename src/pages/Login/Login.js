import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormField from 'components/common/FormField/FormField';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = (e) => {
    e.preventDefault();
  };

  return (
    <div className="form-wrapper">
      <div className="sidebar">Welcome back</div>
      <div className="form-main">
        {/* {loading ? <p>Loading...</p> : ''} */}
        <h2>Login</h2>
        <form
          className="user-form"
          method="POST"
          onSubmit={(e) => loginUser(e)}
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
