import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>CreateIt</div>
      <div className={styles.social}>
        <a href="https://www.linkedin.com/in/daria-kulish-5a4a66257/">
            <Image
              className={styles.icon}
              src="/linkedin.png"
              width={30}
              height={30}
              alt="linkedin"
            />
          </a>
        <a href="https://github.com/dariakulish1">
          <Image
            className={styles.icon}
            src="/githubIco.png"
            width={30}
            height={30}
            alt="github"
          />
        </a>
        <div className={styles.info}><Image className={styles.icon} src="/gmailIco.png" width={30}
            height={30}
            alt="gmail" /><p className={styles.contactInfo}>: dashaklsh1507@gmail.com</p></div>
        
        <div className={styles.info}><Image src="/tgIco.png" className={styles.icon} width={30}
            height={30}
            alt="telegram" /><p className={styles.contactInfo}>: @dcoolesh</p></div>
      </div>
    </div>
  );
};

export default Footer;
