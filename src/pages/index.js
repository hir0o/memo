import React from "react";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

export default function Home() {
  return (
    <Layout
      title={`Hello}`}
      description="Description will go into a meta tag in <head />"
    >
      <div className={styles.header}>
        <h1>やあ！👋</h1>
        <h2>hir0oの個人的なメモ置き場です</h2>
      </div>
    </Layout>
  );
}
