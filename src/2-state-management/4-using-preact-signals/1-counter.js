import React from 'react';
import create from 'zustand';

import { signal } from '@preact/signals-react';

// ################################## STATE-MGMNT (using zustand) ##################################

//------------------ counterStore -------------
let counterSignal = signal(4);
const incrementCounter = ({ amount }) => {
  counterSignal.value = counterSignal.value + amount;
};
const decrementCounter = ({ amount }) => {
  counterSignal.value = counterSignal.value - amount;
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
      counter={counterSignal}
      increment={incrementCounter}
      decrement={decrementCounter}
    />
  );
}

//------------------ App -------------
const initialState = { counterSignal: 5 };

const App = () => {
  return (
    <div>
      <CounterContainer />
    </div>
  );
};

export default App;
