import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export const Blog = async () => {
  const data = await getData();
  return (
    <div className={styles.categoryContainer}>
      {data.map((post) => {
        return (
          <Link href="/blog/testId" key={post.id} className={styles.backLink}>
            <div className={styles.categoryBox}>
              <div className={styles.textBlock}>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
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
          </Link>
        );
      })}
    </div>
  );
};

export default Blog;
