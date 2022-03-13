// callback(isSucces, message, data)
export function GetHomePost(index, limit, callback){
	try{
		fetch(`http://10.1.1.213:5000/api/${index}/${limit}`)
			.then(response => response.json())
			.then(data => {
				callback(data.success, data.message, data.payload);
			});
	}catch(e){
		callback(false, e.message, null);
	}
}

