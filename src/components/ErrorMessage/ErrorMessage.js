import "./ErrorMessage.scss";

const ErrorMessage = () => {
  return (
    <div id="container">
      <div id="error-box">
        <div className="face">
          <div className="eye"></div>
          <div className="eye right"></div>
          <div className="mouth sad"></div>
        </div>
        <div className="shadow scale"></div>
        <div className="message">
          <h3 className="alert">Error!</h3>
          <p>Oh no, something went wrong.</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
