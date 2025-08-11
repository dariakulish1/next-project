import React from "react";
import { headers } from "next/headers";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(id) {
  const hdrs = headers();
  const host = hdrs.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;
  const res = await fetch(`${baseUrl}/api/posts/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return notFound();
  }
  return res.json();
}

export async function generateMetadata({ params }) {
  const postData = await getData(params.id);
  return {
    title: postData.title,
    content: postData.content,
  };
}
const BlogPost = async ({ params }) => {
  const post = await getData(params.id);
  return (
    <div className={styles.categoryContainer}>
      <h1>{post.title}</h1>
      <div className={styles.categoryBox}>
        <div className={styles.textBlock}>
          <b>{post.name}</b>
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
    </div>
  );
};

export default BlogPost;
