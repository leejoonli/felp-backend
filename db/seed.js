const mongoose = require('../db/connection');
const seedData = require('./seeds.json');
const Post = require('./models/Post');

// First we delete the posts
Post.deleteMany({})
	.then(() => {
		// insert many posts docs
		Post.insertMany(seedData).then((post) => {
			console.log('We have posts! 🐹');
			console.log(post);
			process.exit();
		});
	})
	.catch((err) => console.error(err));
