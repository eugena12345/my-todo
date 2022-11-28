import React, { useState } from "react";
import styles from "./Top.module.css";
import { v4 as uuidv4 } from "uuid";

const Top = ({
  taskArray,
  setTaskArray,
  //filtredTaskArray,
  setFiltredTaskArray,
}) => {
  const [value, setValue] = useState("");
  const [typeFilterByDate, setTypeFilterByDate] = useState("OLD");
  const [typeFilterByStatus, setTypeFilterByStatus] = useState("ALL");


  //не перерисовывается после того как понажимаешь кнопки сделано не сделано, потом все и сортировка по дате не перерисовывается. 
  //если какая-то задача помечена как выполненная при нажатой кнопке невыполнена, то она не перескакивает в выполненную
  // при добавлении задачи перерисовываятся неотсортированный список задач
  const addTask = () => {
    if (value === "") {
      return;
    }
    const newTaskArray = [
      ...taskArray,
      {
        id: uuidv4(),
        taskText: value,
        statusDone: false,
        createDate: Date.now(),
      },
    ];
    setTaskArray(newTaskArray);
    setValue("");
  };

  const addTaskWithEnter = (event) => {
    if (event.keyCode === 13) {
      addTask();
    }
  };
  const filterTask = (typeFilterByDate, typeFilterByStatus) => {
    console.log(
      "в сортировке " +
        typeFilterByDate +
        " and " +
        typeFilterByStatus +
        "пошла сортировка по дате"
    );
    let newFiltredTaskArray;
    if (typeFilterByDate === "OLD") {
      newFiltredTaskArray = taskArray.sort(
        (a, b) => a.createDate - b.createDate
      );
    }
    if (typeFilterByDate === "NEW") {
      newFiltredTaskArray = taskArray.sort(
        (a, b) => b.createDate - a.createDate
      );
    }
    // setFiltredTaskArray(newFiltredTaskArray);
    console.log("после сортировки по дате: ");
    console.log(newFiltredTaskArray);
    let newnewTA;
    if (typeFilterByStatus === "DONE") {
      console.log("пошла сортировка по готовности");

      newnewTA = newFiltredTaskArray.filter((item) => item.statusDone === true);
      console.log("сейчас должен быть массив после сортировки DONE");
      console.log(newnewTA);
    }
    if (typeFilterByStatus === "UNDONE") {
      newnewTA = newFiltredTaskArray.filter(
        (item) => item.statusDone === false
      );
    }
    if (typeFilterByStatus === "ALL") {

      newnewTA = newFiltredTaskArray;
      console.log(newnewTA);
    }
    setFiltredTaskArray(newnewTA);
    console.log("после сортировки по дате и по готовности" + newnewTA);
  };
  const sortByDate = (type) => {
    setTypeFilterByDate(type);
    //тут идет задержка типа сортировки
    console.log(type);
    //возможно тут не нужно вызывать фильтрацию
    filterTask(type, typeFilterByStatus);
  };

  const sortByStatus = (type) => {
    setTypeFilterByStatus(type);
    //тут идет задержка типа сортировки
    console.log(type);
    //возможно тут не нужно вызывать фильтрацию
    filterTask(typeFilterByDate, type);
  };

  return (
    <div className={styles.first}>
      <h1>To Do</h1>
      <div className={styles.inputTask}>
        <input
          onChange={(e) => setValue(e.target.value)}
          placeholder="input a task"
          value={value}
          onKeyDown={addTaskWithEnter}
        ></input>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className={styles.select}>
        <div className={styles.selectDate}>
          {/* тут нужо менять названия и способ использования функции */}
          <button onClick={() => sortByDate("NEW")} className={(typeFilterByDate === "NEW")? styles.used:''}>New</button>
          <button onClick={() => sortByDate("OLD")} className={(typeFilterByDate === "OLD")? styles.used:''}>Old</button>
        </div>
        <div className={styles.selectDone}>
          <button onClick={() => sortByStatus("ALL")} className={(typeFilterByStatus === "ALL")? styles.used:''}>All</button>
          <button onClick={() => sortByStatus("UNDONE")} className={(typeFilterByStatus === "UNDONE")? styles.used:''}>Undone</button>
          <button onClick={() => sortByStatus("DONE")} className={(typeFilterByStatus === "DONE")? styles.used:''}>Done</button>
        </div>
      </div>
    </div>
  );
};

export default Top;
