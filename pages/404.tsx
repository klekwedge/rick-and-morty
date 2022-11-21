import { Link } from "@chakra-ui/react";
import React from "react";
import styles from "./../styles/404.module.scss";

function Page404() {
  return (
    <div className={styles.backgrounImg}>
      <div className={styles.space} />
      <div className={styles.wrapper}>
        <div className={styles.imgWrapper}>
          <span>44</span>
        </div>
        <p>
          The page you are trying to find has
          <br />
          moved to another universe.
        </p>
        <Link href="/">GET ME HOME</Link>
      </div>
    </div>
  );
}

export default Page404;
