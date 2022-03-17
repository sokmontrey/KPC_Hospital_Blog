import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
	Topbar, 
	BackButton, 
	MarkdownRender 
} from '../Components/Components.js';

import { 
	CreateAdminPost,
	UpdateAdminPost,
	GetViewPost
} from '../Controllers/FetchController.js';

export default function AdminEdit(props){
	const isNew = props.isNew;
	const { id } = useParams();

	const [fetchObj, setFetchObj] = useState({
		isNew: isNew,
		isFetchSuccess: isNew,
		message: isNew ? '' : 'loading...',
	});
	const [input, setInput] = useState({
		title: '',
		description: '',
		markdown: '',
		images: [],
	});

	useEffect(()=>{
		if(!isNew) _fetchPost(id, setFetchObj, setInput);
	}, []);

	return (<div id='admin-edit-container' className='col'>
		<BackButton />
		<Topbar isAdmin={true} />
		<div className='row' id='admin-edit-body'>
			<InputContainer 
				fetchObj={fetchObj} 
				input={input} 
				setInput={setInput} 
				onButtonClick={()=>{
					if(isNew) _createPost(input, setFetchObj);
					else _updatePost(id, input, setFetchObj);
				}}
			/>
			<div id='admin-preview-container' className='col'>
				<p className='bold-text small-text gray'>preview</p>
				{fetchObj.isFetchSuccess ? 
					<MarkdownRender 
						markdown={input.markdown} 
						images={input.images}
					/> : fetchObj.message}
			</div>
		</div>
	</div>);
}
function InputContainer(props){
	const fetchObj = props.fetchObj;
	if(!fetchObj.isFetchSuccess) return fetchObj.message;
	const input = props.input,
		setInput = props.setInput;

	return (<div className='row' id='admin-input-container'>
		<div className='col' style={{flex:0}}>
			<div className='col col-left col-middle' 
				id='admin-left-top-input-container'>
				<p className='bold-text small-text gray'>post info</p>
				<input className='input1' value={input.title} 
					onChange={e=>
						setInput({...input, title: e.target.value}) }
					placeholder='title...'/>

				<input className='input1' value={input.description} 
					onChange={e=>
						setInput({...input, description: e.target.value}) }
					placeholder='description...'/>

				<button className='button1'
					onClick={props.onButtonClick}>
					{fetchObj.isNew ? 'Post' : 'Update'}
				</button>
			</div>

			<div className='col col-left col-middle'>
				<p className='bold-text small-text gray'>images</p>
				<input type='file' 
					onChange={(e)=>{
						const file = e.target.files[0];
						const reader = new FileReader();
						reader.readAsDataURL(file);
						reader.onload = ()=>{
							const imageId = Date.now();
							const images = input.images.concat([{
								id: imageId,
								base64: reader.result
							}]);
							setInput({...input, images: images});
						};
					}} 
					placeholder='add picture' />
				<ImageContainer onDelete={(index)=>{
					const images = input.images.slice();
					images.splice(index, 1);
					setInput({...input, images: images});
				}} images={input.images}/>
			</div>
		</div>
		<div id='markdown-input-container'>
			<p className='bold-text small-text gray'>markdown</p>
			<textarea 
				placeholder='markdown...' 
				value={input.markdown}
				onChange={e=>
					setInput({...input, markdown: e.target.value}) }
				className='input1'
			/>
		</div>
	</div>);
}
function ImageContainer(props){
	const images = props.images;

	return (<div className='col' id='admin-images-list-container'>
		{images.map((image,index)=>
		<div key={image.id} className='row row-center row-middle'>
			<div onClick={()=>{
				//copy image.id to clipboard
				const textArea = document.createElement('textarea');
				textArea.value = image.id;
				document.body.appendChild(textArea);
				textArea.select();
				document.execCommand('copy');
				textArea.remove();
			}} 
				className='row row-center row-middle admin-images-container'>
				<img alt={image.id} 
					src={image.base64} 
					className='admin-image'/>
				<p className='read-text small-text less-black-color'>
					{image.id}
				</p>
			</div>
			<button className='button3' style={{
				color: 'var(--red-highlight)', 
				padding:'calc(var(--padding)*0.4)'
			}}
				onClick={()=>{props.onDelete(index)}}>x</button>
		</div>)}
	</div>);
}


function _createPost(data, setFetchObj){
	CreateAdminPost(data, (isSuccess, message, id)=>{
		setFetchObj({
			isNew: true,
			isFetchSuccess: !isSuccess,
			message: isSuccess ? `created with id: ${id}` : message
		});
		window.location.href = '/admin/list';
	});
}
function _updatePost(id, data, setFetchObj){
	UpdateAdminPost(id, data, (isSuccess, message, isUpdated)=>{
		setFetchObj({
			isNew: false,
			isFetchSuccess: !(isSuccess && isUpdated),
			message: isSuccess && isUpdated 
			? `updated with id: ${id}` : message
		});
		window.location.href = '/admin/list';
	});
}
function _fetchPost(id, setFetchObj, setInput){
	GetViewPost(id, (isSuccess, message, payload)=>{
		setFetchObj({
			isNew: false,
			isFetchSuccess: isSuccess,
			message: message,
		});
		setInput(payload);
	});
}
