import { useState, useEffect } from 'react';
import { Topbar, PostInfo } from '../Components/Components.js';
import { GetHomePost } from '../Controllers/FetchController.js';

import '../Styles/Home.css';

export default function Home(){
	const [index, setIndex] = useState(0);
	const [homePostObj, setHomePostObj] = useState({
		isFetchSuccess: false,
		message: '',
		postList: []
	});

	useEffect(()=>{
		_fetchHomePost(index, setHomePostObj);
	}, [index]);

	return ( <div className='home-container'>
		<Topbar isAdmin={false} />
		<div id='latest-text' className='row row-left row-middle'>
			<p className='bold-text gray'>Latest Post</p>
		</div>
		<div id='post-list-container'>
			<PostList homePostObj={homePostObj}/>
		</div>
	</div> );
}

function PostList(props){
	const homePostObj = props.homePostObj;
	if(!homePostObj.isFetchSuccess) return 'could not load data';
	return homePostObj.postList.map(post=>
		<PostInfo 
			key={post._id}
			title={post.title}
			description={post.description}
			createAt={post.createAt}
			onClick={()=>{_viewPost(post._id)}}
		/>
	);
}

function _viewPost(id){ window.location.href = `/view/${id}`; }

function _fetchHomePost(index, setHomePostObj){
	const limit = 4;
	GetHomePost(index, limit, (success, message, payload)=>{
		setHomePostObj({
			isFetchSuccess: success,
			message: message,
			postList: payload
		});
	});
}

