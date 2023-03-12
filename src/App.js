import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function SearchBar({ inputValue, handleInputChange, handleSubmit }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          style={{ marginTop: 50 }}
          type="text"
          placeholder="Enter Title"
          value={inputValue}
          onChange={handleInputChange}
        ></input>
        <button type="submit">Add</button>
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
    <div>
      <tr>
        <td>
          <input
            value={editedTitle}
            disabled={isEditDisabled}
            onChange={handleEditInput}
          />
        </td>
        <td>
          <button type="submit" onClick={onDelete}>
            Delete
          </button>
          {isEditDisabled ? (
            <button type="submit" onClick={handleEditButton}>
              Edit
            </button>
          ) : (
            <button type="submit" onClick={handleSave}>
              Save
            </button>
          )}
        </td>
      </tr>
    </div>
  );
}

function ToDosList({ toDoList, onDelete, onEdit }) {
  return (
    <div>
      <table>
        <tr>
          <th>Title</th>
          <th>Action</th>
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
    const list = [...toDoList, ...[{ id: uuidv4(), title: userInput }]];
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
