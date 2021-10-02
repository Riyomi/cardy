const Error = ({
  message = 'Something went wrong. Please try to refresh the page later.',
}) => (
  <div
    style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      margin: 'auto',
    }}
  >
    <div>{message}</div>
  </div>
);

export default Error;
