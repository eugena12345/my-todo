import React from "react";
import styles from "./Pagination.module.css";

const Pagination = () => {
    const pageNumbers = [1,2,3]
  return (<div className={styles.p}>
      {pageNumbers.map((el) => {
          return <button>{el}</button>
      })}
  </div>);
};

export default Pagination;
