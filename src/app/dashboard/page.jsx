"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BounceLoader } from "react-spinners";
import Image from "next/image";

export const Dashboard = () => {
  const session = useSession();
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/posts?username=${session?.data?.user.name}`,
    fetcher
  );
  console.log(data);

  if (session.status === "loading") {
    return (
      <div style={{ margin: "auto" }}>
        <BounceLoader />
        Loading...
      </div>
    );
  }
  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const img = e.target[1].value;
    const content = e.target[2].value;

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          img,
          content,
          username: session.data.user.name,
        }),
      });
      e.target.reset();
    } catch (err) {
      console.log(err);
    }
  };

  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {isLoading ? (
            <p style={{ margin: "auto" }}>
              <BounceLoader />
              ...Loading
            </p>
          ) : (
            data?.map((post) => {
              <div key={post.id}>
                <div className={styles.imgBox}>
                  <Image width={400} height={500} src={post.img} alt="" />
                </div>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <span className={styles.postDelete}>X</span>
              </div>;
            })
          )}
        </div>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Add new post</h1>
          <input type="text" placeholder="Title" className={styles.input} />
          <input type="text" placeholder="Image URL" className={styles.input} />
          <textarea
            placeholder="Tell more about your post..."
            className={styles.textarea}
          />
          <button>Publish</button>
        </form>
      </div>
    );
  }
};

export default Dashboard;
