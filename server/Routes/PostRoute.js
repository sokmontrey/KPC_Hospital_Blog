import { 
	getMany,
	getOne,
} from '../Controllers/DatabaseController.js';
import { _sendResponse } from './commonRouteFunctions.js';

export function getHomePost(req, res){
	const index = req.params.index || 0;
	const limit = 10;

	var skip = index * limit;

	getMany(skip, limit, (err, results)=>{
		if(err) _sendResponse(res, false, err, null);
		else _sendResponse(res, true, 'Success', results);
	});
}
export function viewPost(req, res){
	const id = req.params.id;
	getOne(id, (err, result)=>{
		if(err) _sendResponse(res, false, err, null);
		else _sendResponse(res, true, 'Success', result);
	});
}
