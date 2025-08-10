import React from "react";
import styles from "./button.module.css";

const Button = ({ url }) => {
  return (
    <a href={url}>
    <button type="submit" className={styles.showMoreBtn}>
      Show more
    </button></a>
  );
};

export default Button;
