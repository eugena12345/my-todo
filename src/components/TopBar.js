import React, { useState } from "react";
import styles from "./Top.module.css";
import { v4 as uuidv4 } from "uuid";

const TopBar = ({
  taskArray,
  handleTasksArrayChange,
  typeSortByDate,
  handleTypeSortByDateChange,
  typeFilterByStatus,
  handleTypeFilterByStatusChange,
}) => {
  const [value, setValue] = useState("");

  //не перерисовывается после того как понажимаешь кнопки сделано не сделано, потом все и сортировка по дате не перерисовывается.
  //если какая-то задача помечена как выполненная при нажатой кнопке невыполнена, то она не перескакивает в выполненную
  // при добавлении задачи перерисовываятся неотсортированный список задач
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
    //тут идет задержка типа сортировки
    console.log(type);
    //возможно тут не нужно вызывать фильтрацию
    
  };

  const sortByStatus = (type) => {
    handleTypeFilterByStatusChange(type);
    //тут идет задержка типа сортировки
    console.log(type);
    //возможно тут не нужно вызывать фильтрацию
    
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
            onClick={() => sortByDate("NEW")}
            className={typeSortByDate === "NEW" ? styles.current : ""}
          >
            New
          </button>
          <button
            onClick={() => sortByDate("OLD")}
            className={typeSortByDate === "OLD" ? styles.current : ""}
          >
            Old
          </button>
        </div>
        <div className={styles.selectDone}>
          <button
            onClick={() => sortByStatus("ALL")}
            className={typeFilterByStatus === "ALL" ? styles.current : ""}
          >
            All
          </button>
          <button
            onClick={() => sortByStatus("UNDONE")}
            className={typeFilterByStatus === "UNDONE" ? styles.current : ""}
          >
            Undone
          </button>
          <button
            onClick={() => sortByStatus("DONE")}
            className={typeFilterByStatus === "DONE" ? styles.current : ""}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
