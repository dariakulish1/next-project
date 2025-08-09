import React from "react";
import styles from "./button.module.css";

const Button = ({ url }) => {
  return (
    <button type="submit" className={styles.showMoreBtn} url={url}>
      Show more
    </button>
  );
};

export default Button;
