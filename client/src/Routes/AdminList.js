import { useState, useEffect } from 'react';
import { Topbar, ConfirmDialog } from '../Components/Components.js';
import { convertToHowLongDay } from '../Controllers/Common.js';
import { GetAdminPost, DeletePost } from '../Controllers/FetchController.js';
import { confirmAlert } from 'react-confirm-alert';

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
		<button 
			onClick={_createPost}
			className='button1'
			id='admin-create-button'
			> New
		</button>

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
			onEdit={()=>{
				_editPost(post._id)
			}}
			onDelete={()=>{
				confirmAlert({ customUI: ({ onClose }) => {
					return ( <ConfirmDialog 
						onNo={onClose}
						onYes={()=>{
							_deletePost(post._id, props.setAdminPostObj);
							onClose();
						}}
						message='Please confirm to delete this post'
					/> );
				} });
			}}
		/>) }
	</div>);
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

function _createPost(){ window.location.href = '/admin/create'; }

function _editPost(id){ window.location.href = `/admin/edit/${id}`; }

function _deletePost(id, setAdminPostObj){
	DeletePost(id, (isSuccess, message, isRemoved)=>{
		if(isSuccess && isRemoved) _fetchAdminPost(setAdminPostObj);
		else {
			setAdminPostObj({isFetchSuccess: false, 
				message: message, postList: []
			});
		}
	});
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
