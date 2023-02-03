import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({pageCount, currentPage, handleCurrentPageChange, paginatedTasks, getTask,
    params}) => {
    // const handlePageChange  = (el) => {
    //     setCurrentPage(el)
    // }
const newParams = {...params}
const getNewPage = (el) => {
    handleCurrentPageChange(el);
    newParams.pageNumber = el;
    getTask(newParams);
}
    
    const pageNumbers = [];
    for (let i=1; i<=pageCount; i++) {
        pageNumbers.push(i)
    }

  return (<div className={styles.p}>
      {pageNumbers.map((el) => {
          return <div key={el}>
          <button className={currentPage===el? styles.current:''} onClick={()=>getNewPage(el)}>{el}</button></div>
      })}
  </div>);
};
//было onClick={()=>handleCurrentPageChange(el)
export default Pagination;
