//Require the express module
const express = require('express');

//Import the post model
const Post = require('../db/models/Post');

//Instantiate a router
const router = express.Router();

//Get all posts
router.get('/', async (req, res, next) => {
	try {
		const posts = await Post.find({});

		res.json(posts);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
