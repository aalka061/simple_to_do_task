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
function ToDo({ title }) {
  return (
    <div>
      <tr>
        <td>{title}</td>
        <td>
          <button type="submit">Delete</button>
          <button type="submit">Edit</button>
        </td>
      </tr>
    </div>
  );
}

function ToDosList({ toDoList }) {
  return (
    <div>
      <table>
        <tr>
          <th>Title</th>
          <th>Action</th>
        </tr>
        {toDoList.map((item) => (
          <ToDo title={item.title} />
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
    const list = [...toDoList, ...[{ title: userInput }]];
    setToDoList(list);
  }

  return (
    <div>
      <SearchBar
        inputValue={userInput}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <ToDosList toDoList={toDoList} />
    </div>
  );
}

export default App;
