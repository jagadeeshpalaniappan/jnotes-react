
// Opinionated (Options)

// -------------------------- (with Redux) ------------------------------

/*
#### OPTION-0 ####
Components: React (Class Components)
State Management: [ LocalState: Redux, RemoteState: Redux ]
API: REST
*/
import "./0-react-old-redux";   // OLD-SCHOOL

/*
#### OPTION-1 ####
Components: React (Functional Components - using Hooks)
State Management: [ LocalState: Redux, RemoteState: Redux ]
API: REST / GraphQL
*/
import "./1-react-redux";

// ------------------------ (without Redux) ------------------------------

/*
#### OPTION-2 ####
Components: React (Functional Components - using Hooks)
State Management: [ LocalState: Context API, RemoteState: Context API ]
API: REST / GraphQL
*/
import "./2-react-context-reduxpattern";


/*
#### OPTION-3 ####
Components: React (Functional Components - using Hooks)
State Management: [ LocalState: Context API, RemoteState: Apollo Client ]
API: GraphQL
*/
import "./3-react-context-apollo";
