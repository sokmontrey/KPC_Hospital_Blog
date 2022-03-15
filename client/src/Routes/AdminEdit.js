import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Topbar } from '../Components/Components.js';

import { 
	CreateAdminPost,
	UpdateAdminPost,
	GetViewPost
} from '../Controllers/FetchController.js';

export default function AdminEdit(props){
	const isNew = props.isNew;
	const { id } = useParams();

	const [fetchObj, setFetchObj] = useState({
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

	return (<div>
		<Topbar isAdmin={true} />
		<InputContainer 
			fetchObj={fetchObj} 
			input={input} 
			setInput={setInput} 
		/>
	</div>);
}
function InputContainer(props){
	const fetchObj = props.fetchObj;
	if(!fetchObj.isFetchSuccess) return fetchObj.message;
	const input = props.input,
		setInput = props.setInput;

	return (<div className='row row-center row-middle'>
		<div></div>
		<div className='col col-center col-middle'>
			<div className='col col-center col-middle'>
				<input 
					className='input1'
					value={input.title} 
					onChange={e=>
						setInput({...input, title: e.target.value})
					}
					placeholder='title...'/>
				<input 
					className='input1'
					value={input.description} 
					onChange={e=>
						setInput({...input, description: e.target.value})
					}
					placeholder='description...'/>
			</div>
			<div className='horizontal-line' />
			<div className='col col-center col-middle'></div>
		</div>
	</div>);
}

function _fetchPost(id, setFetchObj, setInput){
	GetViewPost(id, (isSuccess, message, payload)=>{
		setFetchObj({
			isFetchSuccess: isSuccess,
			message: message,
		});
		setInput(payload);
	});
}
