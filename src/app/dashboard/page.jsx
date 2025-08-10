"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import useSWR, { mutate } from "swr";
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
          name: session.data.user.name,
        }),
      });
      e.target.reset();
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (err) {
      console.log(err);
    }
  };

  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.dashboardTitle}>Dashboard</h1>
          <p className={styles.welcomeText}>
            Welcome back, {session.data.user.name}!
          </p>
        </div>
        <form className={styles.newPostForm} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>Create New Post</h2>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Post Title"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="url"
              placeholder="Image URL"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <textarea
              placeholder="Write your post content here..."
              className={styles.textarea}
              rows="6"
              required
            />
          </div>
          <button type="submit" className={styles.publishBtn}>
            Publish Post
          </button>
        </form>

        <div className={styles.postsSection}>
          <h2 className={styles.sectionTitle}>Your Posts</h2>
          <div className={styles.posts}>
            {isLoading ? (
              <div className={styles.loadingContainer}>
                <BounceLoader color="#8691cdff" />
                <p className={styles.loadingText}>Loading your posts...</p>
              </div>
            ) : data && data.length > 0 ? (
              data.map((post) => (
                <div key={post._id} className={styles.postCard}>
                  <div className={styles.postImage}>
                    <Image
                      width={300}
                      height={200}
                      src={post.img}
                      alt={post.title}
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.postContent}>
                    <h3 className={styles.postTitle}>{post.title}</h3>
                    <p className={styles.postExcerpt}>
                      {post.content.length > 100
                        ? `${post.content.substring(0, 100)}...`
                        : post.content}
                    </p>
                    <div className={styles.postActions}>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(post._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <p className={styles.emptyText}>
                  No posts yet. Create your first post above!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
