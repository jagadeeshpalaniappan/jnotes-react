
/*

Redux Pattern - Three Principles:

1. Single source of truth
The 'state' of your whole application is stored in an object tree within a single store.


2. State is read-only
The only way to change the state is to 'dispatch an action', an object describing what happened.


3. Changes are made with pure functions
To specify how the state tree is transformed by actions, you write pure reducers.

*/


/*

Keywords:

Store: 
- entire 'state' of a Redux application, which is often a deeply nested object
- state (also called the state tree)


Action: 
- An action is a plain object that represents an intention to change the state.
- To mutate(change) the redux state, you need to dispatch an action. 
- "action" is the 2nd parameter that gets passed to the "reducer".


Reducer: 
- Reducer is just pure functions that take the previous state and an action, and return the next state. 
- Remember to return new state objects, instead of mutating the previous state.
- should not have any side-effects
  -- if you call a reducer with the same state and the same action, you should always get the same result. 


*/


/*

Redux Thunk: (to handle Asynchronous Action)


With a plain basic Redux store, you can only do simple synchronous updates by dispatching an action. 
Thunk Middleware extend the store's abilities, and let you write async logic that interacts with the store.

````````````````````````````````````
- Thunk middleware allows 'actionCreators' to return 'fn' instead of an 'actionObject'
  -- this helps to handle async action
  -- this helps to dispatch another actions inside action creators 
````````````````````````````````````

Basically thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. 
The inner function receives the store methods dispatch and getState as parameters.



Thunks are the recommended middleware for basic Redux side effects logic, 
  - including complex synchronous logic that needs access to the store
  - simple async logic like AJAX requests.

*/