const User = require('../models/user');
const axios = require('axios');

exports.getUser = async (req, res) => {
	const { user } = req.headers;

	const loggedUser = await User.findById(user);

	const users = await User.find({
		$and: [{ _id: { $ne: user } }, { _id: { $nin: loggedUser.likes } }, { _id: { $nin: loggedUser.dislikes } }],
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

exports.getUserByID = async (req, res) => {
	const { userid } = req.headers;

	const user = await User.findOne({ _id: userid });

	if (user) {
		return res.json(user);
	} else {
		return res.status(400).json({ error: "User doesn't exist" });
	}
};

exports.getUserByName = async (req, res) => {
	const { username } = req.headers;

	const user = await User.findOne({ user: username });

	if (user) {
		return res.json(user);
	} else {
		return res.status(400).json({ error: "User doesn't exist" });
	}
};
