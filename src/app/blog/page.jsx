import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

async function getData() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });
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
          <Link
            href={`/blog/${post._id}`}
            key={post._id}
            className={styles.backLink}
          >
            <div className={styles.categoryBox}>
              <div className={styles.textBlock}>
                <h1>{post.title}</h1>
                <p>{post.content}</p>
              </div>
              <div className={styles.imageBlock}>
                <Image
                  className={styles.aboutImage}
                  src={post.img}
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
