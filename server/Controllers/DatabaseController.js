import mongoose from 'mongoose';
import PostModel from '../Models/PostModel.js';

const mongoDB_URI = "mongodb+srv://admin:Admin1234@cluster0.b1qmj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoDB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

export async function create(data){
	await PostModel.create(data).then(() => {
		console.log("Post created");
	}).catch(err => {
		console.log(err);
	});
}
