"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { set } from "mongoose";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register = () => {
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      res.status === 201 &&
        router.push("/dashboard/login?success=Account has been created");
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Register form</h1>
        </div>
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.nameGroup}>
            <div className={styles.inputGroup}>
              <label htmlFor="firstName" className={styles.label}>
                Username
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={styles.input}
                placeholder="Enter username"
              />
            </div>
          </div>

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
            <span className={styles.buttonText}>Register</span>
          </button>
        </form>
        {error && (
          <span className={styles.error}>
            Something went wrong, please try again later.
          </span>
        )}
        <Link className={styles.link} href="/dashboard/login">
          Login with an existing account
        </Link>
      </div>
    </div>
  );
};

export default Register;
