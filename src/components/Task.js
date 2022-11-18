import React from "react";
import styles from "./Task.module.css";

const Task = (props) => {
  return (
    <div className={styles.taskBox}>
      <input type="checkbox" className={styles.checkbox} />
      <div className={styles.taskText}>{props.taskText}</div>
      <div className={styles.taskButton}>
        <div>Date</div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default Task;
