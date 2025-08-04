import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>Footer</div>
      <div className={styles.social}>
        <a href="https://github.com/dariakulish1">
          <Image
            className={styles.icon}
            src="/githubIco.png"
            width={30}
            height={30}
            alt="github"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
