//import React, { useState } from "react";
import Task from "./Task";
import styles from "./Tasks.module.css";

const Tasks = ({
  taskArray,
  filtredTaskArray,
  setTaskArray,
  // filterTask,
  typeFilterByDate,
  setTypeFilterByDate,
  typeFilterByStatus,
  setTypeFilterByStatus,
}) => {
  return (
    <div className={styles.p}>
      {filtredTaskArray.length
        ? filtredTaskArray.map((el) => {
            return (
              <div key={el.id}>
                <Task
                  taskText={el.taskText}
                  taskId={el.id}
                  taskArray={taskArray}
                  setTaskArray={setTaskArray}
                  statusDone={el.statusDone}
                  // filterTask={filterTask}
                  typeFilterByDate={typeFilterByDate}
                  setTypeFilterByDate={setTypeFilterByDate}
                  typeFilterByStatus={typeFilterByStatus}
                  setTypeFilterByStatus={setTypeFilterByStatus}
                />
              </div>
            );
          })
        : "There are no tasks right now"}
    </div>
  );
};

export default Tasks;
