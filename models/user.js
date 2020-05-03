const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			maxLength: 32,
			trim: true,
		},
		user: {
			type: String,
			required: true,
		},
		bio: {
			type: String,
		},
		photo: {
			type: String,
			required: true,
		},
		likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		matches: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
