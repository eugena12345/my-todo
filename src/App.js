import "./App.css";
import TopBar from "./components/TopBar";
import Tasks from "./components/Tasks";
import Pagination from "./components/Pagination";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [taskArray, setTaskArray] = useState([]);
  const handleTasksArrayChange = (value) => {
    setTaskArray(value);
  };
  const [taskCount, setTaskCount] = useState(0);
  const handleTaskCountChange = (value) => {
    setTaskCount(value);
  };

  const getTask = (params) => {
    
    axios
      .get(`http://localhost:5000/tasks`, {params: params}
      
      // {
      //   params: {
      //     typeOfSort: typeSortByDate,
      //     pageNumber: currentPage,
      //     checked: typeFilterByStatus,
      //     limitOnPage: taskPerPageCount,
      //   },
      // }
      )
      .then((response) => {
        console.log(response.data);
        console.log("hi from getTasks))))))))))))))))))");
        handleTasksArrayChange(response.data.tasks);
        handleTaskCountChange(response.data.taskCounter);
        //?????????????как это реализовать через async await получается нужно создать функцию и тут же вызвать, она выглядит более громоздко/ этот вопрос был до вынесения в отдельную функцию. функция была внутри юзэффекта
      });
  };

  useEffect(() => {
    getTask(params);
  }, []);

  //создать функцию запроса списка задач с сервера и передать ее в пропсы

  const [currentPage, setCurrentPage] = useState(1);
  const handleCurrentPageChange = (value) => {
    setCurrentPage(value);
  };
  const [typeSortByDate, setTypeSortByDate] = useState("ASC");
  const handleTypeSortByDateChange = (value) => {
    setTypeSortByDate(value);
  };

  const [typeFilterByStatus, setTypeFilterByStatus] = useState();
  const handleTypeFilterByStatusChange = (value) => {
    setTypeFilterByStatus(value);
  };

  // const filteredTasksBStatus = (() => {
  //   return taskArray.filter(
  //     (item) =>
  //       item.statusDone === (typeFilterByStatus === "DONE") ||
  //       typeFilterByStatus === "ALL"
  //   );
  // })();

  // const sortedTasksByDate = (() => {
  //   return [...filteredTasksBStatus].sort((a, b) =>
  //     typeSortByDate === "OLD"
  //       ? a.createdAt - b.createdAt
  //       : b.createdAt - a.createdAt
  //   );
  // })();
  const taskPerPageCount = 5;
  let pageCount = Math.ceil(taskCount / taskPerPageCount);

  // const paginatedTasks = (() => {
  //   if (currentPage > pageCount) {
  //     handleCurrentPageChange(1);
  //   }
  //   const lastNumber = currentPage * 5;
  //   const firstNumber = lastNumber - 5;
  //   return sortedTasksByDate.slice(firstNumber, lastNumber);
  // })();


  //гы, один парамс или парамс-парамс)))
  let params =  {
    typeOfSort: typeSortByDate,
    pageNumber: currentPage,
    checked: typeFilterByStatus,
    limitOnPage: taskPerPageCount,
  }
  return (
    <div className="conainer">
      {/* LOADING */}
      <TopBar
        taskArray={taskArray}
        handleTasksArrayChange={handleTasksArrayChange}
        typeSortByDate={typeSortByDate}
        handleTypeSortByDateChange={handleTypeSortByDateChange}
        typeFilterByStatus={typeFilterByStatus}
        handleTypeFilterByStatusChange={handleTypeFilterByStatusChange}
        getTask={getTask}
        params={params}
      />
      <Tasks
        taskArray={taskArray}
        paginatedTasks={taskArray} ///тут исправлять!!!!!!!!!!!!
        handleTasksArrayChange={handleTasksArrayChange}
        params = {params}
        getTask={getTask}
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
