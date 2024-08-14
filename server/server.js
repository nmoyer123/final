const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

server.applyMiddleware({ app });

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/bookstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () =>
  console.log(`🌍 Now listening on localhost:${PORT}${server.graphqlPath}`)
);
