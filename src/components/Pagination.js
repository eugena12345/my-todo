import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({pageCount, currentPage, setCurrentPage}) => {
    
    const pageNumbers = [];
    for (let i=1; i<=pageCount; i++) {
        pageNumbers.push(i)
    }

  return (<div className={styles.p}>
      {pageNumbers.map((el) => {
          return <div key={el}>
          <button className={currentPage===el? styles.used:''} onClick={()=>setCurrentPage(el)}>{el}</button></div>
      })}
  </div>);
};

export default Pagination;
