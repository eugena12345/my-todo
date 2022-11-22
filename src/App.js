//import logo from './logo.svg';
import './App.css';
import Top from './components/Top';
import Tasks from './components/Tasks';
import Pagination from './components/Pagination';
import { useState } from 'react';


function App() {
  const [taskArray, setTaskArray] = useState([
    {
      id: 1,
      taskText: "buy a cup",
      statusDone: false,
      createDate: "10/01/2022",
    },
    { id: 2, taskText: "bla-bla", statusDone: true, createDate: "10/01/2022" },
    {
      id: 3,
      taskText: "go to the theatre",
      statusDone: false,
      createDate: "10/01/2022",
    },
    {
      id: 4,
      taskText: "bake cookie",
      statusDone: true,
      createDate: "10/01/2022",
    },
  ]);
   return (
     <div className='conainer'>
    <Top taskArray={taskArray} setTaskArray={setTaskArray}/>
    <Tasks taskArray={taskArray} setTaskArray={setTaskArray}/>
    <Pagination />
    </div>
 
   );
}

export default App;
