const API = 'http://10.1.1.213:5000/api';

// callback(isSucces, message, data)
export function GetHomePost(index, limit, callback){
	try{
		fetch(API + `/home/${index}/${limit}`)
			.then(response => response.json())
			.then(data => {
				callback(data.success, data.message, data.payload);
			});
	}catch(e){
		callback(false, e.message, null);
	}
}

export function GetViewPost(id, callback){
	try{
		fetch(API + `/view/${id}`)
			.then(response => response.json())
			.then(data => {
				callback(data.success, data.message, data.payload);
			});
	}catch(e){
		callback(false, e.message, null);
	}
}
