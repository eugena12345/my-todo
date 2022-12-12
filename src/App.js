import "./App.css";
import TopBar from "./components/TopBar";
import Tasks from "./components/Tasks";
import Pagination from "./components/Pagination";
import { useState } from "react";

function App() {
  const [taskArray, setTaskArray] = useState([
    {
      id: 1,
      taskText: "buy a cup",
      statusDone: false,
      createDate: 1,
    },
    { id: 2, taskText: "bla-bla", statusDone: true, createDate: 5 },
    {
      id: 3,
      taskText: "go to the theatre",
      statusDone: false,
      createDate: 7,
    },
    {
      id: 4,
      taskText: "bake cookie",
      statusDone: true,
      createDate: 15,
    },
  ]);
  const handleTasksArrayChange = (value) => {
    setTaskArray(value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const handleCurrentPageChange = (value) => {
    setCurrentPage(value);
  };
  const [typeSortByDate, setTypeSortByDate] = useState("OLD");
  const handleTypeSortByDateChange = (value) => {
    setTypeSortByDate(value);
  };

  const [typeFilterByStatus, setTypeFilterByStatus] = useState("ALL");
  const handleTypeFilterByStatusChange = (value) => {
    setTypeFilterByStatus(value);
  };

  const filteredTasksBStatus = (() => {
    return taskArray.filter(
      (item) =>
        item.statusDone === (typeFilterByStatus === "DONE") ||
        typeFilterByStatus === "ALL"
    );
  })();

  const sortedTasksByDate = (() => {
    return [...filteredTasksBStatus].sort((a, b) =>
      typeSortByDate === "OLD"
        ? a.createDate - b.createDate
        : b.createDate - a.createDate
    );
  })();

  let pageCount = Math.ceil(sortedTasksByDate.length / 5);

  const paginatedTasks = (() => {
    if (currentPage > pageCount) {
      handleCurrentPageChange(1);
    }
    const lastNumber = currentPage * 5;
    const firstNumber = lastNumber - 5;
    return sortedTasksByDate.slice(firstNumber, lastNumber);
  })();

  return (
    <div className="conainer">
      <TopBar
        taskArray={taskArray}
        handleTasksArrayChange={handleTasksArrayChange}
        typeSortByDate={typeSortByDate}
        handleTypeSortByDateChange={handleTypeSortByDateChange}
        typeFilterByStatus={typeFilterByStatus}
        handleTypeFilterByStatusChange={handleTypeFilterByStatusChange}
      />
      <Tasks
        taskArray={taskArray}
        paginatedTasks={paginatedTasks}
        handleTasksArrayChange={handleTasksArrayChange}
      />
      {pageCount > 1 ? (
        <Pagination
          pageCount={pageCount}
          currentPage={currentPage}
          handleCurrentPageChange={handleCurrentPageChange}
        />
      ) : null}
    </div>
  );
}

export default App;
