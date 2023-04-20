import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component

let initialTasks = [];

const Home = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [taskName, setTaskName] = useState("");

  const handleTaskChange = (event) => {
    setTaskName(event.target.value);
  };

  //Funcion para Enter submit y introducir nuevos elementos a la lista:
  const handleAddEnter = (event) => {
    console.log(event.key);

    if (event.key === "Enter") {
      const newTask = {
        name: taskName,
      };
      const newTasks = [...tasks, newTask];
      setTasks(newTasks);
      setTaskName("");
    }
  };

  //Boton de delete:
  const deleteItem = (index) => {
    const newInitialTasks = tasks.filter((task, i) => index !== i);
    console.log(newInitialTasks);
    setTasks(newInitialTasks);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="container">
        <h1 className="text-center mt-5 todoTitle">To-Do List!</h1>
        <div className="d-flex justify-content-center card">
          <div className="card-body w-100 backgroundTest container-fluid">
            <ul className="list-group list-group-flush w-100">
              <input
                class="list-group-item opacity-75 fs-4"
                type="text"
                placeholder="What needs to be done?"
                onChange={(event) => handleTaskChange(event)}
                onKeyDown={(event) => handleAddEnter(event)}
                value={taskName}
              ></input>
              {tasks.map((task, index) => {
                return (
                  <li
                    id="wholeTask"
                    className="list-group-item d-flex justify-content-between p-2 fs-4 opacity-75"
                    key={`${task.name}-${index}`}
                  >
                    <div id="taskName" className="me-auto">
                      {task.name}
                    </div>
                    <div id="XBotton" className="opacity-75">
                      <i
                        class="fas fa-times"
                        onClick={() => deleteItem(index)}
                      ></i>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="card-footer">{tasks.length} items left</div>
        </div>
      </div>
    </div>
  );
};

export default Home;

{
  /* <button onClick={() => deleteItem(index)}>X</button> */
}
