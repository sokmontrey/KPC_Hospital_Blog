import { 
	getMany,
	getOne,
} from '../Controllers/DatabaseController.js';
import { _sendResponse } from './commonRouteFunctions.js';

export function getHomePost(req, res){
	const index = req.params.index || 0;
	const limit = req.params.limit || 5;

	var skip = index * limit;

	getMany(skip, limit, (err, results)=>{
		if(err) _sendResponse(res, false, err, null);
		else {
			const newList = results.map((post)=>{
				return {
					title: post.title,
					description: post.description,
					createAt: post.createAt,
					_id: post._id
				}
			}) 
			_sendResponse(res, true, 'Success', newList);
		}
	});
}
export function viewPost(req, res){
	const id = req.params.id || 0;
	getOne(id, (err, result)=>{
		if(err) _sendResponse(res, false, err, null);
		else _sendResponse(res, true, 'Success', result);
	});
}
