import React from "react";
import styles from './test.css';

const Hello = ({name}) => (
  <div className={styles.testing}>
    Hello, {name}!
  </div>
)

export default Hello;
