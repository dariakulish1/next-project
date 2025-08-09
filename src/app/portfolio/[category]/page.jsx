import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Button from "@/components/button/Button";
import { items } from "./data.js";
import { notFound } from "next/navigation";

const getData = (categ) => {
  const data = items[categ];
  if (data) {
    return data;
  }
  return notFound();
};
const Category = ({ params }) => {
  const data = getData(params.category);
  return (
    <div className={styles.categoryContainer}>
      <div className={styles.textBlock}>
        <h1>{params.category}</h1>
        {data.map((item) => (
          <div key={item.id}>
            <div>
              <b>{item.title}</b>
              <p>{item.desc}</p>
            </div>
            <div className={styles.imageBlock}>
              <Image
                className={styles.aboutImage}
                src={item.image}
                alt="category"
                width={300}
                height={450}
              />
            </div>
            <Button url="#blog" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
