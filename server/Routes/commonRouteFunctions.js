//sent responce function
export function _sendResponse(res, isSuccess, message, payload){
	//TODO: use a better status
	res.status(isSuccess ? 200 : 401).send({ 
		success: isSuccess,
		message: message,
		payload: payload
	});
}
