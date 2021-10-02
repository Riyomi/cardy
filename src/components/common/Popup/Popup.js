import { useEffect, useState } from 'react';
import styles from './Popup.module.scss';

const Popup = ({ message, timeout, type }) => {
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
      className={`${styles.message} ${styles[type]}`}
      style={{ display: showMessage ? 'block' : 'none' }}
    >
      {message}
    </div>
  );
};

export default Popup;

Popup.defaultProps = {
  timeout: 3000,
  type: 'information',
};
