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
  const [filtredTaskArray, setFiltredTaskArray] = useState(taskArray);
  const [currentPage, setCurrentPage] = useState(1);
  const [typeFilterByDate, setTypeFilterByDate] = useState("OLD");
  const [typeFilterByStatus, setTypeFilterByStatus] = useState("ALL");

  const filterTask = (typeFilterByDate, typeFilterByStatus) => {
    let arrForFilterByStatus;
    if (typeFilterByStatus === "DONE") {
      arrForFilterByStatus = taskArray.filter(
        (item) => item.statusDone === true
      );
    }
    if (typeFilterByStatus === "UNDONE") {
      arrForFilterByStatus = taskArray.filter(
        (item) => item.statusDone === false
      );
    }
    if (typeFilterByStatus === "ALL") {
      //нужна копия массива а не ссылка
      arrForFilterByStatus = taskArray.filter((item) => item);
    }

    let arrForFilterByDate;
    if (typeFilterByDate === "OLD") {
      arrForFilterByDate = arrForFilterByStatus.sort(
        (a, b) => a.createDate - b.createDate
      );
    }
    if (typeFilterByDate === "NEW") {
      arrForFilterByDate = arrForFilterByStatus.sort(
        (a, b) => b.createDate - a.createDate
      );
    }
    setFiltredTaskArray(arrForFilterByDate);
  };

  let pageCount = Math.ceil(filtredTaskArray.length / 5) || 1;
  // если удалить все задачи, то все ломается

  if (pageCount < currentPage) {
    setCurrentPage(1);
  }
  const lastNumber = currentPage * 5;
  const firstNumber = lastNumber - 5;

  const forPrint = filtredTaskArray.slice(firstNumber, lastNumber);

  useEffect(() => {
    setFiltredTaskArray(taskArray);
    filterTask(typeFilterByDate, typeFilterByStatus);
  }, [taskArray]);

  return (
    <div className="conainer">
      <Top
        taskArray={taskArray}
        setTaskArray={setTaskArray}
        setFiltredTaskArray={setFiltredTaskArray}
        filtredTaskArray={filtredTaskArray}
        filterTask={filterTask}
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
        filterTask={filterTask}
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
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
