import { 
	getMany,
	getOne,
} from '../Controllers/DatabaseController.js';

function _sendRes(res, isSuccess, message, payload){
	res.status(isSuccess ? 200 : 501).send({ 
		success: isSuccess,
		message: message,
		payload: payload
	});
}

export async function getHomePost(req, res){
	const body = req.body;
	const index = body.index || 0;
	const limit = 10;

	var skip = index * limit;

	await getMany(skip, limit, (err, results)=>{
		if(err) _sendRes(res, false, err, null);
		else _sendRes(res, true, 'Success', results);
	});
}
export async function viewPost(req, res){
	const id = req.params.id;
	await getOne(id, (err, result)=>{
		if(err) _sendRes(res, false, err, null);
		else _sendRes(res, true, 'Success', result);
	});
}
