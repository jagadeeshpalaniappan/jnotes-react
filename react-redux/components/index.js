import React, { useState } from "react";

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
      <input
        type="text"
        name="newItem"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export const ListItem = ({ item, onEdit, onDelete }) => {
  return (
    <li key={item.id}>
      <span>
        {item.name} -- [{item.id}]
      </span>
      {onEdit && <button onClick={e => onEdit(e, item)}>Edit</button>}
      {onDelete && <button onClick={e => onDelete(e, item)}>Delete</button>}
    </li>
  );
};

export const List = ({ children }) => {
  return <ul>{children}</ul>;
};
