import mongoose from 'mongoose';
import PostModel from '../Models/PostModel.js';

const mongoDB_URI = "mongodb+srv://admin:Admin1234@cluster0.b1qmj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoDB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// params:
// 		data: Object
// 		callback: (err, id: String)
export async function create(data, callback){
	await PostModel.create(data, (err, result)=>{
		err? callback(err, null) : callback(err, result._id);
	});
}

// params: 
// 		id: String
// 		newData: Object
// 		callback: (err, isUpdated:bool)
export async function update(id, newData, callback){
	await PostModel.findOneAndUpdate({_id: id}, newData, (err)=>{
		err? callback(err, false) : callback(err, true);
	});
}

// params:
// 		id: String
// 		callback: (err, isRemoved:bool)
export async function remove(id, callback){
	await PostModel.deleteOne({_id: id}, (err)=>{
		err? callback(err, false) : callback(null, true);
	});
}

// params:
// 		id: String
// 		callback: (err, result: Object)
export async function getOne(id, callback){
	await PostModel.findOne({_id: id}, (err, result)=>{
		callback(err, result);
	});
}

// params: 
// 		startIndex: Number 
// 		resultLength: Number 
// 		callback: (err, result: [Objects])
export async function getMany(index, limit, callback){
	PostModel.find({})
		.sort({createAt: -1})
		.skip(index)
		.limit(limit)
		.exec((err, result)=>{
			callback(err, result);
		});
}

