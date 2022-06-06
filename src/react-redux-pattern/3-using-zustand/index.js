import React from 'react';
import ReactDOM from 'react-dom';

// QUICK-OVERVIEW:
// import App from './1-counter';
// import App from './2-counter-todos';
// import App from './3-counter-todos-useMemo'; // useMemo: avoids 'getVisibleTodos' unecessary exceution
import App from './4-counter-todos-useMemo-perf'; // useMemo: avoids 'getVisibleTodos' unecessary exceution

ReactDOM.render(<App />, document.getElementById('root'));
