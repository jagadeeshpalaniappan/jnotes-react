
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