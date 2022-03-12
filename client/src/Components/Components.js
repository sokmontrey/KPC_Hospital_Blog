export function Topbar(props){
	return (<div className='row row-middle row-center row-middle'>
		<p className='bold-text gray' >
			{'KPC Hospital | '}
			<span className='read-text black'>
				Blog{props.isAdmin?'/Admin':''}
			</span>
		</p>
	</div>);
}

export function PostInfo(props){
	//TODO: use <mark> to select random words and assign random color
	return (<div className='col col-middle col-left'>
		<p className='style-text black'>
			{props.title}
		</p>

		<p className='read-text less-black'>
			{props.description}
		</p>

		<p className='bold-text gray'>
			{props.date}
		</p>
	</div>); 
}
