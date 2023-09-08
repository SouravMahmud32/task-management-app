import { useEffect, useState } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import "../Task/Task.css";
const Task = () => {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setAllTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))
  };

  useEffect(()=>{
     let savedTodo = JSON.parse(localStorage.getItem('todolist'));
     let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodo'));
     if (savedTodo) {
          setAllTodos(savedTodo)  
       }
     if (savedCompletedTodo) {
          setCompletedTodos(savedCompletedTodo)  
       }
  }, []);

  const handleComplete = (index) =>{
     let now = new Date();
     let dd = now.getDate();
     let mm = now.getMonth() +1;
     let yyyy = now.getFullYear();
     let h = now.getHours();
     let m = now.getMinutes();
     let s = now.getSeconds();
     let completdOn = dd + '-' + mm + '-' + yyyy + 'at' + h + ':' + m + ':' + s;

     let filteredItems = {
          ...allTodos[index],
          completdOn:completdOn
     }

     let updatedCompletedArr = [...completedTodos];
     updatedCompletedArr.push(filteredItems);
     setCompletedTodos(updatedCompletedArr);
     deleteItem(index);
     localStorage.setItem('completedTodo', JSON.stringify(updatedCompletedArr))

  }

  const deleteCompletedItem = (index) =>{
     let reduceTodo = [... completedTodos];
     reduceTodo.splice(index);
     localStorage.setItem('completedTodo', JSON.stringify(reduceTodo));
     setCompletedTodos(reduceTodo);
  }
  const deleteItem = (index) =>{
     let reduceTodo = [... allTodos];
     reduceTodo.splice(index);
     localStorage.setItem('todolist', JSON.stringify(reduceTodo));
     setAllTodos(reduceTodo);
  }

  return (
    <div>
      <h1>Task Management</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task title?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the task description?"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {isCompleteScreen === false && allTodos.map((item, index) => {
            return (
              <div className="todo-list-items" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <FaTrash className="iconOne" onClick={() => deleteItem(index)}></FaTrash>
                  <FaCheck className="iconTwo" onClick={() => handleComplete(index)}></FaCheck>
                </div>
              </div>
            );
          })}
          {isCompleteScreen === true && completedTodos.map((item, index) => {
            return (
              <div className="todo-list-items" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed on:{item.completdOn}</small></p>
                </div>
                <div>
                  <FaTrash className="iconOne" onClick={() => deleteCompletedItem(index)}></FaTrash>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Task;
