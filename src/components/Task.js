import React, { useState } from "react";
import styles from "./Task.module.css";

const Task = ({ taskText, taskId, taskArray, setTaskArray }) => {
  //также смущает что в пропсах и весь массив задач и отдельная задача передается, но это уйдет, когда будет отправляться на сервер задача
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");

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

  return (
    <div>
      {edit ? (
        <div className={styles.editTask}>
          <input className={styles.input} onChange={(e) => setValue(e.target.value)} value={value} />
          <button onClick={() => saveChangedTask(taskId)}>Save</button>
        </div>
      ) : (
        <div className={styles.taskBox}>
          <input type="checkbox" className={styles.checkbox} />
          <div className={styles.taskText}>{taskText}</div>
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
