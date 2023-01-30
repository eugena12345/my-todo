import React, { useState } from "react";
import styles from "./Task.module.css";
import axios from "axios";

const Task = ({
  taskText,
  taskId,
  statusDone,
  taskArray,
  handleTasksArrayChange,
  params,
  getTask,
}) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");
  const [isChecked, setIsChecked] = useState(statusDone);

  const deleteTask = (taskId) => {
    axios
      .delete(`http://localhost:5000/task/${taskId}`)
      .then((res) => {
        getTask(params);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const editeTask = (taskId, taskText) => {
    setEdit(true);
    setValue(taskText);
  };

  const saveChangedTask = (taskId) => {
    axios
      .patch(`http://localhost:5000/task/${taskId}`, { text: value })
      .then(
        console.log(
          "-retext--retext--retext--retext--retext--retext--retext--retext-"
        )
      )
      .then((res) => {
        getTask(params);
      })
      .catch(function (error) {
        console.log(error);
      });
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
  //////////////////HELP_________HELP_____________HELP___________HELP
  const changeStatus = (taskId) => {
    console.log(isChecked);
    axios
      .patch(`http://localhost:5000/task/${taskId}`, { checked: !isChecked })
      .then(
        console.log(
          "-o--V---o--V--o--V--o--V--o--V--o--V--o--V--o--V--o--V--o--V--o--V--o--V--o--V-"
        )
      )
      .then((res) => {
        getTask(params);
        setIsChecked(!isChecked);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //////////////////////////////////////////////

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
            checked={isChecked}
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
