import TopBar from "./TopBar";
import Tasks from "./Tasks";
import Pagination from "./Pagination";

const Todos = ({
  taskArray,
  handleTasksArrayChange,
  typeSortByDate,
  handleTypeSortByDateChange,
  typeFilterByStatus,
  handleTypeFilterByStatusChange,
  getTask,
  handleIsLoading,
  params,
  handleCurrentPageChange,
  taskCount,
  taskPerPageCount,
  pageCount,
  currentPage,
}) => {
  return (
    <div>
      <TopBar
        taskArray={taskArray}
        handleTasksArrayChange={handleTasksArrayChange}
        typeSortByDate={typeSortByDate}
        handleTypeSortByDateChange={handleTypeSortByDateChange}
        typeFilterByStatus={typeFilterByStatus}
        handleTypeFilterByStatusChange={handleTypeFilterByStatusChange}
        getTask={getTask}
        handleIsLoading={handleIsLoading}
        params={params}
        handleCurrentPageChange={handleCurrentPageChange}
        taskCount={taskCount}
        taskPerPageCount={taskPerPageCount}
      />
      <Tasks
        taskArray={taskArray}
        paginatedTasks={taskArray} ///тут исправлять!!!!!!!!!!!!
        handleTasksArrayChange={handleTasksArrayChange}
        params={params}
        getTask={getTask}
      />
      {pageCount > 1 ? (
        <Pagination
          pageCount={pageCount}
          currentPage={currentPage}
          handleCurrentPageChange={handleCurrentPageChange}
          getTask={getTask}
          params={params}
        />
      ) : null}
    </div>
  );
};

export default Todos;
