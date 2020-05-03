const express = require('express');

const routes = express.Router();

const { getUser, addUser, getUserByID, getUserByName } = require('../controllers/user');
const { addDislike } = require('../controllers/dislike');
const { addLike } = require('../controllers/like');

routes.get('/user', getUser);
routes.get('/userById', getUserByID);
routes.get('/userByName', getUserByName);

routes.post('/user', addUser);
routes.post('/user/:userId/dislikes', addDislike);
routes.post('/user/:userId/likes', addLike);

module.exports = routes;
