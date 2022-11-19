import React from "react";
import styles from "./Pagination.module.css";

const Pagination = () => {
    const pageNumbers = [1,2,3]
  return (<div className={styles.p}>
      {pageNumbers.map((el) => {
          return <div key={el}>
          <button>{el}</button></div>
      })}
  </div>);
};

export default Pagination;
