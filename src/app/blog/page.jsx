import React from "react";
import { headers } from "next/headers";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

async function getData() {
  const hdrs = headers();
  const host = hdrs.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;
  const res = await fetch(`${baseUrl}/api/posts`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Blog() {
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
}
