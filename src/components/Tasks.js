import React, { useState } from "react";
import Task from "./Task";
import styles from "./Tasks.module.css";

const Tasks = () => {
  const [taskArray, setTaskArray] = useState([
    {
      id: 1,
      taskText: "buy a cup",
      statusDone: false,
      createDate: "10/01/2022",
    },
    { id: 2, taskText: "bla-bla", statusDone: false, createDate: "10/01/2022" },
    {
      id: 3,
      taskText: "go to the theatre",
      statusDone: false,
      createDate: "10/01/2022",
    },
    {
      id: 4,
      taskText: "bake cookie",
      statusDone: false,
      createDate: "10/01/2022",
    },
  ]);

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
