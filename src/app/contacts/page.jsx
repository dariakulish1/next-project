import React from "react";
import styles from "./page.module.css";

export const metadata = {
  title: "CreateIt Contacts",
  description: "Contact Page",
};

const Contacts = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Get in Touch</h1>
        </div>

        <form className={styles.contactForm}>
          <div className={styles.nameGroup}>
            <div className={styles.inputGroup}>
              <label htmlFor="firstName" className={styles.label}>
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={styles.input}
                placeholder="Enter your first name"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="lastName" className={styles.label}>
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={styles.input}
                placeholder="Enter your last name"
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
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className={styles.textarea}
              placeholder="Message..."
              rows="6"
            ></textarea>
          </div>

          <button type="submit" className={styles.sendButton}>
            <span className={styles.buttonText}>Send Message</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contacts;
