//import logo from './logo.svg';
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
  
  useEffect(() => {
    setFiltredTaskArray(taskArray);
  }, [taskArray]);

  

  return (
    <div className="conainer">
      <Top
        taskArray={taskArray}
        setTaskArray={setTaskArray}
        setFiltredTaskArray={setFiltredTaskArray}
        filtredTaskArray={filtredTaskArray}
        // filterTask={filterTask}
        // typeFilterByDate={typeFilterByDate}
        // setTypeFilterByDate={setTypeFilterByDate}
        // typeFilterByStatus={typeFilterByStatus}
        // setTypeFilterByStatus={setTypeFilterByStatus}
      />
      <Tasks
        taskArray={filtredTaskArray}
        setTaskArray={setTaskArray}
        setFiltredTaskArray={setFiltredTaskArray}
      />
      <Pagination />
    </div>
  );
}

export default App;
