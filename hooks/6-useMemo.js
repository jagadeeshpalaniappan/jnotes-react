import React, { useState, useMemo, useEffect } from "react";

// ---------------------------------------------------------------------------

// https://www.youtube.com/watch?v=-Ls48dd-vJE&list=PLN3n1USn4xlmyw3ebYuZmGp60mcENitdM&index=5

// WhenToUse? useCallback vs useMemo vs useEffect
/*
useCallback
  - when we do not want to creat a newFn everytime component render

useMemo
  - when we have 'pureFn' which is supposed to call only when dependency prop change // NOT every render

useEffect
  - when we have 'fn: that uses useState' which is supposed to call only when dependency prop change // NOT every render
  - asyncCall
  - pub/sub (dom listeners)
*/

// ---------------------------------------------------------------------------

const getRandomStr = count =>
  Array(count)
    .fill(0)
    .map((x, i) =>
      Math.random()
        .toString(36)
        .substring(2, i + 3)
    );

// ---------------------------------------------------------------------------

const useFetchUserIds = usersCount => {
  const [userIds, setUserIds] = useState([]);

  // callOnly: when 'usersCount' chnages
  useEffect(() => {
    console.log("fetching: userIds");

    const api = async () => {
      const randomUserIds = getRandomStr(usersCount);
      setUserIds(randomUserIds);
      // setUserIds(["jagan", "jagadeesh", "jagadeeshpalaniappan", "jag"]);
    };
    api();
  }, [usersCount]);

  return [userIds];
};

// ---------------------------------------------------------------------------

// EXPENSIVE-OPERATION:
function findLongestUserIds(userIds) {
  if (!userIds) {
    return [];
  }

  console.log("finding: longestUserId (running expOperation...)", userIds);

  let longestUserId = userIds[0];
  for (const userId of userIds) {
    if (userId.length > longestUserId.length) {
      longestUserId = userId;
    }
  }

  return longestUserId;
}

// ---------------------------------------------------------------------------

const MySlowComp = () => {
  const [count, setCount] = useState(0);

  // incrementingCount: will call 'findLongestUserIds' // Which is uncessary computations here
  const [userIds] = useFetchUserIds(5);
  const longestUserId = findLongestUserIds(userIds); // call:findLongestUserIds // whenever render happens

  return (
    <div>
      <h1>MySlowComp </h1>
      <div>count: {count}</div>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>

      <pre>userIds: {JSON.stringify(userIds)}</pre>
      <div>longestUserId: {longestUserId}</div>
    </div>
  );
};

// ---------------------------------------------------------------------------

const MyFastComp1 = () => {
  const [count, setCount] = useState(0);

  // incrementingCount: will call 'findLongestUserIds'
  const [userIds] = useFetchUserIds(5);
  const longestUserId = useMemo(() => findLongestUserIds(userIds), [userIds]); // call:findLongestUserIds // only when 'userIds' changes

  return (
    <div>
      <hr />
      <h1>MyFastComp1 </h1>
      <div>count: {count}</div>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>

      <pre>userIds: {JSON.stringify(userIds)}</pre>
      <div>longestUserId: {longestUserId}</div>
    </div>
  );
};

// ---------------------------------------------------------------------------

const MyFastComp2 = () => {
  const [count, setCount] = useState(0);

  // incrementingCount: will call 'findLongestUserIds' // Which is necessary here
  // becoz: here 'userIds' will change based on 'count'
  const [userIds] = useFetchUserIds(count);
  const longestUserId = useMemo(() => findLongestUserIds(userIds), [userIds]); // call:findLongestUserIds // only when 'userIds' changes

  return (
    <div>
      <hr />
      <h1>MyFastComp2 </h1>
      <div>count: {count}</div>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>

      <pre>userIds: {JSON.stringify(userIds)}</pre>
      <div>longestUserId: {longestUserId}</div>
    </div>
  );
};

// ---------------------------------------------------------------------------

const App = () => {
  return (
    <div>
      <MySlowComp />
      <MyFastComp1 />
      <MyFastComp2 />
    </div>
  );
};

export default App;
