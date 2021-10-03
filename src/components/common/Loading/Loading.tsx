import Loader from 'react-loader-spinner';

const Loading = () => (
  <div
    style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      margin: 'auto',
    }}
  >
    <Loader type="ThreeDots" color="#25ac64" height={100} width={100} />
  </div>
);

export default Loading;
