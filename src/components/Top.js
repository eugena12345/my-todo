import React, { useState } from "react";
import styles from "./Top.module.css";

const Top = ({ taskArray, setTaskArray }) => {
  const [value, setValue] = useState("");
  const addTask = () => {
    const newTaskArray = [
      ...taskArray,
      {
        id: 1,
        taskText: value,
        statusDone: false,
        createDate: "10/01/2022",
      },
    ];
    setTaskArray(newTaskArray);
    setValue('');
  };
  return (
    <div className={styles.first}>
      <h1>To Do</h1>
      <div className={styles.inputTask}>
        <input onChange={(e) => setValue(e.target.value)} value={value}></input>
        <button onClick={addTask}>Add Task</button>
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
