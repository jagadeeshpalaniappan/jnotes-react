import React from "react";

const AppContainer = ({ nav, main }) => {
  return (
    <div>
      <div>{nav}</div>
      <div>{main}</div>
    </div>
  );
};

export default AppContainer;
