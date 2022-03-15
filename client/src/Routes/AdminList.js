import { useState, useEffect } from 'react';
import { Topbar } from '../Components/Components.js';
import { convertToHowLongDay } from '../Controllers/Common.js';
import { GetAdminPost, DeletePost } from '../Controllers/FetchController.js';

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

	return (<div id='adminList-container'>
		<Topbar isAdmin={true} />
		<AdminPostList  
			adminPostObj={adminPostObj}
			setAdminPostObj={setAdminPostObj}
		/>
	</div> );
}

function AdminPostList(props){
	const adminPostObj = props.adminPostObj;
	if(!adminPostObj.isFetchSuccess) return adminPostObj.message;
	return ( <div width='100%' 
			id='adminPost-list-container' 
			className='col col-left'>
		{ adminPostObj.postList.map(post=> <AdminPost 
			key={post._id}
			title={post.title}
			createAt={post.createAt}
			onEdit={()=>{_editPost(post._id)}}
			onDelete={()=>{_deletePost(post._id, props.setAdminPostObj)}}
		/>) }
	</div>);
}
function _editPost(id){

}

function _deletePost(id, setAdminPostObj){
	DeletePost(id, (isSuccess, message, isRemoved)=>{
		if(isSuccess && isRemoved) _fetchAdminPost(setAdminPostObj);
		else{
			setAdminPostObj({isFetchSuccess: false, 
				message: message, postList: []
			});
		}
	});
}

function AdminPost(props){
	return (<div className='adminPost-container row row-center row-middle'>
		<div className='col col-left col-middle adminPost-left-container'>
			<p className='style-text black medium-text'>
				{props.title}
			</p>

			<p className='bold-text gray small-text'>
				{convertToHowLongDay(props.createAt)} days ago
			</p>
		</div>

		<div className='row row-right row-middle adminPost-right-container'>
			<button className='button1' onClick={props.onEdit}>
				Edit
			</button>
			<button className='button1' onClick={props.onDelete}>
				Delete
			</button>
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
