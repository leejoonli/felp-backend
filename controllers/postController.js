//Require the express module
const express = require('express');
const { requireToken } = require('../db/middlewear/auth');
const { handleValidateOwnership } = require('../db/middlewear/custom_errors');

//Import the post model
const Post = require('../db/models/Post');

//Instantiate a router
const router = express.Router();

//Get all posts
router.get('/', async (req, res, next) => {
	try {
		const posts = await Post.find({}).populate('owner');
		res.json(posts);
	} catch (error) {
		next(error);
	}
});

// Get posts filtered by state
// http://localhost:3001/api/posts/state
router.get('/state/:state', async (req, res, next) => {
	try {
		const posts = await Post.find({ state: `${req.params.state}` }).populate('owner');
		res.json(posts);
	} catch (error) {
		next(error);
	}
});

// Get posts filtered by type
// http://localhost:3001/api/posts/type
router.get('/type/:type', async (req, res, next) => {
	try {
		const posts = await Post.find({ type: `${req.params.type}` }).populate('owner');
		res.json(posts);
	} catch (error) {
		next(error);
	}
});

// get one post by id
// http://localhost:3001/api/posts/id
router.get('/id/:id', async (req, res, next) => {
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

// get post by user's name
router.get('/username/:username', async (req, res, next) => {
	try {
		const name = await Post.find({
			owner: { username: `${req.params.username}` },
		});
		res.json(name);
	} catch (error) {
		next(error);
	}
});

//create a post
// http://localhost:3001/api/posts
router.post('/', requireToken, async (req, res, next) => {
	try {
		const newPost = await Post.create({ ...req.body, owner: req.user._id });
		res.status(201).json(newPost);
	} catch (error) {
		next(error);
	}
});

// update a post
// http://localhost:3001/api/posts/id
router.put('/id/:id', requireToken, async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post) {
			handleValidateOwnership(req, post);
			const postToUpdate = await Post.findByIdAndUpdate(
				req.params.id,
				{ ...req.body, owner: req.user._id },
				{
					new: true,
				}
			);
			res.json(postToUpdate);
		} else {
			res.sendStatus(404);
		}
	} catch (error) {
		next(error);
	}
});

// Update: Partially edit a post
// http://localhost:3001/api/posts/id
router.patch('/id/:id', requireToken, async (req, res, next) => {
	console.log(req.body);
	try {
		const post = await Post.findById(req.params.id);
		if (post) {
			handleValidateOwnership(req, post);
			const postToUpdate = await Post.findByIdAndUpdate(
				req.params.id,
				// partially update the document with the request body's fields
				{ $set: req.body },
				{ new: true }
			);
			res.json(postToUpdate);
		} else {
			res.sendStatus(404);
		}
	} catch (error) {
		next(error);
	}
});

// Delete: Remove a post
// http://localhost:3001/api/posts/id
router.delete('/id/:id', requireToken, async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post) {
			handleValidateOwnership(req, post);
			const deletedPost = await Post.findOneAndDelete({
				_id: req.params.id,
			});
			if (deletedPost) {
				res.json(deletedPost);
			} else {
				res.sendStatus(404);
			}
		} else {
			res.sendStatus(404);
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
