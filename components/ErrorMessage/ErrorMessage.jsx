import React from 'react';
import './ErrorMessage.module.scss';

function ErrorMessage() {
  return (
    <div id="container">
      <div id="error-box">
        <div className="face">
          <div className="eye" />
          <div className="eye right" />
          <div className="mouth sad" />
        </div>
        <div className="shadow scale" />
        <div className="message">
          <h3 className="alert">Error!</h3>
          <p>Oh no, something went wrong.</p>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;
