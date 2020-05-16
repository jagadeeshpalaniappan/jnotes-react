


export const UserDetailsContainer = ({ userId, mode }) => {
  console.log("UserDetailsContainer:", { userId, mode });

  const [currMode, setMode] = useState(mode);

  switch (currMode) {
    case MODE.CREATE:
      return <CreateUserDetailsContainer setMode={setMode} />;
    case MODE.UPDATE:
      return <UpdateUserDetailsContainer userId={userId} setMode={setMode} />;
    default:
      return <GetUserDetailsContainer userId={userId} setMode={setMode} />;
  }
};
