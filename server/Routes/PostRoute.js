import { 
	getMany,
	getOne,
} from '../Controllers/DatabaseController.js';
import { _sendResponse } from './commonRouteFunctions.js';

export async function getHomePost(req, res){
	const body = req.body;
	const index = body.index || 0;
	const limit = 10;

	var skip = index * limit;

	await getMany(skip, limit, (err, results)=>{
		if(err) _sendResponse(res, false, err, null);
		else _sendResponse(res, true, 'Success', results);
	});
}
export async function viewPost(req, res){
	const id = req.params.id;
	await getOne(id, (err, result)=>{
		if(err) _sendResponse(res, false, err, null);
		else _sendResponse(res, true, 'Success', result);
	});
}
