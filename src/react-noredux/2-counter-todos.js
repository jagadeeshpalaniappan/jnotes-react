import React, { createContext, useContext, useReducer, useMemo } from "react";
// import { Provider, connect } from "react-redux";
// import { createStore, combineReducers } from "redux";
import {
  Counter,
  AddTodoForm,
  TodoList,
  FiltersForm,
  VisibilityFilters
} from "../react-redux/quick-overview/components";

// ###################################### REDUX #####################################

//------------------ Context -------------
const AppContext = createContext();

// ACTION-TYPES:
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";

// ACTION-CREATORS:
const incrementAction = payload => ({ type: INCREMENT, payload });
const decrementAction = payload => ({ type: DECREMENT, payload });

const addTodoAction = payload => ({ type: ADD_TODO, payload });
const toggleTodoAction = payload => ({ type: TOGGLE_TODO, payload });
const setVisibilityFilterAction = payload => ({
  type: SET_VISIBILITY_FILTER,
  payload
});

// REDUCERS:
const defaultCountState = { counter: 0 };
const countReducer = (state = defaultCountState, action) => {
  console.log("countReducer:", { state, action });
  const { payload } = action;
  switch (action.type) {
    case INCREMENT:
      return { ...state, counter: state.counter + action.payload.amount };
    case DECREMENT:
      return { ...state, counter: state.counter - action.payload.amount };
    default:
      return state;
  }
};

const defaultTodosState = {
  todos: [{ id: "101", text: "One", completed: false }],
  visibilityFilter: VisibilityFilters.SHOW_ALL
};
const todosReducer = (state = defaultTodosState, action) => {
  console.log("todosReducer:", { state, action });
  const { payload } = action;
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: payload.id, text: payload.text, completed: false }
        ]
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case SET_VISIBILITY_FILTER:
      return { ...state, visibilityFilter: payload.filter };
    default:
      return state;
  }
};

// const rootReducer = combineReducers({
//   countState: countReducer, // Count Module
//   todoState: todosReducer // Todos Module
// });
// const appStore = createStore(rootReducer);

const combineReducers = rootState => {
  return (state, action) =>
    Object.entries(rootState).forEach(([stateKey, fn]) =>
      fn(state[stateKey], action)
    );
};

const appReducer = combineReducers({
  countState: countReducer, // Count Module
  todoState: todosReducer // Todos Module
});

// ############################### CONTEXT-CONNECTED-COMPS #################################

// memoizeCompProps: shallow compare props and decide re-render
const CounterMzd = React.memo(Counter);
// connect: AppContext
function CounterContainer() {
  const { state, dispatch } = useContext(AppContext);
  return (
    <CounterMzd
      counter={state.countState.counter}
      increment={payload => dispatch(incrementAction(payload))}
      decrement={payload => dispatch(decrementAction(payload))}
    />
  );
}

//------------ AddTodo:

// connect: AppContext
function AddTodo() {
  const { dispatch } = useContext(AppContext);
  return <AddTodoForm addTodo={payload => dispatch(addTodoAction(payload))} />;
}

//------------ Filters:

// connect: AppContext
function Filters() {
  const { state, dispatch } = useContext(AppContext);
  return (
    <FiltersForm
      filter={state.todoState.visibilityFilter}
      setVisibilityFilter={dispatch(setVisibilityFilterAction(payload))}
    />
  );
}

//------------ VisibleTodoList:

const getVisibleTodos = (todos, filter) => {
  console.log("getVisibleTodos");
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

/*
  PROBLEM:
  - `todos` is calculated every time the state tree is updated.
  - if `getVisibleTodos` fn is expensive // it cause performance issues
  SOLN:
  - Reselect can help to avoid these unnecessary recalculations.
  */
function VisibleTodoList() {
  const { state, dispatch } = useContext(AppContext);
  const todos = getVisibleTodos(
    state.todoState.todos,
    state.todoState.visibilityFilter
  );
  return (
    <TodoList
      todos={todos}
      toggleTodo={payload => dispatch(toggleTodoAction({ id: payload }))}
    />
  );
}

//------------ App:

const App = () => {
  const [state, dispatch] = useReducer(appReducer);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <AppContext.Provider value={value}>
      <CounterContainer />
      <AddTodo />
      <VisibleTodoList />
      <Filters />
    </AppContext.Provider>
  );
};

export default App;
