import React from 'react';
import create from 'zustand';

import { signal } from '@preact/signals-react';

// ################################## STATE-MGMNT (using zustand) ##################################

//------------------ counterStore -------------
let counter = signal(0);
const incrementCounter = ({ amount }) => {
  counter = counter + amount;
};
const decrementCounter = ({ amount }) => {
  counter = counter - amount;
};

// #################################### REACT-COMP ####################################

//------------------ Counter -------------
const Counter = ({ counter, increment, decrement }) => {
  console.log('Counter');
  return (
    <div>
      <span>Counter: ## {counter} ## </span>
      <button onClick={() => increment({ amount: 1 })}>INCREMENT</button>
      <button onClick={() => decrement({ amount: 1 })}>DECREMENT</button>
    </div>
  );
};
// memoizeCompProps: shallow compare props and decide re-render
const CounterMzd = React.memo(Counter);

// connect: zustand store hook
function CounterContainer() {
  return (
    <CounterMzd
      counter={counter}
      increment={incrementCounter}
      decrement={decrementCounter}
    />
  );
}

//------------------ App -------------
const initialState = { counter: 5 };

const App = () => {
  return (
    <div>
      <CounterContainer />
    </div>
  );
};

export default App;
