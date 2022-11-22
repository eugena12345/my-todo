import React, { useState } from "react";
import styles from "./Task.module.css";

const Task = ({ taskText, taskId, statusDone, taskArray, setTaskArray }) => {
  //также смущает что в пропсах и весь массив задач и отдельная задача передается, но это уйдет, когда будет отправляться на сервер задача
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");
  const [chekced, setChekced] = useState(statusDone);

  const deleteTask = (taskId) => {
    const newtaskArray = taskArray.filter((item) => item.id !== taskId);
    setTaskArray(newtaskArray);
  };
  const editeTask = (taskId, taskText) => {
    //предупреждение в консоли о неконтролруемом инпуте
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
    setTaskArray(changedTaskArray);
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
    setChekced(!chekced);
    const newTaskArray = [...taskArray].map((item) => {
      if (item.id === taskId) {
        item.statusDone = chekced;
      }
      return item;
    });
    setTaskArray(newTaskArray);
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
            checked={chekced}
            onChange={() => changeStatus(taskId)}
          />
          <div className={styles.taskText} onDoubleClick={()=>editeTask(taskId, taskText)}>{taskText}</div>
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
