import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

import RouterManager from './Routes/RouterManager.js';

const PORT = process.env.PORT || 5000;

// Create express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT, ()=>{
	console.log(`Server is running on port ${PORT}`);
});
app.use(session({
	secret: '12345678',
	resave: true,
	saveUninitialized: true,
}));
app.use('/api', RouterManager(express.Router()));

