import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to CreateIT</h1>
        <div className={styles.accent}></div>
        <p className={styles.subtitle}>
          Unleash your creativity! Share your paintings, stories, and the inspiration behind your art. This is your space to showcase your unique creations and connect with fellow creators.
        </p>
        <Link href="/portfolio" className={styles.cta}>
          Share Your Creation
        </Link>
      </div>
      <div className={styles.imageWrapper}>
        <Image src="/mainImg.png" alt="Artistic moon" width={550} height={730} className={styles.heroImage} priority />
      </div>
    </main>
  );
}
