import { convertToHowLongDay } from '../Controllers/Common.js'; 
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
export function ConfirmDialog(props){
	return ( <div className='confirm-dialog-wrapper row row-center row-middle'>
		<div className='confirm-dialog-container row row-center row-middle'>
			<p className='bold-text small-text less-black'>{props.message}</p>
			<button className='button1 small-text' 
			onClick={props.onYes}>Yes</button>
			<button className='button1 small-text' 
			onClick={props.onNo}>No</button>
		</div>
	</div> );
}

export function HorizontalLine(){
	return (<div className='horizontal-line-container'>
		<div className='horizontal-line'></div>
	</div>);
}

export function PostInfo(props){
	return (<div onClick={props.onClick}
		className='postInfo-container col col-middle col-left'>

		{props.isThumnail? <img src={props.thumnail} className='postInfo-image' 
			alt={props.title}/>
			:''
		}
		<p className='style-text primary-color'> 
			{props.mark?_markText(props.title):props.title}
		</p>

		<p className='read-text less-black'> {props.description} </p>

		<p className='bold-text gray small-text'> 
			{convertToHowLongDay(props.createAt)} days ago
		</p>
		{props.underline?<HorizontalLine />:''}
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
export function MarkdownRender(props){
	const { markdown, images } = props;
	console.log(images);

	const splited = markdown.split('$image$');
	const result = splited.map((item, index)=>{
		if(!(index % 2) || !index) {
			return ( <ReactMarkdown key={`markdown-${index}`} 
				children={item} 
				remarkPlugins={[remarkGfm]}/> );
		}else {
			const image = images.find(image=>image.id==item);
			return ( <img key={`markdown-${index}`} 
				style={{width:'100%'}}
				alt={item}
				src={image?image.base64:''} />);
		}
	});
	return ( <div className='col markdown-render-container'>
		{result}
	</div> );
}
