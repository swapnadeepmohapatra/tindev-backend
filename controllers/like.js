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

	if (targetUser.likes.include(loggedUser._id)) {
		const loggedSocket = req.connectedUsers[user];
		const targetSocket = req.connectedUsers[userId];

		if (loggedSocket) {
			req.io.to(loggedSocket).emit('match', targetUser);
		}

		if (targetSocket) {
			req.io.to(targetSocket).emit('match', loggedSocket);
		}
	}

	loggedUser.likes.push(targetUser._id);

	await loggedUser.save();

	return res.json(loggedUser);
};
