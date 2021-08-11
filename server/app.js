const express = require('express');
const app = express();
const { connect } = require('./mongo/mongoConnection');
const api = require('./routes');
connect();

app.use('/api', api);

module.exports = app;
