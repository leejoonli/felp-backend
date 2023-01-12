// Dependencies
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const cors = require('cors');
const postController = require('./controllers/postController');
const userController = require('./controllers/userController');
const requestLogger = require('./db/middlewear/request_logger');

module.exports.handler = serverless(app);

// Require the error handlers
const {
	handleErrors,
	handleValidationErrors,
} = require('./db/middlewear/custom_errors');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors());

// Redirect
app.get('/', (req, res) => {
	res.redirect('/api/posts');
});

// Controllers
// Forward all requests to localhost:3001/api/posts to the post controller
app.use('/.netlify/functions/api/posts', postController);
app.use('/.netlify/functions/api', userController);

app.use(handleValidationErrors);
// The catch all for handling errors
app.use(handleErrors);

app.listen(3001, () => {
	console.log('connected to port 3001!');
	console.log('We can get posting...🐧');
});

module.exports = app;