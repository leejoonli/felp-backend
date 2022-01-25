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

router.get('/:state', async (req, res, next) => {
	try {
		const posts = await Post.find({ state: `${req.params.state}` });

		res.json(posts);
	} catch (error) {
		next(error);
	}
});

//get one post by id
router.get('/:id', async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post) {
			res.json(post);
		} else {
			res.sendStatus(404);
		}
	} catch (error) {
		next(error);
	}
});

//create a post
router.post('/', async (req, res, next) => {
	try {
		const newPost = await Post.create(req.body);
		res.status(201).json(newPost);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
