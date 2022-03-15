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

export function GetAdminPost(callback){
	try{
		fetch(API + '/admin/list',{
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'authorization': 'Bearer ' + localStorage.getItem('token')
			}
		}).then(response => response.json())
		.then(data => {
			callback(data.success, data.message, data.payload);
		});
	}catch(e){
		callback(false, e.message, null);
	}
}
export function DeletePost(id, callback){
	try{
		fetch(API + '/admin/remove', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'authorization': 'Bearer ' + localStorage.getItem('token')
			},
			body: JSON.stringify({
				id: id
			})
		}).then(response => response.json())
		.then(data => {
			//isSucces, message, isRemove
			callback(data.success, data.message, data.payload);
		});
	}catch(e){
		callback(false, e.message, null);
	}
}

export function SubmitAdminLogin(password, callback){
	try{
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
			const accessToken = data.accessToken;
			localStorage.setItem('token', accessToken);
			callback(data.success, data.message);
		});
	}catch(e){
		callback(false, e.message);
	}
}

export function CreateAdminPost(data, callback){
	try{
		fetch(API + '/admin/create',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'authorization': 'Bearer ' + localStorage.getItem('token')
			},
			body: JSON.stringify({data: data})
		}).then(response => response.json())
		.then(data=>{
			callback(data.success, data.message, data.payload);
		});
	}catch(e){
		callback(false, e.message, null);
	}
}

export function UpdateAdminPost(id, data, callback){
	try{
		fetch(API + `/admin/update/${id}`,{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'authorization': 'Bearer ' + localStorage.getItem('token')
			},
			body: JSON.stringify({data:data})
		}).then(response => response.json())
		.then(data=>{
			callback(data.success, data.message, data.payload);
		});
	}catch(e){
		callback(false, e.message, null);
	}
}

