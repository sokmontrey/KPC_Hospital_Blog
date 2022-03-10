//sent responce function
export function _sendResponse(res, isSuccess, message, payload){
	res.status(isSuccess ? 200 : 501).send({ 
		success: isSuccess,
		message: message,
		payload: payload
	});
}
