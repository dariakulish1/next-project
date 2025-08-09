"use client";
import Link from "next/link";
import { title } from "process";
import React, { useState } from "react";
import styles from "./navbar.module.css";
import { Playwrite_AU_QLD } from "next/font/google";
import { signOut, useSession } from "next-auth/react";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contacts",
    url: "/contacts",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

const playwriteFont = Playwrite_AU_QLD({
  subsets: ["latin"],
});

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const session = useSession();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={`${styles.logo} ${playwriteFont.className}`}>
        CreateIT
      </Link>

      <button type="submit" className={styles.hamburger} onClick={toggleMenu}>
        <span
          className={`${styles.hamburgerLine} ${
            isMenuOpen ? styles.active : ""
          }`}
        ></span>
        <span
          className={`${styles.hamburgerLine} ${
            isMenuOpen ? styles.active : ""
          }`}
        ></span>
        <span
          className={`${styles.hamburgerLine} ${
            isMenuOpen ? styles.active : ""
          }`}
        ></span>
      </button>

      <div
        className={`${styles.links} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}
      >
        {links.map((link) => {
          return (
            <Link
              className={styles.link}
              key={link.id}
              href={link.url}
              onClick={closeMenu}
            >
              {link.title}
            </Link>
          );
        })}
        {session.status === "authenticated" && (
          <button
            className={styles.logout}
            onClick={() => {
              signOut();
              closeMenu();
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
