import React, { useState } from "react";

const App = () => {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);

  // Add Todo
  const addTodo = () => {
    if (text.trim() === "") return;

    setTodo([...todo, { text, isCompleted: false }]);
    setText("");
  };

  // Remove Todo
  const removeTodo = (idx) => {
    const newTodo = [...todo];
    newTodo.splice(idx, 1);
    setTodo(newTodo);
  };

  // Toggle Complete
  const completeTodo = (idx) => {
    const updated = [...todo];
    updated[idx].isCompleted = !updated[idx].isCompleted;
    setTodo(updated);
  };

  // Edit Todo
  const editTodo = (idx) => {
    const editTodo = [...todo];
    editTodo[idx].text = text;
    setTodo(editTodo);
  };

  // Stats
  const total = todo.length;
  const completed = todo.filter((t) => t.isCompleted).length;
  const incomplete = total - completed;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-gray-900 p-6 rounded-xl shadow-lg">
        {/* Status Section */}
        <div className="flex justify-between mb-6 text-center">
          <div className="flex-1 bg-gray-800 p-3 rounded-lg mx-1">
            <h4 className="text-sm text-gray-400">Total Todo</h4>
            <p className="text-xl font-bold text-blue-400">{total}</p>
          </div>
          <div className="flex-1 bg-gray-800 p-3 rounded-lg mx-1">
            <h4 className="text-sm text-gray-400">Completed</h4>
            <p className="text-xl font-bold text-green-400">{completed}</p>
          </div>
          <div className="flex-1 bg-gray-800 p-3 rounded-lg mx-1">
            <h4 className="text-sm text-gray-400">Incomplete</h4>
            <p className="text-xl font-bold text-red-400">{incomplete}</p>
          </div>
        </div>

        {/* Input Section */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Write your todo here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTodo}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <div className="bg-gray-800 rounded-lg p-4">
          {todo.length === 0 ? (
            <p className="text-gray-400 text-center">No todos yet...</p>
          ) : (
            <div>
              {todo.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-gray-700 px-4 py-3 rounded-lg mb-3 shadow-md hover:scale-[1.02] transition"
                >
                  {/* Todo Text */}
                  <p
                    className={`transition-all duration-300 ${
                      item.isCompleted
                        ? "line-through text-green-400 opacity-60"
                        : "text-gray-200"
                    }`}
                  >
                    {item.text}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => completeTodo(idx)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                        item.isCompleted
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {item.isCompleted ? "Undo" : "Done"}
                    </button>

                    <button
                      onClick={() => editTodo(idx)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => removeTodo(idx)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
