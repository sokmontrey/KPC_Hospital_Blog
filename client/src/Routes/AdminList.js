import { Topbar } from '../Components/Components.js';
import { convertToHowLongDay } from '../Controllers/Common.js';

import '../Styles/Admin.css';

export default function AdminList(){
	return(<div id='adminList-container'>
		<Topbar isAdmin={true} />
	</div>);
}

function AdminPost(props){
	//TODO: add style
	//onCLick submit and delete
	return (<div className='row row-center row-middle'>
		<div 
			className='col col-left col-middle adminPost-left-container'>
			<p className='style-text black medium-text'>
				{props.title}
			</p>

			<p className='bold-text gray small-text'>
				{convertToHowLongDay(props.createAt)}
			</p>
		</div>

		<div 
			className='row row-right row-middle adminPost-right-container'>
			<button className='button1'>Edit</button>
			<button className='button1'>Delete</button>
		</div>
	</div>);
}
