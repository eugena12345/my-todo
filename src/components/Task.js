import React from "react";
import styles from "./Task.module.css";

const Task = ({taskText, taskId, taskArray, setTaskArray}) => {
const deleteTask = (taskId) => {
const newtaskArray = taskArray.filter(item => item.id !== taskId)
setTaskArray(newtaskArray);
}
const editeTask = (taskId) => {
    console.log('edite task '+ taskId + taskText);
    }
  return (
    <div className={styles.taskBox}>
      <input type="checkbox" className={styles.checkbox} />
      <div className={styles.taskText}>{taskText}</div>
      <div className={styles.taskButton}>
        <div>Date</div>
        <button onClick={()=>editeTask(taskId)}>Edit</button>
        <button onClick={()=>deleteTask(taskId)}>Delete</button>
      </div>
    </div>
  );
};

export default Task;
