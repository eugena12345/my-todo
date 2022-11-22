import React, { useState } from "react";
import styles from "./Top.module.css";
import { v4 as uuidv4 } from "uuid";

const Top = ({ taskArray, setTaskArray }) => {
  const [value, setValue] = useState("");
  const addTask = () => {
    if (value === "") {
      return;
    }
    const newTaskArray = [
      ...taskArray,
      {
        id: uuidv4(),
        taskText: value,
        statusDone: false,
        createDate: "10/01/2022",
      },
    ];
    setTaskArray(newTaskArray);
    setValue("");
  };

  const addTaskWithEnter = (event) => {
    if (event.keyCode === 13) {
      addTask();
    }
  };

  return (
    <div className={styles.first}>
      <h1>To Do</h1>
      <div className={styles.inputTask}>
        <input
          onChange={(e) => setValue(e.target.value)}
          placeholder="input a task"
          value={value}
          onKeyDown={addTaskWithEnter}
        ></input>
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
