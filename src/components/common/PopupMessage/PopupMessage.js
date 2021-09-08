import { useEffect, useState } from 'react';

const PopupMessage = ({ message, timeout, type }) => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => {
      setShowMessage(false);
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, setShowMessage]);

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
