import { useState, useEffect } from 'react';
import { Topbar } from '../Components/Components.js';
import { convertToHowLongDay } from '../Controllers/Common.js';
import { GetAdminPost } from '../Controllers/FetchController.js';

import '../Styles/Admin.css';

export default function AdminList(){
	const [adminPostObj, setAdminPostObj] = useState({
		isFetchSuccess: false,
		message: 'loading...',
		postList: []
	});

	useEffect(()=>{
		_fetchAdminPost(setAdminPostObj);
	}, []);

	return(<div id='adminList-container'>
		<Topbar isAdmin={true} />
		<div width='100%' id='adminPost-list-container' className='col col-left'>
			<AdminPostList adminPostObj={adminPostObj}/>
		</div>
	</div>);
}

function AdminPostList(props){
	const adminPostObj = props.adminPostObj;
	if(!adminPostObj.isFetchSuccess) return adminPostObj.message;
	return adminPostObj.postList.map(post=>
		<AdminPost key={post._id}
			title={post.title}
			createAt={convertToHowLongDay(post.createAt)}
		/>
	);
}

function AdminPost(props){
	return (<div className='adminPost-container row row-center row-middle'>
		<div 
			className='col col-left col-middle adminPost-left-container'>
			<p className='style-text black medium-text'>
				{props.title}
			</p>

			<p className='bold-text gray small-text'>
				{convertToHowLongDay(props.createAt)}
			</p>
		</div>

		<div 
			className='row row-right row-middle adminPost-right-container'>
			<button className='button1'>Edit</button>
			<button className='button1'>Delete</button>
		</div>
	</div>);
}

function _fetchAdminPost(setAdminPostObj){
	GetAdminPost((isSuccess, message, result)=>{
		setAdminPostObj({
			isFetchSuccess: isSuccess,
			message: message,
			postList: result
		});
	});
}
