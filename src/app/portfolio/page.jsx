import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "Illustration",
    href: "portfolio/illustrations",
    image: "/illustrImg.jpg",
  },
  {
    name: "Photoshop",
    href: "portfolio/photoshop",
    image: "/photoshopImg.jpg",
  },
  {
    name: "Other",
    href: "portfolio/other",
    image: "/otherImg.jpg",
  },
];

export default function Portfolio() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        <span className={styles.accent}>Get inspired.</span><br />
        <span>Learn <span className={styles.highlight}>new things</span>.</span><br />
        <span>See <span className={styles.highlight}>other works</span>.</span><br />
        <span>Choose a <span className={styles.accent}>category</span></span>
        <div className={styles.headingDivider}></div>
      </h1>
      <div className={styles.cards}>
        {categories.map((cat) => (
          <Link href={cat.href} key={cat.name} className={styles.card}>
            <Image width={400} height={400} src={cat.image} alt={cat.name} className={styles.cardImage} />
            <div className={styles.cardTitle}>{cat.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
