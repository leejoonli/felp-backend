## FELP - Backend

## Technologies Used

- Mongodb
- mongoose
- Node.js
- Express.js
- Passport.js
- npm
- Heroku

### Models and Properties

#### Updated Post Model

```
{
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
}
```

#### Updated User Model

````
{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			// ret is the returned Mongoose document
			transform: (_doc, ret) => {
				delete ret.password;
				return ret;
			},
		},
	}
	```

### Req. / Res. Cycle Diagram

![Req/Res Diagram](./planning/FELP_req_res.png)
````
