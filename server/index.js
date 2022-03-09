import express from 'express';
import bodyParser from 'body-parser';

import RouterManager from './Routes/RouterManager.js';
import { create, getMany } from './Controllers/DatabaseController.js';

const PORT = process.env.PORT || 3000;

// Create express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT, ()=>{
	console.log(`Server is running on port ${PORT}`);
});
app.use('/api', RouterManager(express.Router()));

