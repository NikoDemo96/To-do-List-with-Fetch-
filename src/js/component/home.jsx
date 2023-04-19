import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component

let initialTasks = [];

const Home = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [taskName, setTaskName] = useState("");

  const handleProductChange = (event) => {
    setTaskName(event.target.value);
  };

  //Funcion para Enter submit y introducir nuevos elementos a la lista:
  const handleKeyDown = (event) => {
    console.log(event.key);

    if (event.key === "Enter") {
      const newTask = {
        name: taskName,
      };
      const newTasks = [...tasks, newTask];

      setTasks(newTasks);
    }
  };

  //Boton de delete:
  const deleteItem = (index) => {
    const newInitialTasks = tasks.filter((task, i) => index !== i);
    console.log(newInitialTasks);
    setTasks(newInitialTasks);
  };

  return (
    <div className="text-center">
      <h1 className="text-center mt-5">To-Do List!</h1>
      <div className="card m-5">
        <div className="card-header">
          <input
            type="text"
            placeholder="What needs to be done?"
            onChange={(event) => handleProductChange(event)}
            onKeyDown={handleKeyDown}
          ></input>
        </div>
        <div className="card-body w-100">
          <ul className="w-100">
            {tasks.map((task, index) => {
              return (
                <div
                  id="wholeTask"
                  className="d-flex justify-content-between p-2"
                  key={`${task.name}-${index}`}
                >
                  <div id="taskName" className="me-auto">{task.name}</div>
                  <div id="XBotton">
                    <i class="fas fa-times" onClick={() => deleteItem(index)}></i>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="card-footer">{tasks.length} items left</div>
      </div>
    </div>
  );
};

export default Home;


{/* <button onClick={() => deleteItem(index)}>X</button> */}