


export default UpdateUserDetailsContainer = ({ userId, setMode }) => {
  console.log("UpdateUserDetailsContainer:");

  // --------------------------- GRAPHQL ---------------------------
  // GET_USER:
  const variables = { id: userId };
  const queryStatus = useQuery(GET_USER, { variables });

  // UPDATE_USER:
  const [updateUser, updateStatus] = useMutation(UPDATE_USER);

  // --------------------------- LOCAL ---------------------------
  console.log("UpdateUserDetailsContainer:", {queryStatus});

  const user = (queryStatus.data && queryStatus.data.user) || {};

  // --------------------------- Fns ---------------------------
  const handleSave = updatedUser => {
    console.log("UpdateUserDetailsContainer:: handleSave: updatedUser:", updatedUser);
    const variables = {
      id:updatedUser.id,
      input: {
        name: updatedUser.name,
        username: updatedUser.email,
        email: updatedUser.email
      }
    };
    updateUser({ variables });
  };

  // --------------------------- Render ---------------------------

  return (
    <div>
      <UserDetailsStatus
        mode={STATUS_MODE.GET}
        queryStatus={queryStatus}
      />
      <UserDetailsStatus
        mode={STATUS_MODE.UPDATE}
        updateStatus={updateStatus}
      />

      <EditUser
        user={user}
        hideActions={updateStatus.loading}
        onSave={handleSave}
        onCancel={() => setMode(MODE.READ)}
      />
    </div>
  );
};