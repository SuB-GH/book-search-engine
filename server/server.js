const express = require('express');
const path = require('path');
const db = require('./config/connection');
const {authMiddleware} = require('./utils/auth'); // this imports the middleware function
//const routes = require('./routes'); //don't need this anymore

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
