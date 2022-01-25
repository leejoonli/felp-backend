// Dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const postController = require('./controllers/postController');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Redirect
app.get('/', (req, res) => {
	res.redirect('/posts');
});

// Controllers
// Forward all requests to localhost:3001/posts to the post controller
app.use('/posts', postController);

app.listen(3001, () => {
	console.log('connected to port 3001!');
	console.log('We can get posting...🐧');
});
