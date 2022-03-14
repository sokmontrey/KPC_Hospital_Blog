//TODO: create get with select
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import {
	getAll_Title_CreateAt,
	create,
	update,
	remove,
} from '../Controllers/DatabaseController.js';
import { _sendResponse } from './commonRouteFunctions.js';

function _sendNotAuthorized(res){
	res.status(401)
		.send({ 
			success:false, 
			message: 'Not Authorized' 
		})
	return false;
}

function _checkAdmin(req, res, callback){
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1];
	if(!token) callback(_sendNotAuthorized(res));

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
		if(err) callback(_sendNotAuthorized(res));
		callback(true);
	})
}

export function getAll(req, res){
	_checkAdmin(req, res, (isSuccess)=>{
		if(!isSuccess) return;
		getAll_Title_CreateAt((err, result)=>{
			if(err) _sendResponse(res,false,err,null)
			else _sendResponse(res,true,'succes',result)
		});
	})
}

/* req.body = {
	data:{
		title: String,
		description: String,
		markdown: String,
		images: [String],
		createAt: Date,
	}
} */
export function createPost(req, res){
	_checkAdmin(req, res, (isSuccess)=>{
		if(!isSuccess) return;

		const body = req.body;
		const data = body.data;

		create(data, (err, id)=>{
			if(err) _sendResponse(res,false,err,null)
			else _sendResponse(res,true,'success',id);
		});
	});
}

/* req.body = {
	data:{
		title: String,
		description: String,
		markdown: String,
		images: [String],
		createAt: Date,
	}
} */
export function updatePost(req, res){
	_checkAdmin(req, res, (isSuccess)=>{
		if(!isSuccess) return;

		const body = req.body;
		const newData = body.data;
		const id = req.params.id;

		update(id, newData, (err, isUpdated)=>{
			if(err) _sendResponse(res,false,err,null);
			else _sendResponse(res,true,'success',isUpdated);
		});
	})
}

/* req = {
	id: String
} */
export function removePost(req, res){
	_checkAdmin(req, res, (isSuccess)=>{
		if(!isSuccess) return;

		const id = req.body.id;

		remove(id, (err, isRemoved)=>{
			if(err) _sendResponse(res,false,err,null);
			else _sendResponse(res,true,'success',isRemoved);
		});
	}) 
}

export function verifyAdmin(req, res){
	const correctHashed = '0f9ad3e17c5372d623e09dd556c445571a15445eee0fb9066808a3ed6b61eb17';

	const body = req.body;
	const password = body.password;

	const hashed = crypto.createHash('sha256')
		.update(password)
		.digest('hex');

	const isCorrect = hashed === correctHashed;

	var accessToken;
	if(isCorrect){
		const admin = { name: 'admin'}
		accessToken = jwt.sign(admin, process.env.ACCESS_TOKEN_SECRET);
	}

	res.status(isCorrect? 200 : 401).send({
		success: isCorrect,
		message: isCorrect? 'logged in' : 'wrong password',
		accessToken: accessToken
	});
}
