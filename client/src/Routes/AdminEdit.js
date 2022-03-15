import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Topbar, BackButton } from '../Components/Components.js';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
			/>
			<PreviewContainer 
				markdown={input.markdown}
				fetchObj={fetchObj}
			/>
		</div>
	</div>);
}
function InputContainer(props){
	const fetchObj = props.fetchObj;
	if(!fetchObj.isFetchSuccess) return fetchObj.message;
	const input = props.input,
		setInput = props.setInput;

	return (<div className='row' id='admin-input-container'>
		<div className='col'>
			<div className='col col-left col-middle' 
				id='admin-left-input-container'>
				<p className='bold-text small-text gray'>post info</p>
				<input className='input1'
					value={input.title} 
					onChange={e=>
						setInput({...input, title: e.target.value})
					}
					placeholder='title...'/>
				<input className='input1'
					value={input.description} 
					onChange={e=>
						setInput({...input, description: e.target.value})
					}
					placeholder='description...'/>
				<button className='button1'>
					{fetchObj.isNew ? 'Post' : 'Update'}
				</button>
			</div>

			<div className='col col-left col-middle'>
				<p className='bold-text small-text gray'>images</p>
				<input type='file' placeholder='add picture' />
				<div className='col'>
					{/*picture container*/}
				</div>
			</div>
		</div>
		<div id='markdown-input-container'>
			<p className='bold-text small-text gray'>markdown</p>
			<textarea 
				placeholder='markdown...' 
				value={input.markdown}
				onChange={e=>
					setInput({...input, markdown: e.target.value})
				}
				className='input1'
			/>
		</div>
	</div>);
}

function PreviewContainer(props){
	const fetchObj = props.fetchObj;
	if(!fetchObj.isFetchSuccess) return fetchObj.message;

	const splited = props.markdown.split('$image$');
	//0: text, 1: image, 2: text
	//odd: image, even: text
	
	const result = splited.map((item, index)=>{
		if(!(index % 2) || !index) 
			return ( <ReactMarkdown key={`markdown-${index}`} 
				children={item} 
				remarkPlugins={[remarkGfm]}/> );
		else 
			return ( <img key={`markdown-${index}`} alt={index} src={item}/> );
	});
	return ( <div id='admin-preview-container' className='col'>
		<p className='bold-text small-text gray'>preview</p>
		{result}
	</div> );
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
