import crypto from 'crypto';

import {
	getAllIdAndTitle,
	create,
	update,
	remove,
} from '../Controllers/DatabaseController.js';

function _checkAdmin(req, res){
	if(!req.session.admin){
		res.status(401) .send({ 
			success: false,
			message: 'Not authorized' 
		}); return false;
	}
	return true;
}
//sent responce function
function _sendRes(res, isSuccess, message, payload){
	res.status(isSuccess ? 200 : 501).send({ 
		success: isSuccess,
		message: message,
		payload: payload
	});
}

export function getAll(req, res){
	if(!_checkAdmin(req, res)) return;

	getAllIdAndTitle((err, idAndTitleList)=>{
		if(err) _sendRes(res,false,err,null)
		else _sendRes(res,true,'succes',idAndTitleList)
	});
}
export function createPost(req, res){
	if(!_checkAdmin(req, res)) return;

	const body = req.body;
	const data = body.data;

	create(data, (err, id)=>{
		if(err) _sendRes(res,false,err,null)
		else _sendRes(res,true,'success',id);
	});
}
export function updatePost(req, res){
	if(!_checkAdmin(req, res)) return;

	const body = req.body;
	const newData = body.data;
	const id = req.params.id;

	update(id, newData, (err, isUpdated)=>{
		if(err) _sendRes(res,false,err,null);
		else _sendRes(res,true,'success',isUpdated);
	});
}
export function removePost(req, res){
	if(!_checkAdmin(req, res)) return;

	const id = req.params.id;

	remove(id, (err, isRemoved)=>{
		if(err) _sendRes(res,false,err,null);
		else _sendRes(res,true,'success',isRemoved);
	});
}
export function verifyAdmin(req, res){
	const correctHashed = '0f9ad3e17c5372d623e09dd556c445571a15445eee0fb9066808a3ed6b61eb17';

	const body = req.body;
	const password = body.password;

	const hashed = crypto.createHash('sha256')
		.update(password)
		.digest('hex');

	const isCorrect = hashed === correctHashed;
	res.session.admin = isCorrect;
	res.status(isCorrect? 200 : 401).send({
		success: isCorrect,
		message: isCorrect? 'Admin logged in' : 'Wrong password'
	});
}
