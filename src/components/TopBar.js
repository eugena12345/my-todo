import React, { useState } from "react";
import styles from "./Top.module.css";
//import { v4 as uuidv4 } from "uuid";
import axios from "axios";
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
  handleCurrentPageChange,
  taskCount,
  taskPerPageCount,
  handleIsLoading,
  handleIsLogged,
}) => {
  const [value, setValue] = useState("");
  const newParams = { ...params };

  const addTask = () => {
    if (value === "") {
      return;
    }
    let newCurrentPage;
    if (newParams.typeOfSort === "ASC") {
      newCurrentPage = Math.ceil(taskCount / taskPerPageCount);
      if (taskCount / taskPerPageCount - newCurrentPage === 0) {
        newCurrentPage = Math.ceil(taskCount / taskPerPageCount + 1);
        console.log(newCurrentPage);
      }
    } else {
      newCurrentPage = 1;
      console.log(newCurrentPage);
    }

    handleCurrentPageChange(newCurrentPage);
    newParams.pageNumber = newCurrentPage;
    //handleIsLoading(true);
    //добавить переадресацию на последнюю страницу, при добавлении новой задачи и если сортировка от старых к новым, или на первую страницу, если от новых к старым???
    axios
      .post(`http://localhost:5000/task`, { text: value, userId: newParams.userId})
      .then(getTask(newParams));
    setValue("");
    //handleIsLoading(false);
  };

  const addTaskWithEnter = (event) => {
    if (event.keyCode === 13) {
      addTask();
    }
  };

  const sortByDate = (type) => {
    handleTypeSortByDateChange(type);
    //это костыль?
    newParams.typeOfSort = type;
    getTask(newParams);
  };

  const sortByStatus = (type) => {
    handleTypeFilterByStatusChange(type);
    newParams.checked = type;
    getTask(newParams);
  };

  const setLogOut = () => {
    handleIsLogged('')
    // добавить запрос на логаут на бэк чтобы удалить токен из куки
  }

  return (
    <div className={styles.first}>
      <button onClick={setLogOut}>LogOut</button>
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
