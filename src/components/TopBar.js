import React, { useState } from "react";
import styles from "./Top.module.css";
import { v4 as uuidv4 } from "uuid";
const ALL = null;
const DONE = true;
const UNDONE = false;


const TopBar = ({
  taskArray,
  handleTasksArrayChange,
  typeSortByDate,
  handleTypeSortByDateChange,
  typeFilterByStatus,
  handleTypeFilterByStatusChange,
  getTask,
  params,
}) => {
  const [value, setValue] = useState("");

  const addTask = () => {
    if (value === "") {
      return;
    }
    // здесь отправляем пост запрос через аксиос с текстом задачи

    const newTaskArray = [
      ...taskArray,
      {
        id: uuidv4(),
        taskText: value,
        statusDone: false,
        createDate: Date.now(),
      },
    ];
    handleTasksArrayChange(newTaskArray);
    setValue("");
  };

  const addTaskWithEnter = (event) => {
    if (event.keyCode === 13) {
      addTask();
    }
  };

  const sortByDate = (type) => {
    handleTypeSortByDateChange(type);
    //это костыль?
    const newParams = { ...params };
    newParams.typeOfSort = type;
    getTask(newParams);
  };

  const sortByStatus = (type) => {
    handleTypeFilterByStatusChange(type);
    const newParams = { ...params };
    newParams.checked = type;
    getTask(newParams);
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
          {/* тут нужо менять названия и способ использования функции */}
          <button
            onClick={() => sortByDate("DESC")}
            className={typeSortByDate === "DESC" ? styles.current : ""}
          >
            New
          </button>
          <button
            onClick={() => sortByDate("ASC")}
            className={typeSortByDate === "ASC" ? styles.current : ""}
          >
            Old
          </button>
        </div>
        <div className={styles.selectDone}>
          <button
            onClick={() => sortByStatus(ALL)}
            className={typeFilterByStatus === ALL ? styles.current : ""}
          >
            All
          </button>
          <button
            onClick={() => sortByStatus(UNDONE)}
            className={typeFilterByStatus === UNDONE ? styles.current : ""}
          >
            Undone
          </button>
          <button
            onClick={() => sortByStatus(DONE)}
            className={typeFilterByStatus === DONE ? styles.current : ""}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
