import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Button from "@/components/button/Button";

const Category = ({ params }) => {
  return (
    <div className={styles.categoryContainer}>
      <div className={styles.textBlock}>
        <h1>{params.category}</h1>
        <p>Creative works</p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam magni
          molestias ipsum vel quaerat facere quis error ullam dolorem distinctio
          asperiores corrupti, aut, delectus dolores officia accusantium
          reprehenderit mollitia aliquid?
        </p>
        <Button url="#blog" />
      </div>
      <div className={styles.imageBlock}>
        <Image
          className={styles.aboutImage}
          src="/categoryMain.png"
          alt="category"
          width={300}
          height={450}
        />
      </div>
    </div>
  );
};

export default Category;
