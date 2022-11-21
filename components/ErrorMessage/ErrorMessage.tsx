import React from "react";
import styles from "./ErrorMessage.module.scss";

function ErrorMessage() {
  return (
    <div id={styles.container}>
      <div id={styles.errorBox}>
        <div className={styles.face}>
          <div className={styles.eye} />
          <div className={`${styles.eye} ${styles.right}`} />
          <div className={`${styles.mouth} ${styles.sad}`} />
        </div>
        <div className={`${styles.shadow} ${styles.scale}`} />
        <div className={styles.message}>
          <h3 className={styles.alert}>Error!</h3>
          <p>Oh no, something went wrong.</p>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;
