

export default CreateUserDetailsContainer = ({ setMode }) => {
  console.log("CreateUserDetailsContainer:");

  // --------------------------- GRAPHQL ---------------------------
  // UPDATE_USER:
  const [updateUser, updateStatus] = useMutation(UPDATE_USER);

  // --------------------------- Fns ---------------------------

  const handleSave = updatedUser => {
    console.log("UserDetailsContainer:: handleSave: updatedUser:", updatedUser);
    const variables = {
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
        mode={STATUS_MODE.CREATE}
        updateStatus={updateStatus}
      />

      <EditUser
        hideActions={updateStatus.loading}
        onSave={handleSave}
        onCancel={() => setMode(MODE.READ)}
      />
    </div>
  );
};
