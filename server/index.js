import express from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';

import RouterManager from './Routes/RouterManager.js';

const PORT = process.env.PORT || 5000;

// Create express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, ()=>{
	console.log(`Server is running on port ${PORT}`);
});

//enable cors
app.use(cors());
app.use('/api', RouterManager(express.Router()));

