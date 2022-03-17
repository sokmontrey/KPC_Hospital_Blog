import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

import { 
	BackButton, 
	Topbar, 
	PostInfo,
	MarkdownRender
} from '../Components/Components.js';
import { GetViewPost } from '../Controllers/FetchController.js';

import '../Styles/View.css';

export default function View(){
	const { id } = useParams();

	const [postObj, setPostObj] = useState({
		isFetchSuccess: false,
		message: '',
		post: {}
	});

	useEffect(()=>{
		_fetchViewPost(id, setPostObj);
	}, []);

	return (<div id='view-container'>
		<BackButton />
		<Topbar isAdmin={false} />
		<PostInfoElement postObj={postObj}/>
		<div id='postMarkdown-container'>
			{postObj.isFetchSuccess
			?<MarkdownRender 
					images={postObj.post.images} 
					markdown={postObj.post.markdown}/>
			:postObj.message
			}
		</div>
	</div>);
}

function PostInfoElement(props){
	//TODO: add message to return 
	const postObj = props.postObj;
	if(!postObj.isFetchSuccess) return 'could not load data';
	return (<PostInfo 
		underline={false}
		title={postObj.post.title}
		description={postObj.post.description}
		createAt={postObj.post.createAt}
	/>);
}

function _fetchViewPost(id, setPostObj){
	GetViewPost(id ,(success, message, payload)=>{
		setPostObj({
			isFetchSuccess: success,
			message: message,
			post: payload
		});
	});
}
