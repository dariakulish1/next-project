"use client";
import React from "react";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import { BounceLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const Login = () => {
  const session = useSession();
  const router = useRouter();
  if (session.status === "loading") {
    return (
      <div style={{ margin: "auto" }}>
        <BounceLoader />
        Loading...
      </div>
    );
  }
  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    signIn("credentials", { email, password });
  };
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <h1 className={styles.title}>Login</h1>
          </div>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={styles.input}
                placeholder="Enter your email address"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="message" className={styles.label}>
                Password
              </label>
              <input
                id="password"
                name="password"
                className={styles.input}
                placeholder="Password..."
                type="password"
              />
            </div>

            <button type="submit" className={styles.sendButton}>
              <span className={styles.buttonText}>Login</span>
            </button>
          </form>
          {/* {error && (
            <span className={styles.error}>
              Something went wrong, please try again later.
            </span>
          )} */}
        </div>
      </div>
      <button type="submit" onClick={() => signIn("google")}>
        Login with google
      </button>
    </div>
  );
};

export default Login;
