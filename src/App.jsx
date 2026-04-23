import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleAdd = () => {
    if (editingId) {
      let updatedTodo = todos.map((item) =>
        item.id === editingId ? { ...item, todo } : item,
      );

      setTodos(updatedTodo);
      setEditingId(null);
    } else {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    }
    setTodo("");
    console.log(todos);
    saveToLocalStorage();
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    setEditingId(id);
    saveToLocalStorage();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLocalStorage();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    console.log(e, e.target);

    let id = e.target.name;
    console.log(`The id is ${id}`);

    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    console.log(index);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    console.log(newTodos, todos);
    saveToLocalStorage();
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-slate-300 min-h-[80vh]">
        <div className="addTodo">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="bg-white rounded-md p-2 my-2 w-1/2"
          />
          <button
            onClick={handleAdd}
            type="submit"
            className="bg-slate-700 text-white font-bold rounded-lg py-2 px-4 hover:bg-slate-900 mx-6 cursor-pointer"
          >
            Save
          </button>
        </div>

        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5 text-red-500 font-bold">
              No Todos to display...
            </div>
          )}
          {todos.map((item) => {
            return (
              <div
                key={item.id}
                className="todo flex w-1/4 justify-between my-3"
              >
                <div className="flex gap-5">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="bg-slate-700 text-white font-bold rounded-lg py-2 px-4 hover:bg-slate-900 mx-6 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-slate-700 text-white font-bold rounded-lg py-2 px-4 hover:bg-slate-900 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
