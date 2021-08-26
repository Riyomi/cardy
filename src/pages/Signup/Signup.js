import { Link } from 'react-router-dom';
import Form from 'components/common/Form/Form';

const fields = [
  { name: 'Email address', type: 'text' },
  { name: 'Password', type: 'password' },
  { name: 'Confirm password', type: 'password' },
];

const footer = (
  <p>
    Already have an account?{' '}
    <Link to="/login" className="link-primary">
      Log in
    </Link>
  </p>
);

const Signup = () => (
  <Form
    title={'Sign up'}
    fields={fields}
    sideText={'Your journey starts today...'}
    footer={footer}
  />
);

export default Signup;
