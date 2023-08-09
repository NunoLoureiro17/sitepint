import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';

import './LoginButton.css';

const LoginButton = ({ provider, text }) => {
  const renderIcon = () => {
    if (provider === 'facebook') {
      return <FontAwesomeIcon icon={faFacebookF} />;
    }
    if (provider === 'google') {
      return <FontAwesomeIcon icon={faGoogle} />;
    }
    return null;
  };

  return (
    <button className={`login-button ${provider}`}>
      {renderIcon()}
      {text}
    </button>
  );
};

export default LoginButton;
