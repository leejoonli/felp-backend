const mongoose = require('../connection');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	state: String,
	city: String,
	title: String,
	date: Date,
	message: String,
	years_of_residence: Number,
	type: String,
	user: {
		name: String,
	},
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
