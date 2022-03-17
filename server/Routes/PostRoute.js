import { 
	getManyWithSelect,
	getOne,
} from '../Controllers/DatabaseController.js';
import { _sendResponse } from './commonRouteFunctions.js';

export function getHomePost(req, res){
	const index = req.params.index || 0;
	const limit = req.params.limit || 5;

	var skip = index * limit;

	getManyWithSelect(skip, limit, {
		title: 1, createAt: 1,
		description: 1, images: 1,
	}, (err, results)=>{
		if(err) _sendResponse(res, false, err, null);
		else _sendResponse(res, true, 'Succes', results);
	});
}
export function viewPost(req, res){
	const id = req.params.id || 0;
	getOne(id, (err, result)=>{
		if(err) _sendResponse(res, false, err, null);
		else _sendResponse(res, true, 'Success', result);
	});
}
