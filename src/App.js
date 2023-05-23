import "./App.css";

import { useEffect, useState } from "react";
import axios from "axios";
import LogIn from "./components/LogIn";
import { Routes, Route, Link } from "react-router-dom";
import Todos from "./components/Todos";
import RequireAuth from "./hoc/RequireAuth";
import Login2 from "./components/Login2";

function App() {
  const [isLogged, setIsLogged] = useState({ accsessToken: "" }); //поменять название на token
  const handleIsLogged = (value) => {
    setIsLogged({ accsessToken: value });
  };
  const [taskArray, setTaskArray] = useState([]);
  const handleTasksArrayChange = (value) => {
    setTaskArray(value);
  };
  const [taskCount, setTaskCount] = useState(0);
  const handleTaskCountChange = (value) => {
    setTaskCount(value);
  };
  const [isLoading, setIsLoading] = useState(false);
  const handleIsLoading = (value) => {
    setIsLoading(value);
  };
  const [userId, setUserId] = useState(null);

  const handleUserId = (value) => {
    setUserId(value);
  };
  let newLoading = false;
  const getTask = (params) => {
    //тут не изменяется состоятние isLoading
    // setIsLoading(prevState=>!prevState);
    // console.log(isLoading)    ;
    newLoading = true;
    console.log("запрашиваются таски");
    console.log('^^^^^^^^^^^^^^^^^^^^^^^6', isLogged.accsessToken);

    axios
      .get(
        `http://localhost:5000/tasks`,
        { params: params,           headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "authorization": `Bearer ${isLogged.accsessToken}`,
        }, },

      )
      .then((response) => {
        console.log(response.data);
        handleTasksArrayChange(response.data.tasks);
        handleTaskCountChange(response.data.taskCounter);
        //?????????????как это реализовать через async await получается нужно создать функцию и тут же вызвать, она выглядит более громоздко/ этот вопрос был до вынесения в отдельную функцию. функция была внутри юзэффекта
      });
    // setIsLoading(prevState=>!prevState);
    // console.log(isLoading);
    newLoading = false;
  };

  useEffect(() => {
    getTask(params);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const handleCurrentPageChange = (value) => {
    setCurrentPage(value);

    //хотелось бы прямо здесь добавить вызов получить таски, но не успевает измениться страница в объекте с данными о новой текущей странице
    //getTask(params);
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
  let params = {
    typeOfSort: typeSortByDate,
    pageNumber: currentPage,
    checked: typeFilterByStatus,
    limitOnPage: taskPerPageCount,
    userId: userId,
  };
  return (
    <div className="conainer">
      {newLoading ? <h1>"LOADING"</h1> : null}
      <Routes>
        <Route
          path="/login"
          element={
            <Login2
              handleIsLogged={handleIsLogged}
              handleUserId={handleUserId}
            />
          }
        />
        {/* //<Route path="/login" element={<LogIn handleUserId={handleUserId} />} /> */}
        <Route
          path="/todos"
          element={
            <RequireAuth userId={userId} accsessToken={isLogged.accsessToken}>
              {console.log(`редирект произошел ${userId}  парамс ${params}`)}
              {console.log(params)}
              <Todos
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
                pageCount={pageCount}
                currentPage={currentPage}
                handleIsLogged={handleIsLogged}
              />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
