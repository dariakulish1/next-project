import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.textBlock}>
        <h1 className={styles.title}>About This Site</h1>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi,
          euismod euismod nisi nisi euismod.
        </p>
        <Link href="/contacts" className={styles.contactButton}>
          Contact Me
        </Link>
      </div>
      <div className={styles.imageBlock}>
        <Image
          src="/aboutImg.png"
          alt="Abstract art inspiration"
          className={styles.aboutImage}
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};

export default About;
