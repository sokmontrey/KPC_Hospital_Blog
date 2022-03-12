import { Topbar } from '../Components/Components.js';

export default function Home(){

	return ( <div className='page-container'>
		<Topbar isAdmin={false} />
		<h1>Home</h1>
	</div> );
}
