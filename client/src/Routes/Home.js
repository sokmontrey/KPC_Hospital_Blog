import { useState, useEffect, useCallback } from 'react';
import { Topbar, PostInfo} from '../Components/Components.js';
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
	const [onLast, setOnLast] = useState(false);

	const incrementIndex = useCallback(()=>{
		if(!onLast) handleScroll(()=>{setIndex(index+1)});
	},[index]);

	useEffect(()=>{}, []);

	useEffect(()=>{
		_fetchHomePost(index, 
			homePostObj, 
			setHomePostObj, 
		);
		window.addEventListener('scroll', incrementIndex);

		return ()=>{ window.removeEventListener('scroll', incrementIndex); }
	}, [index]);

	useEffect(()=>{
		const postList = homePostObj.postList;
		for(let i=0; i<postList.length-1; i++){
			if(postList[i]._id === postList[i+1]._id){
				setHomePostObj({
					isFetchSuccess: true,
					message: '',
					postList: postList.slice(0, i+1)
				});
				setOnLast(true);
			}
		}
	}, [homePostObj]);

	return ( <div id='home-container'>
		<Topbar isAdmin={false} />
		<div id='list-container' className='col col-center' width='100%'>
			<div id='latest-text' 
				className='row row-left row-middle'>

				<p className='bold-text gray'>Latest Post</p>
			</div>
			<PostList homePostObj={homePostObj}/>
		</div>
	</div> );
}

function handleScroll(onBottom){
	const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
	const body = document.body;
	const html = document.documentElement;
	const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
	const windowBottom = windowHeight + window.pageYOffset;
	if (windowBottom >= docHeight) {
		onBottom();
	}
}

function PostList(props){
	const homePostObj = props.homePostObj;
	if(!homePostObj.isFetchSuccess) return homePostObj.message;
	return homePostObj.postList.map(post=> 
		<PostInfo 
			key={post._id}
			underline={true}
			isThumnail={true}
			thumnail={post.images.length>0?post.images[0].base64: ''}
			title={post.title}
			description={post.description}
			createAt={post.createAt}
			onClick={()=>{_viewPost(post._id)}}
		/>
	);
}

function _viewPost(id){ window.location.href = `/view/${id}`; }

function _fetchHomePost(index, 
	homePostObj, 
	setHomePostObj){

	const limit = 8;
	GetHomePost(index, limit, (success, message, payload)=>{
		setHomePostObj({
			isFetchSuccess: success,
			message: message,
			postList: homePostObj.postList.concat(payload)
		});
	});
}

