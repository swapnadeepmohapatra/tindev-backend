const express = require('express');

const routes = express.Router();

const { getUser, addUser } = require('../controllers/user');
const { addDislike } = require('../controllers/dislike');
const { addLike } = require('../controllers/like');

routes.get('/user', getUser);
routes.post('/user', addUser);
routes.post('/user/:userId/dislikes', addDislike);
routes.post('/user/:userId/likes', addLike);

module.exports = routes;
