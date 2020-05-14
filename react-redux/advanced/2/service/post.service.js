// using: 'fetch' // VERY-HARD to use graphql
// export * from "./fetch/post.service.js";

// using: 'graphql-request' // EASY, lightweight,  // RECOMENDED (if we are using Redux)
// export * from "./graphql-request/post.service.js";

// using: 'apollo' // FEATURE-RICH (graphql caching / pagination / reactComponentIntegration) 
// using this we can avoid Redux itself
export * from "./apollo/post.service.js"; 
