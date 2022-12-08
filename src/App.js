import "./App.css";
import Top from "./components/Top";
import Tasks from "./components/Tasks";
import Pagination from "./components/Pagination";
import { useEffect, useState } from "react";

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
    setTaskArray(value)
  }
  // const [filtredTaskArray, setFiltredTaskArray] = useState(taskArray);
  const [currentPage, setCurrentPage] = useState(1);
  const [typeFilterByDate, setTypeFilterByDate] = useState("OLD"); // rename
  const [typeFilterByStatus, setTypeFilterByStatus] = useState("ALL");

  ////////////////////////////////////////////////////////////////////////////
  // const filterTasksByStatus = (arr) => {
  //   return arr.filter(
  //     (item) =>
  //       item.statusDone === (typeFilterByStatus === "DONE") ||
  //       typeFilterByStatus === "ALL"
  //   );
  // };

  // const sortTasksByDate = (arr) => {
  //   return [...arr].sort((a, b) =>
  //     typeFilterByDate === "OLD"
  //       ? a.createDate - b.createDate
  //       : b.createDate - a.createDate
  //   );
  // };

  // const filteredTasksBStatus = filterTasksByStatus(taskArray)
  // const sortedTasksByDate = sortTasksByDate(filteredTasksBStatus)
  //////////////////////////////////////////////////////////////////////////////


  const filteredTasksBStatus = (() => {
    return taskArray.filter(
      (item) =>
        item.statusDone === (typeFilterByStatus === "DONE") ||
        typeFilterByStatus === "ALL"
    );
  })();

  const sortedTasksByDate = (() => {
    return [...filteredTasksBStatus].sort((a, b) =>
      typeFilterByDate === "OLD"
        ? a.createDate - b.createDate
        : b.createDate - a.createDate
    );
  })();


  const paginatedTasks = (() => {

  })()

  // const filterTask = (typeFilterByDate, typeFilterByStatus) => {
  //   let arrForFilterByStatus;
  //   if (typeFilterByStatus === "DONE") {
  //     arrForFilterByStatus = taskArray.filter(
  //       (item) => item.statusDone === true
  //     );
  //   }
  //   if (typeFilterByStatus === "UNDONE") {
  //     arrForFilterByStatus = taskArray.filter(
  //       (item) => item.statusDone === false
  //     );
  //   }
  //   if (typeFilterByStatus === "ALL") {
  //     //нужна копия массива а не ссылка
  //     arrForFilterByStatus = taskArray.filter((item) => item);
  //   }

  //   let arrForFilterByDate;
  //   if (typeFilterByDate === "OLD") {
  //     arrForFilterByDate = arrForFilterByStatus.sort(
  //       (a, b) => a.createDate - b.createDate
  //     );
  //   }
  //   if (typeFilterByDate === "NEW") {
  //     arrForFilterByDate = arrForFilterByStatus.sort(
  //       (a, b) => b.createDate - a.createDate
  //     );
  //   }
  //   setFiltredTaskArray(arrForFilterByDate);
  // };

  let pageCount = Math.ceil(sortedTasksByDate.length / 5);
  // если удалить все задачи, то все ломается

  // if (pageCount < currentPage) {
  //   setCurrentPage(1); ////// yyyyyyyyyyyyyyyyyyyyyy
  // }
  const lastNumber = currentPage * 5;
  const firstNumber = lastNumber - 5;

  const forPrint = sortedTasksByDate.slice(firstNumber, lastNumber);

  // useEffect(() => {
  //   setFiltredTaskArray(taskArray);
  //   filterTask(typeFilterByDate, typeFilterByStatus);
  // }, [taskArray]);

  return (
    <div className="conainer">
      <Top
        taskArray={taskArray}
        setTaskArray={handleTasksArrayChange}
        // setFiltredTaskArray={setFiltredTaskArray}
        filtredTaskArray={sortedTasksByDate}
        // filterTask={filterTask}
        typeFilterByDate={typeFilterByDate}
        setTypeFilterByDate={setTypeFilterByDate}
        typeFilterByStatus={typeFilterByStatus}
        setTypeFilterByStatus={setTypeFilterByStatus}
      />
      <Tasks
        taskArray={taskArray}
        //задачи после пагинации было filtredTaskArray
        filtredTaskArray={forPrint}
        setTaskArray={setTaskArray}
        // filterTask={filterTask}
        typeFilterByDate={typeFilterByDate}
        setTypeFilterByDate={setTypeFilterByDate}
        typeFilterByStatus={typeFilterByStatus}
        setTypeFilterByStatus={setTypeFilterByStatus}
      />
      {pageCount > 1 ? (
        <Pagination
          pageCount={pageCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : null}
    </div>
  );
}

export default App;
