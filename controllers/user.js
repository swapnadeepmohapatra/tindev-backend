const User = require('../models/user');
const axios = require('axios');

exports.getUser = (req, res) => {
	const { user } = req.headers;

	const loggedUser = User.findById(user);

	const users = User.find({
		$and: [{ _id: { $ne: user } }, { _id: { $ne: loggedUser.likes } }, { _id: { $ne: loggedUser.dislikes } }],
	});

	return res.json(users);
};

exports.addUser = (req, res) => {
	const { username } = req.body;

	const userExist = User.findOne({ user: username });

	if (userExist) {
		return res.json(userExist);
	}

	const githubRes = axios.get(`https://api.github.com/users/${username}`);

	const { name, bio, avatar_url: avatar } = githubRes;

	const user = User.create({ name, bio, avatar, user: username });

	return res.json(user);
};
