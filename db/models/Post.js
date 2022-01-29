const mongoose = require('../connection');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	state: String,
	city: String,
	title: String,
	date: String,
	message: String,
	years_of_residence: Number,
	type: String,
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
