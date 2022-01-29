// Dependencies
const express = require('express');
const app = express();
app.set("port", process.env.PORT || 3001);
const cors = require('cors');
const postController = require('./controllers/postController');
const userController = require('./controllers/userController');
const requestLogger = require('./db/middlewear/request_logger');
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
app.use('/api/posts', postController);
app.use('/api', userController);

app.use(handleValidationErrors);
// The catch all for handling errors
app.use(handleErrors);

app.listen(app.get("port"), () => {
	console.log(`connected to port ${app.get('port')}!`);
	console.log('We can get posting...🐧');
});
