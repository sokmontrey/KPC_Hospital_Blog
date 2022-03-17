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
	const [lastId, setLastId] = useState('');
	const [onLast, setOnLast] = useState(false);

	const incrementIndex = useCallback(()=>{
		if(!onLast) handleScroll(()=>{setIndex(index+1)});
	},[index]);

	useEffect(()=>{}, []);

	useEffect(()=>{
		_fetchHomePost(index, 
			homePostObj, 
			setHomePostObj, 
			lastId,
			setOnLast
		);
		window.addEventListener('scroll', incrementIndex);
		if(homePostObj.postList>0)
			setLastId(homePostObj.postList[homePostObj.postList.length-1]._id);

		return ()=>{ window.removeEventListener('scroll', incrementIndex); }
	}, [index]);

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
	return homePostObj.postList.map((post,index)=> 
		<PostInfo 
			key={post._id}
			underline={true}
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
	setHomePostObj, 
	lastId,
	setOnLast){

	const limit = 3;
	GetHomePost(index, limit, (success, message, payload)=>{
		for(let i=0; i<payload.length; i++){
			if(payload[i]._id === lastId){setOnLast(true); return;}
		}
		setHomePostObj({
			isFetchSuccess: success,
			message: message,
			postList: homePostObj.postList.concat(payload)
		});
	});
}

