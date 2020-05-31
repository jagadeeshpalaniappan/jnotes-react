// Opinionated (Options)

// -------------------------- (with Redux) ------------------------------

/*
#### OPTION-0 ####
Components: React (Class Components)
State Management: [ LocalState: Redux, RemoteState: Redux ]
API: REST
*/
// import "./0-react-old-redux"; // OLD-SCHOOL

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
State Management: [ LocalState: Context API (Redux Pattern), RemoteState: Context API (Redux Pattern)]
API: REST / GraphQL
*/
// import "./2-react-context-reduxpattern"; // BEST (during 2020)

/*
#### OPTION-3 ####
Components: React (Functional Components - using Hooks)
State Management: [ LocalState: Context API (Redux Pattern), RemoteState: Apollo Client ]
API: GraphQL
*/
// import "./3-react-context-apollo"; // BEST (during 2020)

/*
#### OPTION-4 ####
Components: React (Functional Components - using Hooks)
State Management: [ LocalState: Apollo Client, RemoteState: Apollo Client ]
API: GraphQL
*/
// import "./4-react-apollo";
