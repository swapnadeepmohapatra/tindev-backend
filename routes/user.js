const express = require('express');

const routes = express.Router();
const { getUser, addUser } = require('../controllers/user');

routes.get('/user', getUser);
routes.post('/user', addUser);

module.exports = routes;
