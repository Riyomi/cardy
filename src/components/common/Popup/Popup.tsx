import { useEffect, useState } from 'react';
import styles from './Popup.module.scss';

interface Props {
  message: string;
  timeout: number;
  type: 'error' | 'info' | 'success';
}

const Popup = ({ message, timeout, type }: Props) => {
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
