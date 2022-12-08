import React, { useState } from "react";
import styles from "./Task.module.css";

const Task = ({
  taskText,
  taskId,
  statusDone,
  taskArray,
  handleTasksArrayChange,
}) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(statusDone);

  const deleteTask = (taskId) => {
    const newtaskArray = taskArray.filter((item) => item.id !== taskId);
    handleTasksArrayChange(newtaskArray);
  };
  const editeTask = (taskId, taskText) => {
    setEdit(true);
    setValue(taskText);
  };

  const saveChangedTask = (taskId) => {
    const changedTaskArray = [...taskArray].map((item) => {
      if (item.id === taskId) {
        item.taskText = value;
      }
      return item;
    });
    handleTasksArrayChange(changedTaskArray);
    setEdit(false);
  };
  const changeTaskWithEnter = (event, taskId) => {
    if (event.keyCode === 13) {
      saveChangedTask(taskId);
    }
    if (event.key === "Escape") {
      setEdit(false);
    }
  };

  const changeStatus = (taskId) => {
    setChecked(!checked);
    const newTaskArray = taskArray.map((item) => {
      if (item.id === taskId) {
        return { ...item, statusDone: !checked };
      }
      return item;
    });
    handleTasksArrayChange(newTaskArray);
  };

  return (
    <div>
      {edit ? (
        <div className={styles.editTask}>
          <input
            className={styles.input}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            onKeyDown={(event) => {
              changeTaskWithEnter(event, taskId);
            }}
          />
          <button onClick={() => saveChangedTask(taskId)}>Save</button>
        </div>
      ) : (
        <div className={styles.taskBox}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={checked}
            onChange={() => changeStatus(taskId)}
          />
          <div
            className={styles.taskText}
            onDoubleClick={() => editeTask(taskId, taskText)}
          >
            {taskText}
          </div>
          <div className={styles.taskButton}>
            <div>Date</div>
            <button onClick={() => editeTask(taskId, taskText)}>Edit</button>
            <button onClick={() => deleteTask(taskId)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
