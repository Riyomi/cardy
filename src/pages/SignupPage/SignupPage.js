import Form from '../../components/Form/Form';

const fields = [
  { name: 'Email address', type: 'text' },
  { name: 'Password', type: 'password' },
  { name: 'Confirm password', type: 'password' },
];

const SignupPage = () => {
  return (
    <div>
      <Form title={'Sign up'} fields={fields} sideText={'Welcome back!'} />
    </div>
  );
};

export default SignupPage;
