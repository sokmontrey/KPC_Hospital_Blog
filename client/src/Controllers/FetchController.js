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

export function SubmitAdminLogin(password, callback){
	try{
		// make a post fetch at API + /admin with data {password: password}
		fetch(API + '/admin', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				password: password
			})
		}).then(response => response.json())
		.then(data => {
			callback(data.success, data.message);
		});
	}catch(e){
		callback(false, e.message);
	}
}
