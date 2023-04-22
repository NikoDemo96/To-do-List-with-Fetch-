import React, { useState, useEffect } from "react";

const urlBase = "http://assets.breatheco.de/apis/fake/todos/user/";
const apiUsername = "nikodemo69";
//create your first component

let initialTasks = [];

const Home = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [taskName, setTaskName] = useState("");


// Buscamos la lista de tareas. METODO GET para obtener la info y traer la lista de tareas.
const fetchTodoApi = async() => {
  try{
    const response = await fetch(`${urlBase}${apiUsername}`);
    console.log(response);
    const data = await response.json(); // Traducimos la respuesta a json
    console.log(data);
    setTasks(data)
  }catch(error){ 
    console.log(error);
  }
};

// Usamos esta funcion para actualizar la informacion de la lista de tareas
const updateToDoList = async(tasks) => {
  console.log(tasks)
  try{
    const response = await fetch(`${urlBase}${apiUsername}`, {
      method:"PUT",
      body:JSON.stringify(tasks),
      headers: {
        "Content-Type": "application/json"
      }
    });
    fetchTodoApi();
  }catch(error){
    console.log(error)
  }
};



  
  //Lleva registro de el Todo
  const handleTaskChange = (event) => {
    setTaskName(event.target.value);
  };

  //Funcion para Enter submit y introducir nuevos elementos a la lista:
  const handleAddEnter = (event) => {
    console.log(event.key);

    if (event.key === "Enter") {
      const newTask = {
        label: taskName, 
        done: false
      };
      const newTasks = [...tasks, newTask];
      updateToDoList(newTasks);
      setTaskName("");
    }
  };

  //Boton de delete:
  const deleteItem = (index) => {
    const newInitialTasks = tasks.filter((task, i) => index !== i);
    console.log(newInitialTasks);
    updateToDoList(newInitialTasks);
  };

console.log("Antes del useEffect")
  useEffect(() => {
    console.log("Dentro del useEffect")
    fetchTodoApi();
  }, [])
console.log("Despues del useEffect")



  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="container">
        <h1 className="text-center mt-5 todoTitle">To-Do List!</h1>
        <div className="d-flex justify-content-center card">
          <div className="card-body w-100 backgroundTest container-fluid">
            <ul className="list-group list-group-flush w-100">
              <input
                className="list-group-item opacity-75 fs-4"
                type="text"
                placeholder="What needs to be done?"
                onChange={(event) => handleTaskChange(event)}
                onKeyDown={(event) => handleAddEnter(event)}
                value={taskName}
              ></input>
              {tasks.map((task, index) => {
                if (task.done != true) {
                  return (
                    <li
                      id="wholeTask"
                      className="list-group-item d-flex justify-content-between p-2 fs-4 opacity-75"
                      key={`${task.label}-${index}`}
                    >
                      <div id="taskName" className="me-auto">
                        {task.label}
                      </div>
                      <div id="XBotton" className="opacity-75">
                        <i
                          className="fas fa-times"
                          onClick={() => deleteItem(index)}
                        ></i>
                      </div>
                    </li>
                  );
                } 

              })}
            </ul>
          </div>
          <div className="card-footer">{tasks.length - 1} items left
          </div>
          <button onClick={() => updateToDoList([{label:"No mostrar", done: true}])} type="button" class="btn btn-warning">Clear list</button>
         

        </div>
      </div>
    </div>
  );
};

export default Home;

{
  /* <button onClick={() => deleteItem(index)}>X</button> */
}

//linea 81, cambie task.name por task.label y no me funciona ahora.