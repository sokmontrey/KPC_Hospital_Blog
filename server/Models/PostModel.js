import mongoose from 'mongoose';
export default mongoose.model('Post',
	new mongoose.Schema({
		title: {type: String, default: ''},
		description: {type: String, default: ''},
		createAt: { type: Date, default: Date.now },
		images: [{type: String, default: ''}],
		markdown: {type: String, default: ''},
	})
); 
