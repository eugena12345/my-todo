import React from "react";
import styles from "./Top.module.css";

const Top = () => {
  return (
    <div className={styles.first}>
      <h1>To Do</h1>
      <div className={styles.inputTask}>
        <input></input>
        <button>Add Task</button>
      </div>
      <div className={styles.select}>
        <div className={styles.selectDate}>
          <button>New</button>
          <button>Old</button>
        </div>
        <div className={styles.selectDone}>
          <button>All</button>
          <button>Undone</button>
          <button>Done</button>
        </div>
      </div>
    </div>
  );
};

export default Top;
