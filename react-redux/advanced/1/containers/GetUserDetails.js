


export default GetUserDetailsContainer = ({ userId, setMode }) => {
  console.log("GetUserDetailsContainer:", { userId });

  if (!userId) return null;

  // --------------------------- GRAPHQL ---------------------------
  // GET_USER:
  const variables = { id: userId };
  const queryStatus = useQuery(GET_USER, { variables });

  // DELETE_USER:
  const [deleteUser, deleteStatus] = useMutation(DELETE_USER);

  console.log("GetUserDetailsContainer: query:", queryStatus);
  console.log("GetUserDetailsContainer: deleteStatus:", deleteStatus);
  // --------------------------- LOCAL ---------------------------

  const user = (queryStatus.data && queryStatus.data.user) || {};

  // --------------------------- STATE ---------------------------

  const [statusMode, setStatusMode] = useState(STATUS_MODE.GET);

  // --------------------------- Fns ---------------------------

  const handleDelete = () => {
    console.log("UserDetailsContainer:: handleDelete: user:", user);
    setStatusMode(STATUS_MODE.DELETE);
    const variables = { id: userId };
    deleteUser({ variables });
  };

  // --------------------------- Render ---------------------------
  const hideDetailPage =
    queryStatus.loading ||
    deleteStatus.loading ||
    (deleteStatus.data && deleteStatus.data.deleteUser);

  return (
    <div>
      <UserDetailsStatus
        mode={statusMode}
        queryStatus={queryStatus}
        deleteStatus={deleteStatus}
      />

      {!hideDetailPage && (
        <UserDetails
          user={user}
          hideActions={deleteStatus.loading}
          onEdit={() => setMode(MODE.UPDATE)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};