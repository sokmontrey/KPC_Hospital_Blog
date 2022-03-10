import crypto from 'crypto';
import {
	getAllIdAndTitle,
	create,
	update,
	remove,
} from '../Controllers/DatabaseController.js';
import { _sendResponse } from './commonRouteFunctions.js';

function _checkAdmin(req, res){
	if(!req.session.admin){
		res.status(401).send({ 
			success: false,
			message: 'Not authorized' 
		}); return false;
	}
	return true;
}

export function getAll(req, res){
	if(!_checkAdmin(req, res)) return;

	getAllIdAndTitle((err, idAndTitleList)=>{
		if(err) _sendResponse(res,false,err,null)
		else _sendResponse(res,true,'succes',idAndTitleList)
	});
}
export function createPost(req, res){
	if(!_checkAdmin(req, res)) return;

	const body = req.body;
	const data = body.data;

	create(data, (err, id)=>{
		if(err) _sendResponse(res,false,err,null)
		else _sendResponse(res,true,'success',id);
	});
}
export function updatePost(req, res){
	if(!_checkAdmin(req, res)) return;

	const body = req.body;
	const newData = body.data;
	const id = req.params.id;

	update(id, newData, (err, isUpdated)=>{
		if(err) _sendResponse(res,false,err,null);
		else _sendResponse(res,true,'success',isUpdated);
	});
}
export function removePost(req, res){
	if(!_checkAdmin(req, res)) return;

	const id = req.params.id;

	remove(id, (err, isRemoved)=>{
		if(err) _sendResponse(res,false,err,null);
		else _sendResponse(res,true,'success',isRemoved);
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
	req.session.admin = isCorrect;
	_sendResponse(res,
		isCorrect,
		isCorrect?'Logged In':'Incorrect Password', 
		null);
}
