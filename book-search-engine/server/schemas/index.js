// this file collects resolvers.js and typeDefs.js and exports them

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = { typeDefs, resolvers };