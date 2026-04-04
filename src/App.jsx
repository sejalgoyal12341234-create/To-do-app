import React, { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    setTodos([...todos, {todo, isCompleted: false }]);
    setTodo("")
    console.log(todos);
    
  };

  const handleEdit = () => {};

  const handleDelete = () => {};

  const handleChange = (e) => {
    setTodo(e.target.value);
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
            Add
          </button>
        </div>

        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.map((item)=>{

         
          return <div key={todo} className="todo flex w-1/4 justify-between my-3">
            <div className={item.isCompleted?"":"line-through"}>
              {item.todo}
            </div>
            <div className="buttons">
              <button
                onClick={handleEdit}
                className="bg-slate-700 text-white font-bold rounded-lg py-2 px-4 hover:bg-slate-900 mx-6 cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-slate-700 text-white font-bold rounded-lg py-2 px-4 hover:bg-slate-900 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
           })}
        </div>
      </div>
    </div>
  );
}

export default App;
