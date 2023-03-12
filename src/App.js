import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function SearchBar({ inputValue, handleInputChange, handleSubmit }) {
  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="container ">
          <input
            style={{ marginTop: 50 }}
            className="border border-gray-800 rounded-none w-3/4 py-2 px-4 "
            type="text"
            placeholder="Enter Title"
            value={inputValue}
            onChange={handleInputChange}
          ></input>
          <button
            className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-r-md"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
function ToDo({ id, title, onDelete, onEdit }) {
  let [isEditDisabled, setIsEditDisabled] = useState(true);
  let [editedTitle, setEditedTitle] = useState(title);

  function handleEditButton() {
    isEditDisabled ? setIsEditDisabled(false) : setIsEditDisabled(true);
  }

  function handleEditInput(e) {
    setEditedTitle(e.target.value);
  }
  function handleSave(e) {
    onEdit(id, editedTitle);
    setIsEditDisabled(true);
  }

  // how to update toDoList with the new title??
  return (
    <tr>
      <td className="border px-4 py-2">
        <input
          value={editedTitle}
          disabled={isEditDisabled}
          onChange={handleEditInput}
          className="border border-gray-800 rounded-none py-2 px-4 disabled:bg-blue-200 disabled:opacity-50"
        />
      </td>
      <td className="border px-4 py-2">
        <button
          type="submit"
          onClick={onDelete}
          className="py-2 px-5 bg-red-300 hover:bg-blue-600 text-white font-bold rounded-full"
        >
          Delete
        </button>
        {isEditDisabled ? (
          <button
            type="submit"
            className="py-2 px-5 bg-blue-300 hover:bg-blue-600 text-white font-bold rounded-full"
            onClick={handleEditButton}
          >
            Edit
          </button>
        ) : (
          <button
            className="py-2 px-5 bg-blue-300 hover:bg-blue-600 text-white font-bold rounded-full"
            type="submit"
            onClick={handleSave}
          >
            Save
          </button>
        )}
      </td>
    </tr>
  );
}

function ToDosList({ toDoList, onDelete, onEdit }) {
  return (
    <div class="flex justify-center">
      {" "}
      <table className="table-auto  border-collapse border border-gray-400  text-center">
        <tr className="dark:bg-gray-800 dark:text-white">
          <th className="px-4 py-2">Title</th>
          <th className="px-4 py-2">Action</th>
        </tr>
        {toDoList.map((item) => (
          <ToDo
            title={item.title}
            key={item.id}
            id={item.id}
            onDelete={() => onDelete(item.id)}
            onEdit={onEdit}
          />
        ))}
      </table>
    </div>
  );
}

function App() {
  const [userInput, setUserInput] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };
  function handleSubmit(e) {
    e.preventDefault();

    const list = userInput
      ? [...toDoList, ...[{ id: uuidv4(), title: userInput }]]
      : [...toDoList];
    setUserInput("");

    setToDoList(list);
  }
  function handleItemDeleltion(id) {
    const newTodos = toDoList.filter((item) => item.id !== id);
    setToDoList(newTodos);
  }

  function handleItemEditing(id, title) {
    let toDo = toDoList.find((item) => item.id === id);
    toDo.item = title;
    const list = [...toDoList];
    setToDoList(list);
  }

  return (
    <div>
      <SearchBar
        inputValue={userInput}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <ToDosList
        toDoList={toDoList}
        onDelete={handleItemDeleltion}
        onEdit={handleItemEditing}
      />
    </div>
  );
}

export default App;
