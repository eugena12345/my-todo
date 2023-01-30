import Task from "./Task";
import styles from "./Tasks.module.css";

const Tasks = ({ taskArray, paginatedTasks, handleTasksArrayChange, params, getTask }) => {
  return (
    <div className={styles.p}>
      {paginatedTasks.length
        ? paginatedTasks.map((el) => {
            return (
              <div key={el._id}>
                <Task
                  taskText={el.text}
                  taskId={el._id}
                  taskArray={taskArray}
                  handleTasksArrayChange={handleTasksArrayChange}
                  statusDone={el.checked}
                  params={params}
                  getTask={getTask}
                />
              </div>
            );
          })
        : "There are no tasks right now"}
    </div>
  );
};

export default Tasks;
