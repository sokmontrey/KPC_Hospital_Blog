// callback(isSucces, message, data)
export function GetHomePost(index, callback){
	fetch(`http://10.1.1.213:5000/api/${index}`)
		.then(response => response.json())
		.then(data => {
			callback(data.succes, data.message, data.payload);
		});
}

