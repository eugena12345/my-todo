import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({pageCount}) => {
    
    const pageNumbers = [];
    for (let i=1; i<=pageCount; i++) {
        pageNumbers.push(i)
    }

  return (<div className={styles.p}>
      {pageNumbers.map((el) => {
          return <div key={el}>
          <button>{el}</button></div>
      })}
  </div>);
};

export default Pagination;
