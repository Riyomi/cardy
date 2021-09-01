import { Link } from 'react-router-dom';
import FormField from 'components/common/FormField/FormField';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [createUser, { /*data: user,*/ loading /*error */ }] =
    useMutation(CREATE_USER);

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      await createUser({
        variables: { email, name, password, confirmPassword },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="sidebar">Your journey starts today...</div>
      <div className="form-main">
        {loading ? <p>Loading...</p> : ''}
        <h2>Sign up</h2>
        <form
          className="user-form"
          method="POST"
          onSubmit={(e) => registerUser(e)}
        >
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

const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $name: String!
    $password: String!
    $confirmPassword: String!
  ) {
    createUser(
      email: $email
      name: $name
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

export default Signup;
