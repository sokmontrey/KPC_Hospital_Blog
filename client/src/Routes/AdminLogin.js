import { useState } from 'react';
import { Topbar } from '../Components/Components.js';

import { SubmitAdminLogin } from '../Controllers/FetchController.js';

import '../Styles/Admin.css';

export default function AdminLogin(){
	const [password, setPassword] = useState('');
	return (<div className='col col-center' id='adminLogin-container'>
		<Topbar isAdmin={true} />
		<input 
			className='input1'
			onChange={(e)=>{ setPassword(e.target.value); }}
			value={password}
			placeholder='Password...'
		/>
		<button
			className='button1'
			onClick={()=>{ _submit(password); }}
			>Submit
		</button>
	</div>);
}

function _submit(password){
	SubmitAdminLogin(password, (isSuccess, message)=>{
		if(isSuccess){
			window.location.href = '/admin/list';
		}else{
			alert(`could not login error: ${message}`);
		}
	});
}
