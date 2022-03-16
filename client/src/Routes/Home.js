import { useState, useEffect } from 'react';
import { Topbar, PostInfo } from '../Components/Components.js';
import { GetHomePost } from '../Controllers/FetchController.js';

import '../Styles/Home.css';

export default function Home(){
	//TODO: next index when scroll to bottom
	const [index, setIndex] = useState(0);
	const [homePostObj, setHomePostObj] = useState({
		isFetchSuccess: false,
		message: '',
		postList: []
	});

	useEffect(()=>{
		_fetchHomePost(index, setHomePostObj);
	}, [index]);

	useEffect(()=>{
		window.addEventListener('scroll', handleScroll);
	}, []);

	return ( <div id='home-container'>
		<Topbar isAdmin={false} />
		<div id='latest-text' className='row row-left row-middle'>
			<p className='bold-text gray'>Latest Post</p>
		</div>
		<div id='post-list-container'>
			<PostList homePostObj={homePostObj}/>
		</div>
	</div> );
}

function handleScroll(){
	const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
	const body = document.body;
	const html = document.documentElement;
	const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
	const windowBottom = windowHeight + window.pageYOffset;
	if (windowBottom >= docHeight) {
		console.log('bottom');
	}else if(window.pageYOffset === 0){
		console.log('top');
	}
}

function PostList(props){
	const homePostObj = props.homePostObj;
	if(!homePostObj.isFetchSuccess) return homePostObj.message;
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
	const limit = 9;
	GetHomePost(index, limit, (success, message, payload)=>{
		setHomePostObj({
			isFetchSuccess: success,
			message: message,
			postList: payload
		});
	});
}

