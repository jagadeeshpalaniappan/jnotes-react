import React from "react";
import ReactDOM from "react-dom";

// QUICK-OVERVIEW:
// import App from "./1-counter";
// import App from "./2-counter-todos";
// import App from "./3-counter-todos-reselect";  // reselect: avoids 'getVisibleTodos' unecessary exceution
import App from "./4-counter-todos-reselect-perf"; // perf: converting 'todos' --to--> 'todoIds' & 'todoMap' will help perf

ReactDOM.render(<App />, document.getElementById("root"));
