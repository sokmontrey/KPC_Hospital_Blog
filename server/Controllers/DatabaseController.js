import mongoose from 'mongoose';
import PostModel from '../Models/PostModel.js';

const mongoDB_URI = "mongodb+srv://admin:Admin1234@cluster0.b1qmj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoDB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//callback param have to be (err, result)
export async function create(data, callback){
	await PostModel.create(data, callback);
}

export async function update(id, newData, callback){
	await PostModel.findOneAndUpdate({_id: id}, newData, callback);
}

export async function remove(id, callback){
	await PostModel.deleteOne({_id: id}, callback);
}

export async function getOne(id, callback){
	await PostModel.fineOne({_id: id}, callback);
}

export async function getMany(index, limit, callback){
	await PostModel.findManyu
}

