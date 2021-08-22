import Form from '../../components/Form/Form';

const fields = [
  { name: 'Email address', type: 'text' },
  { name: 'Password', type: 'password' },
];

const LoginPage = () => {
  return (
    <div>
      <Form
        title={'Login'}
        fields={fields}
        sideText={'Your journey starts today...'}
      />
    </div>
  );
};

export default LoginPage;
