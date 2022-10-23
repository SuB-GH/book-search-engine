// in this file, we get our Apollo server hooked into our existing Express.js server and set it up with our type definitions and resolvers
const express = require('express');

// import ApolloServer
const { ApolloServer } = require('apollo-server-express');

const path = require('path');
const db = require('./config/connection');
const {typeDefs, resolvers} = require('./schemas');
const {authMiddleware} = require('./utils/auth'); // this imports the middleware function
//const routes = require('./routes'); //don't need this anymore?

const app = express();
const PORT = process.env.PORT || 3001;
// create a new Apollo server and pass in our schema data. this provide the type definitions and resolvers so they know what our API looks like and how it resolves requests
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// links client side with server side
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);

});

// this calls the function to start the server
startApolloServer(typeDefs, resolvers)}
