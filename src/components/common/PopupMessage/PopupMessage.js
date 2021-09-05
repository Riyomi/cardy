import { useEffect, useState } from 'react';

const PopupMessage = ({ message, timeout, type }) => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowMessage(false);
    }, timeout);
  }, [timeout]);

  return (
    <div
      className={'popup-message type-' + type}
      style={{ display: showMessage ? 'block' : 'none' }}
    >
      {message}
    </div>
  );
};

export default PopupMessage;

PopupMessage.defaultProps = {
  timeout: 3000,
  type: 'information',
};
