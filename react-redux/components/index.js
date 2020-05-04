import React, { useState } from "react";
import { Button } from 'reactstrap';

export const AppHeader = ({ title }) => {
  return (
    <h2 style={{ textAlign: "center", borderBottom: "1px solid gray" }}>
      {title}
    </h2>
  );
};

export const AddItemForm = ({ onAdd }) => {
  const [value, setValue] = useState("");
  return (
    <form
      onClick={e => {
        e.preventDefault();
        if (value) onAdd(value);
        setValue("");
      }}
    >
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <Button type="submit">Add</Button>
    </form>
  );
};

export const SearchInput = ({ onSearch }) => {
  const handleChange = e => {
    // TODO: handle debounce
    onSearch(e, e.target.value);
  };
  return (
    <input
      type="text"
      name="searchItem"
      placeholder="Search..."
      style={{ width: "100%" }}
      onChange={handleChange}
    />
  );
};

export const ListItem = ({ item, onEdit, onDelete }) => {
  return (
    <li key={item.id} style={{ display: "flex" }}>
      <div>
        <h3>{item.name}</h3>
        <p>{item.id}</p>
      </div>
      <div>
        {onEdit && <button onClick={e => onEdit(e, item)}>Edit</button>}
        {onDelete && <button onClick={e => onDelete(e, item)}>Delete</button>}
      </div>
    </li>
  );
};

export const List = ({ children }) => {
  return <ul>{children}</ul>;
};

export const Card = ({ children }) => {
  return (
    <div
      style={{
        margin: 10,
        padding: "2rem 1rem",
        border: "1px solid #eee",
        backgroundColor: "#fff"
      }}
    >
      {children}
    </div>
  );
};
