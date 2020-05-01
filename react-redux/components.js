import React, { useState } from "react";

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
