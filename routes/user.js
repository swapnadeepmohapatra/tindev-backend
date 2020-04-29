const express = require('express');

const routes = express.Router();
const { getUser, addUser } = require('../controllers/user');
const { addDislike } = require('../controllers/dislike');

routes.get('/user', getUser);
routes.post('/user', addUser);
routes.post('/user/:userId/dislikes', addDislike);

module.exports = routes;
