const User = require('../models/user');

exports.addLike = async (req, res) => {
	console.log(req.io, req.connectedUsers);

	const { user } = req.headers;
	const { userId } = req.params;

	const loggedUser = await User.findById(user);
	const targetUser = await User.findById(userId);

	if (!targetUser) {
		return res.status(400).json({ error: "User doesn't exist" });
	}

	if (targetUser.likes.includes(loggedUser._id)) {
		const loggedSocket = req.connectedUsers[user];
		const targetSocket = req.connectedUsers[userId];

		if (loggedSocket) {
			loggedUser.matches.push(targetUser._id);
			req.io.to(loggedSocket).emit('match', targetUser);
		}

		if (targetSocket) {
			targetUser.matches.push(loggedUser._id);
			req.io.to(targetSocket).emit('match', loggedUser);
		}
	}

	loggedUser.likes.push(targetUser._id);

	await loggedUser.save();
	await targetUser.save();

	return res.json(loggedUser);
};
