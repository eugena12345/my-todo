import Task from "./Task";
import styles from "./Tasks.module.css";

const Tasks = ({ taskArray, filtredTaskArray, handleTasksArrayChange }) => {
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
                  handleTasksArrayChange={handleTasksArrayChange}
                  statusDone={el.statusDone}
                />
              </div>
            );
          })
        : "There are no tasks right now"}
    </div>
  );
};

export default Tasks;
