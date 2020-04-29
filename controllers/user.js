const User = require('../models/user');
const axios = require('axios');

exports.getUser = async (req, res) => {
	const { user } = req.headers;

	const loggedUser = await User.findById(user);

	const users = await User.find({
		$and: [{ _id: { $ne: user } }, { _id: { $ne: loggedUser.likes } }, { _id: { $ne: loggedUser.dislikes } }],
	});

	return res.json(users);
};

exports.addUser = async (req, res) => {
	const { username } = req.body;

	const userExist = await User.findOne({ user: username });

	if (userExist) {
		return res.json(userExist);
	}

	const githubRes = await axios.get(`https://api.github.com/users/${username}`);

	const { name, bio, avatar_url: photo } = githubRes.data;

	const user = await User.create({ name, bio, photo, user: username });

	return res.json(user);
};
