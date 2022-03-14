import { convertToHowLongDay } from '../Controllers/Common.js'; 

export function Topbar(props){
	return (<div className='topbar-container row row-middle row-center'>
		<p className='bold-text gray' >
			{'KPC Hospital | '}
			<span className='read-text black'>
				Blog{props.isAdmin?'/Admin':''}
			</span>
		</p>
	</div>);
}
export function BackButton(){
	return (<button 
		onClick={()=>{ window.history.back(); }}
		className='button3 back-button-container'>
		back
	</button>);
}

export function PostInfo(props){
	return (<div onClick={props.onClick}
		className='postInfo-container col col-middle col-left'>

		<p className='style-text black'> 
			{_markText(props.title)}
		</p>

		<p className='read-text less-black'> {props.description} </p>

		<p className='bold-text gray small-text'> 
			{convertToHowLongDay(props.createAt)} days ago
		</p>
	</div>); 
}

function _markText(text){
	const splitedText = text.split(' ');
	let theRest = ' ';
	for(let i=1; i<splitedText.length; i++)
		theRest += splitedText[i] + ' ';
	const color = ['red', 'blue', 'green', 'yellow'];

	return (<>
		<mark className={color[Math.floor(Math.random()*color.length)] + '-highlight'}>
			{splitedText[0]}
		</mark>
		{theRest}
	</>);
}
