import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

const BlogPost = () => {
  return (
    <div className={styles.categoryContainer}>
      <h1>Head Test</h1>
      <div className={styles.categoryBox}>
        <div className={styles.textBlock}>
          <b>Name</b>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
            magni molestias ipsum vel quaerat facere quis error ullam dolorem
            distinctio asperiores corrupti, aut, delectus dolores officia
            accusantium reprehenderit mollitia aliquid?
          </p>
        </div>
        <div className={styles.imageBlock}>
          <Image
            className={styles.aboutImage}
            src="/categoryMain.png"
            alt="category"
            width={200}
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
