import mongoose from 'mongoose';
const PostSchema = new mongoose.Schema({
	title: {type: String, default: ''},
	description: {type: String, default: ''},
	createAt: { type: Date, default: Date.now },
	images: [{
		url: {type:String, default: ''},
		base64: {type:String, default: ''}
	}],
	markdown: {type: String, default: ''},
});

export default mongoose.model('Post', PostSchema); 
