//import React, { useState } from "react";
import Task from "./Task";
import styles from "./Tasks.module.css";

const Tasks = ({taskArray, setTaskArray}) => {
  

  return (
    <div className={styles.p}>
      {taskArray.length
        ? taskArray.map((el) => {
            return (
              <div key={el.id}>
                <Task
                  taskText={el.taskText}
                  taskId={el.id}
                  taskArray={taskArray}
                  setTaskArray={setTaskArray}
                />
              </div>
            );
          })
        : "There are no tasks right now"}
    </div>
  );
};

export default Tasks;
