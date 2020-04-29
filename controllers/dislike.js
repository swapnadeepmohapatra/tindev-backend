const User = require('../models/user');

exports.addDislike = async (req, res) => {
	const { user } = req.headers;
	const { userId } = req.params;

	const loggedUser = await User.findById(user);
	const targetUser = await User.findById(userId);

	if (!targetUser) {
		return res.status(400).json({ error: "User doesn't exist" });
	}

	loggedUser.dislikes.push(targetUser._id);
	await loggedUser.save();

	return res.json(loggedUser);
};
